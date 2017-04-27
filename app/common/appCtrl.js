app.controller("appCtrl", ['$rootScope', '$scope', '$state', '$location', 'Flash','appSettings',
function ($rootScope, $scope, $state, $location, Flash,appSettings) {

    $rootScope.theme = appSettings.theme;
    $rootScope.layout = appSettings.layout;
    
    if (typeof(Storage) !== "undefined") {
        
        if(!localStorage.getItem("success")){
            $state.go('login');
            
        }else{
            
            console.log('getting in to the app controller');
            
            $scope.userName = localStorage.getItem("username");

            var vm = this;

            //Main menu items of the dashboard
            vm.menuItems = [
                {
                    title: "Dashboard",
                    icon: "book",
                    state: "dashboard"
                },
                {
                    title: "Add",
                    icon: "plus",
                    state: "contact"
                },
                {
                    title: "View Contacts",
                    icon: "book",
                    state: "view"
                },
                {
                    title: "Account",
                    icon: "book",
                    state: "Account"
                }
            ];

            //set the theme selected
            vm.setTheme = function (value) {
                $rootScope.theme = value;
            };

            //controll sidebar open & close in mobile and normal view
            vm.sideBar = function (value) {
                if($(window).width()<=767){
                if ($("body").hasClass('sidebar-open'))
                    $("body").removeClass('sidebar-open');
                else
                    $("body").addClass('sidebar-open');
                }
                else {
                    if(value==1){
                    if ($("body").hasClass('sidebar-collapse'))
                        $("body").removeClass('sidebar-collapse');
                    else
                        $("body").addClass('sidebar-collapse');
                    }
                }
            };

            //navigate to search page
            vm.search = function () {
                $state.go('app.search');
            };
        
        }

    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

}]);
