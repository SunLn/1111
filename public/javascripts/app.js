angular.module('myApp', ['myApp.controllers'])


angular.module('myApp.controllers', []).controller('FinanceController', function($scope, $http) {
    $scope.salary = 0;
    $scope.percentage = 0;
    $scope.result = function() {
        return $scope.salary * $scope.percentage * 0.01;
    };
    $scope.data = {
        'jiyouA': '',
        'jiyouB': '',
        'imageLink': '',
        'status': ''
    }
    $scope.submit = function() {
        var responsePromise = $http.post("/gaoji", {
            'jiyou-a': $scope.data.jiyouA,
            'jiyou-b': $scope.data.jiyouB
        });

        responsePromise.success(function(data, status, headers, config) {
            $scope.data.status = data.status;
            $scope.data.imgLink = data.imgLink;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    };
});