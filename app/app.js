
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'flash',
    //main modules
    'login', 'dashboard']);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $modalInstance) {

    //IdleScreenList
    $stateProvider
       .state('app', {
           url: '/app',
           templateUrl: 'app/common/app.html',
           controller: 'appCtrl',
           controllerAs: 'vm',
           data: {
               pageTitle: 'Login'
           }
       });

    $urlRouterProvider.otherwise('login');

}]);

// set global configuration of application and it can be accessed by injecting appSettings in any modules
app.constant('appSettings', appConfig);

app.directive('myModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
         scope.dismiss = function() {
             element.modal('hide');
         };
         scope.show = function() {
             element.modal('show');
         };
     }
   } 
});

app.directive('myModalProcess', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
         scope.modelDismiss = function() {
             element.modal('hide');
         };
     }
   } 
});

app.directive('myModalNotify', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
         scope.modelNotifyDismiss = function() {
             element.modal('hide');
         };
         scope.modelNotifyShow = function() {
             element.modal('show');
         };
     }
   } 
});

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});

app.directive('noresponce', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
         scope.modelResponceDismiss = function() {
             element.modal('hide');
         };
         scope.modelResponceShow = function() {
             element.modal('show');
         };
     }
   } 
});

app.filter('unique', function() {
    return function(collection, keyname) {
       var output = [];
        
        if(keyname == ""){
            return collection;
        }else{

            angular.forEach(collection, function(value, key) {

                if(value.statuses[0].call_status == keyname){
                    this.push(value);
                } 

            }, output);

            return output;
        }
    };
});


app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);