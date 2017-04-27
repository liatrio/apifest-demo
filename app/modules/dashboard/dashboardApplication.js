
var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);


dashboard.config(["$stateProvider", function ($stateProvider) {


    //Acknowledge page state
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/dashboard/views/acknowledge.html',
        controller: 'EducationController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Dashboard Home'
        }
    });


    //Search page state
    $stateProvider.state('app.search', {
        url: '/search',
        templateUrl: 'app/modules/dashboard/views/search.html',
        controller: 'appCtrl',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Search'
        }
    });
    
    

}]);

