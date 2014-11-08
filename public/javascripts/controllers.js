angular.module('myApp.controllers', []).controller('FinanceController', function($scope, $http) {
    $scope.salary = 0;
    $scope.percentage = 0;
    $scope.result = function() {
        return $scope.salary * $scope.percentage * 0.01;
    };
    $scope.data = {
        'gaojiA': '',
        'gaojiB': ''
    }
    $scope.submit = function() {
        var responsePromise = $http.post("/gaoji", {
            'gaoji-a': $scope.dataA,
            'gaoji-b': $scope.dataB
        });

        responsePromise.success(function(data, status, headers, config) {
            $scope.myData.fromServer = data.title;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    };
});
