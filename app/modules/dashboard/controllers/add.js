dashboard.controller("ContactController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http) {
    
    if (typeof(Storage) !== "undefined") {
        
        if(!localStorage.getItem("success")){
            $state.go('login');
        
        }else{
            
            var vm = this;
    
            console.log("coming to Add controller");
            $('#processing-modal').modal('show');

            // get data from service and add it in to drop box
            $scope.groupName = [];
            
            vm.getGroup = function () {
                dashboardService.getGroups().then(function (response) {
                    $scope.groupName.length = 0;
                     
                    angular.forEach(response.user_groups, function(value, key) {

                        this.push(value);

                    }, $scope.groupName);

                    if($scope.groupName.length == 0){
                        $scope.modelDismiss();
                    }
                     
                });
            };
            
            vm.getGroup();

            $scope.data = {
                singleSelect: null,
            };

            vm.userDetail = {};

            vm.submitForm = function () {
                 dashboardService.createUser($scope.data.singleSelect, vm.userDetail).then(function (response) {
                     
                     $scope.name = 'user';
                     
                     vm.userDetail.name = null;
                     vm.userDetail.phone = null;
                     $scope.data.singleSelect = null;

                     $scope.show();
                });
            };

            vm.groupDetail = {};

            vm.groupSubmit = function () {
                dashboardService.createGroup(vm.groupDetail).then(function (response) {
                    
                    $scope.name = 'group';
                    vm.groupDetail.name = null;
                    $scope.show();
                    vm.getGroup();
                });
            };
            
            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                $scope.modelDismiss();
                console.log("Render Finished");
            });
        }
            
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }  

}]);

