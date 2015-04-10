/*THIET LAP CAI DAT MOBILE ANGULAR UI*/
angular.module('BKNotification', [
  'ngRoute',
  'mobile-angular-ui',
  'BKNotification.controllers.Main'
])

    .config(function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'SignInController' ,
            templateUrl:'home.html',
            reloadOnSearch: false
        });
        $routeProvider.when('/tkb', {
            templateUrl: 'tkb.html',
            reloadOnSearch: false,
            controller: 'ScheduleListController'
        }).otherwise({
            redirectTo: '/'
        });
    });

angular.module('BKNotification.controllers.Main', []);