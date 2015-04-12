var app=angular.module('BKNotification.controllers.Main');

app.controller('ScheduleListController', ['$scope','BKNotiApi',function($scope,BKNotiApi){
    BKNotiApi.getScheduleCompletedCallback.push(function(target){
        console.log(target.scheduleViewState);
        console.log(target.schedule);
        $scope.schedule=target.schedule;
    });

    $scope.studentInfo=BKNotiApi.getStudentId();
    $scope.schedule={};
    $scope.init=function () {
        BKNotiApi.viewState='schedule';
        BKNotiApi.getSchedule();
    };
}]);
