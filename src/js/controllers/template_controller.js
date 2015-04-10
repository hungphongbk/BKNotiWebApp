/**
 * Created by hungphong on 11/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.controller('TemplateController', ['$scope','BKNotiApi',function($scope,BKNotiApi){
    $scope.isSignedIn=function(){
        return BKNotiApi.Student.isSignedIn();
    }
}]);