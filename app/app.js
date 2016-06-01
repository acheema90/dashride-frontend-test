'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider
    .when('/',{
      templateUrl:'dob.html',
      controller:'dobCtrl'
    });
}])
.controller('dobCtrl',function($scope,$http){
  $scope.dob='';
  $scope.age='';
  $scope.fact='';

  $scope.calcAge=function(){
    var today = new Date();
    var age = ((today - $scope.dob) / (31557600000));
    var age = Math.floor( age );
    $scope.age= age;
  };

  $scope.$watch('dob',function(){
      if($scope.dob) {
        console.log($scope.dob);
        var date = $scope.dob.getDate();
        var month = 1+$scope.dob.getMonth();
        console.log(month + ' ' + date);
        $http.get('http://numbersapi.com/' + month + '/' + date + '/date')
          .then(function (res) {
            $scope.fact = res.data;
          });
      }
  });

});
