/**
 * Created by hungphong on 12/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.controller('NavController',['$scope','BKNotiApi',function($scope,BKNotiApi){
    $scope.studentInfo={};
    BKNotiApi.Student.signInCompletedCallback.push(function(o){
        $scope.studentInfo=BKNotiApi.Student.get();
    });

    $scope.menu=[
        {
            label:'Thời khóa biểu',
            url:'/tkb'
        },
        {
            label:'Lịch thi',
            url:'/tkb'
        },
        {
            label:'Bảng điểm',
            url:'/tkb'
        }
    ];
}]);