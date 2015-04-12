/**
 * Created by hungphong on 11/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.controller('TemplateController', ['$scope','BKNotiApi',function($scope,BKNotiApi){
    $scope.isScheduleViewState=false;
    BKNotiApi.viewStateChangeCallback=function(){
        $scope.isScheduleViewState=(BKNotiApi.viewState=='schedule');
    };

    $scope.isSignedIn=function(){
        return BKNotiApi.isSignedIn();
    };
    $scope.callApi=function(apiName){
        console.log(apiName);
        if(typeof BKNotiApi[apiName]==='function'){
            BKNotiApi[apiName]();
        }
    };
}]);