/**
 * Created by hungphong on 08/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.factory('BKNotiApi',['$http','$q',function($http,$q){
    var DATA=(function(){
        function def(){
            this.currentStu='';
            this.currentStuName='';
        }
        def.prototype.setStudentId=function(id){
            var that=this;
            return $q(function(resolve,reject){
                $http.get('http://hungphongbk.ddns.net:3000/bk/list/name?stu='+id).success(function(rs){
                    that.currentStu=rs.StudentID;
                    that.currentStuName=rs.StudentName;
                    resolve();
                }).error(function(rs,code){
                    reject(rs);
                });
            });
        };
        def.prototype.getStudentId=function(){
            return {
                StudentId:this.currentStu,
                StudentName:this.currentStuName
            };
        };

        def.prototype.getSchedule=function(){
            return $q(function(resolve,reject){
                $http.get('test/tkb.json').success(function(rs){
                    resolve(rs);
                });
            });
        };
        return def;
    })();
    var data=new DATA();

    return {
        Student: {
            set: data.setStudentId,
            get: data.getStudentId
        },
        Schedule: {
            get: data.getSchedule
        }
    };
}]);