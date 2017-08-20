var app = angular.module('EmployeesApp', ['ngMaterial']).config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
            'default': '900',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('grey', {
            'default': '200'
        })
        .backgroundPalette('blue', {
            'default': '50'
        });

});;

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
            self.employeeAddForm.$setPristine();
            self.employeeAddForm.$setUntouched();
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
            url: '/employees/is-active/' + employeeId,
            data: {
                status: is_active,
                editing: false
            }
        }).then(function (response) {
            self.getEmployees();
        });
    }

    // PUT toggle editing = true or false
    self.editStatus = function (employeeId, employeeEditing) {
        if (employeeEditing) {
            editing = false;
        } else {
            editing = true;
        }
        $http({
            method: 'PUT',
            url: '/employees/editing/' + employeeId,
            data: { editStatus: editing }
        }).then(function (response) {
            self.getEmployees();
            self.changeEmployee = {};

        });
    }

    // PUT update employee
    self.updateEmployee = function (employeeId, employeeEditing, firstName, lastName, jobTitle, salary) {
        $http({
            method: 'PUT',
            url: '/employees/update/' + employeeId,
            data: {
                id: employeeId,
                editing: employeeEditing,
                first_name: firstName,
                last_name: lastName,
                job_title: jobTitle,
                salary: salary
            }
        }).then(function (response) {
            self.editStatus(employeeId, employeeEditing)
        });
    }

    // Return formatted employee salary
    self.getEmployeeSalary = function (salary) {
        return accounting.formatMoney(salary);
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
    if (salariesArray.length !== 0) {
        var totalSalary = salariesArray.reduce(function (x, y) {
            return x + y;
        });
    } else {
        var totalSalary = 0;
    }

    // Calculate total monthly salary expenses
    var monthlyExpenditure = (totalSalary / 12).toFixed(2);

    return accounting.formatMoney(monthlyExpenditure);
}