/**
 * Created by hungphong on 12/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.controller('NavController',['$scope','BKNotiApi',function($scope,BKNotiApi){
    $scope.studentInfo={};
    BKNotiApi.signInCompletedCallback.push(function(o){
        $scope.studentInfo=BKNotiApi.getStudentId();
    });

    $scope.menu=[
        {
            label:'Thời khóa biểu',
            url:'/tkb'
        },
        {
            label:'Lịch thi',
            url:'/lt'
        },
        {
            label:'Bảng điểm',
            url:'/bd'
        }
    ];
}]);