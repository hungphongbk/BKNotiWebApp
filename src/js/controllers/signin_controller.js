var app=angular.module('BKNotification.controllers.Main');

app.controller('SignInController', ['$scope',
    '$location',
    'BKNotiApi',
    function($scope,$location,BKNotiApi){
    $scope.studentId='';
    $scope.checkForStudentValid=function(){

    };
    $scope.signin=function(){
        var id=$scope.studentId;
        if(id){
            BKNotiApi.Student.set(id).then(function(){
                $location.path('/tkb');
            },function(err){
                console.log(err);
            });

        }
    }
}]);
