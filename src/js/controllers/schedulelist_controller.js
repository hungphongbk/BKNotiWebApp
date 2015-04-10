var app=angular.module('BKNotification.controllers.Main');

app.controller('ScheduleListController', ['$scope','BKNotiApi',function($scope,BKNotiApi){
    $scope.studentInfo=BKNotiApi.Student.get();
    $scope.schedule={};

    (function(){
        BKNotiApi.Schedule.get().then(function(rs){
            console.log(rs);
            $scope.schedule=rs;
        });
    })();
}]);
