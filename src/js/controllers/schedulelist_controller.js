var app=angular.module('BKNotification.controllers.Main');

app.controller('ScheduleListController', ['$scope','BKNotiApi',function($scope,BKNotiApi){
    $scope.studentInfo=BKNotiApi.Student.get();
    $scope.schedule={};

    $scope.init=function () {
        BKNotiApi.Schedule.get().then(function (rs) {
            $scope.schedule = rs;
        }, function (err) {
            console.log(err);
        });
    };
}]);
