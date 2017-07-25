
login.controller("loginCtrl", ['$rootScope', '$scope', '$state', '$location', 'loginService', 'Flash', 'apiService', '$timeout',
function ($rootScope, $scope, $state, $location, loginService, Flash, apiService, $timeout) {
    
    var vm = this;

    vm.getUser = {};
    $rootScope.setUser = {};
    vm.signIn = true;
    
    if (typeof(Storage) !== "undefined") {
        localStorage.clear();
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    
    //access login
    vm.login = function (data) {
        loginService.accessLogin(vm.getUser).then(function (response) {
            
            if (typeof(Storage) !== "undefined") {
                localStorage.clear();

                localStorage.setItem("success", true);
                localStorage.setItem("xAuthorizationToken", response.token);
                localStorage.setItem("username", vm.getUser.username);

                console.log(response.token);

                $timeout(function () {
                    localStorage.clear();
                }, (60 * 60 * 1000));
                apiService.getAccounts("Account/v2.0.0/account?page=0&size=10", localStorage.xAuthorizationToken).then(function(response) {
                        $state.go('app.dashboard');                       
                        
                }, function(response) {       
                 Flash.create('danger', 'Sorry, admins are not allowed to login', 'large-text');
            });
               

            } else {
                console.log("Sorry, your browser does not support Web Storage...");
            }
            
        }, function(reject) {
            console.log(reject);
            Flash.create('danger', 'Invalid UserName or Password', 'large-text');
        });
    };

        //get registration details
    vm.register = function () {
        if (vm.setUser.confirmPassword == vm.setUser.Password){
            Flash.create('danger', 'Sorry Cant register at the moment', 'large-text');
        }
    };

}]);

