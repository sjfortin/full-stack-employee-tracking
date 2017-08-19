var app = angular.module('EmployeesApp', []);

app.controller('EmployeesController', ['$http', function ($http) {
    console.log('Employees Controller loaded');

    var self = this;

    self.employees = [];

    // Employee GET request
    self.getEmployees = function () {
        $http({
            method: 'GET',
            url: '/employees'
        }).then(function (response) {
            console.log(response.data);
            self.employees = response.data;
            self.monthlyExpenditure = monthlySalaryExp(self.employees);
        });
    }

    // Employee POST request
    self.addEmployee = function () {
        $http({
            method: 'POST',
            url: '/employees',
            data: self.newEmployee
        }).then(function (response) {
            self.getEmployees();
            self.newEmployee = {};
        });
    };

    // Function to toggle is_active 
    self.toggleActive = function (employeeId) {
        $http({
            method: 'PUT',
            url: '/employees/' + employeeId,
            data: { status: true }
        }).then(function (response) {
            self.getEmployees();
        })
    }

    self.getEmployees();

}]);

// Calculate total monthly salary expenditure
function monthlySalaryExp(employees) {
    var salariesArray = employees.map(function (employee) {
        return employee.salary;
    });
    var totalSalary = salariesArray.reduce(function (x, y) {
        return x + y;
    });
    var monthlyExpenditure = (totalSalary / 12).toFixed(2);
    return monthlyExpenditure;
}