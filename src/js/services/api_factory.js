/**
 * Created by hungphong on 08/04/2015.
 */
var app=angular.module('BKNotification.controllers.Main');

app.factory('BKNotiApi',['$http','$q',function($http,$q){
    var DATA=(function(testmode){
        function def(){
            var _this=this;

            this.currentStu='';
            this.currentStuName='';
            this.signInCompletedCallback=[];

            var viewState='login';
            this.viewStateChangeCallback=null;
            Object.defineProperty(this,'viewState',{
                get:function(){return viewState;},
                set:function(value){
                    if(viewState!=value){
                        viewState=value;
                        if(_this.viewStateChangeCallback!=null)
                            _this.viewStateChangeCallback();
                    }
                }
            });

            this.schedule={};
            this.scheduleViewState='all';
            this.getScheduleCompletedCallback=[];
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
            var _this=this;
            var url=(testmode)?'test/tkb.json':'http://hungphongbk.ddns.net:3000/bk/list/tkb?stu='+this.currentStu;
            return $q(function(resolve,reject){
                $http.get(url).success(function(rs){
                    _this.scheduleViewState='all';
                    _this.schedule=rs;
                    var events=_this.getScheduleCompletedCallback;
                    for(var e in events) if (typeof events[e]==='function'){
                        events[e](_this);
                    }
                    resolve(rs);
                }).error(function(rs,code){
                    reject(rs);
                });
            });
        };
        def.prototype.getScheduleByWeek=function(){
            var _this=this;
            var url=(testmode)?'test/tkb.json':'http://hungphongbk.ddns.net:3000/bk/list/tkb?stu='+this.currentStu+'&byWeek=1';
            return $q(function(resolve,reject){
                $http.get(url).success(function(rs){
                    _this.scheduleViewState='byWeek';
                    _this.schedule=rs;
                    var events=_this.getScheduleCompletedCallback;
                    for(var e in events) if (typeof events[e]==='function'){
                        events[e](_this);
                    }
                    resolve(rs);
                }).error(function(rs,code){
                    reject(rs);
                });
            });
        };
        def.prototype.toggleScheduleView=function(){
            if(this.scheduleViewState==='all')
                this.getScheduleByWeek();
            else this.getSchedule();
        };

        return def;
    })(false);
    var data=new DATA();

    /*var obj = {
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
    })(obj);*/
    return data;
}]);