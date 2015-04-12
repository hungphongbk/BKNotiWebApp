/**
 * Created by hungphong on 08/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.factory('BKNotiApi',['$http','$q',function($http,$q){
    var DATA=(function(testmode){
        function def(){
            this.currentStu='';
            this.currentStuName='';
            this.signInCompletedCallback=[];
        }
        def.prototype.setStudentId=function(id){
            var that=this;
            return $q(function(resolve,reject){
                $http.get('http://hungphongbk.ddns.net:3000/bk/list/name?stu='+id).success(function(rs){
                    that.currentStu=rs.StudentID;
                    that.currentStuName=rs.StudentName;
                    for(var e in that.signInCompletedCallback)
                        if(typeof that.signInCompletedCallback[e]==='function')
                            that.signInCompletedCallback[e].apply(that);
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
        def.prototype.isSignedIn=function(){
            var rs=(typeof this.currentStu != 'undefined');
            if(rs) rs&=this.currentStu.length>7;
            return rs;
        };

        def.prototype.getSchedule=function(){
            var url=(testmode)?'test/tkb.json':'http://hungphongbk.ddns.net:3000/bk/list/tkb?stu='+this.currentStu;
            return $q(function(resolve,reject){
                $http.get(url).success(function(rs){
                    resolve(rs);
                }).error(function(rs,code){
                    reject(rs);
                });
            });
        };
        return def;
    })(false);
    var data=new DATA();

    var obj = {
        Student: {
            set: data.setStudentId,
            get: data.getStudentId,
            isSignedIn: data.isSignedIn,
            signInCompletedCallback: data.signInCompletedCallback
        },
        Schedule: {
            get: data.getSchedule
        }
    };
    (function binds(o){
        for(var i in o)
            if (typeof o[i]==='function') o[i]=o[i].bind(data);
            else binds(o[i]);
    })(obj);
    return obj;
}]);