
var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);


dashboard.config(["$stateProvider", function ($stateProvider) {

    //Send Messages page state
    $stateProvider.state('app.account', {
        url: '/account',
        templateUrl: 'app/modules/dashboard/views/sendmessage.html',
        controller: 'SkillController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Skills'
        }
    });

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

    //View Contact page state
    $stateProvider.state('app.view', {
        url: '/view',
        templateUrl: 'app/modules/dashboard/views/view.html',
        controller: 'ExperienceController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Experience'
        }
    });

    //Add page state
    $stateProvider.state('app.contact', {
        url: '/add',
        templateUrl: 'app/modules/dashboard/views/add.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Contact Me'
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

