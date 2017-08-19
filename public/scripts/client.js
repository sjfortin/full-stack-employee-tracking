var app = angular.module('EmployeesApp', []);

app.controller('EmployeesController', ['$http', function ($http) {
    console.log('Employees Controller loaded');
    
    var self = this;
    self.employees = [];

    self.getEmployees = function () {
        $http({
            method: 'GET',
            url: '/employees'
        }).then(function (response) {
            console.log(response.data);
            self.employees = response.data;
        });
    }

    self.getEmployees();

}]);