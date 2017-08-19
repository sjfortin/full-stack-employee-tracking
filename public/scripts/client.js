var app = angular.module('EmployeesApp', ['ngMaterial']);

app.controller('EmployeesController', ['$http', function ($http) {
    console.log('Employees Controller loaded');

    var self = this;

    self.employees = [];
    self.isActive = 'active';

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
    self.toggleActive = function (employeeId, is_active) {
        // Toggle is_active status based on current active status
        if (is_active) {
            var is_active = false;
        } else {
            var is_active = true;
        }

        // Employee PUT is_active toggle
        $http({
            method: 'PUT',
            url: '/employees/' + employeeId,
            data: { status: is_active }
        }).then(function (response) {
            self.getEmployees();
        })
    }

    self.getEmployees();

}]);

// Calculate total monthly salary expenditure
function monthlySalaryExp(employees) {

    // Array of active employees
    var activeEmployees = employees.filter(function (employee) {
        return employee.is_active;      
    });

    // Array of active employee's salaries
    var salariesArray = activeEmployees.map(function (employee) {
        return employee.salary;
    });
    
    // Calculate the total annual salary expenses
    if(salariesArray.length !== 0) {
        var totalSalary = salariesArray.reduce(function (x, y) {
            return x + y;
        });
    } else {
        var totalSalary = 0;
    }

    // Calculate total monthly salary expenses
    var monthlyExpenditure = (totalSalary / 12).toFixed(2);
    return monthlyExpenditure;
}