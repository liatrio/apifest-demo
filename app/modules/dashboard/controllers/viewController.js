dashboard.controller("ExperienceController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$http) {
    
    if (typeof(Storage) !== "undefined") {
        
        if(!localStorage.getItem("success")){
            $state.go('login');
        
        }else{
        
            var vm = this
            console.log("coming to ViewController controller");
            $('#processing-modal').modal('show');

            // get data from service and add it in to drop box
            $scope.groupName = [];

            dashboardService.getGroups().then(function (response) {
                angular.forEach(response.user_groups, function(value, key){

                    this.push(value);

                }, $scope.groupName);
                
                if($scope.groupName.length == 0){
                    $scope.modelDismiss();
                    $scope.modelResponceShow();
                }
                
            });

            // add contact form
            $scope.data = {
                group_names: null,
            };

            $scope.onGroupChange = function() {

                var grpName = $scope.data.group_names;
                
                if(grpName !== ""){
                    $('#processing-modal').modal('show');
                    $scope.users.details.length = 0;
                    $scope.getUserDetails(grpName);
                }

            }

            $scope.users = {};
            $scope.users.details = [];
            
            $scope.getUserDetails = function (parameter) {

                dashboardService.getUser(parameter).then(function (response) {
                    angular.forEach(response.users, function(value, key) {

                        this.push(value);

                    }, $scope.users.details);
                    
                    if($scope.users.details.length == 0){
                        $scope.modelDismiss();
                        $scope.modelResponceShow();
                    }

                });

            };

            $scope.deleteUserDetail = [];

            vm.deleteUser = function (parameter, parameter2) {

                $scope.deleteUserDetail.groupId = $scope.data.group_names;
                
                $scope.deleteUserDetail.userId = parameter;

                dashboardService.deleteUser($scope.deleteUserDetail).then(function (response) {
                    
                    $scope.name = 'User : ' + parameter2 + ' Deleted';
                    $scope.show();

                    console.log("reponse -" + response);
                    $scope.users.details.length = 0;
                    
                    $scope.getUserDetails($scope.deleteUserDetail.groupId);
                    
                });
            };


            vm.deleteGroup = function (parameter) {
                
                $scope.data.group_names = "";

                dashboardService.deleteGroup(parameter).then(function (response) {
                    
                    $scope.name = 'Group : Deleted';
                    $scope.show();

                    console.log("reponse -" + response);
                    $scope.users.details.length = 0;

                    for(var i = $scope.groupName.length - 1; i >= 0; i--){
                        if($scope.groupName[i]._id == parameter){
                            $scope.groupName.splice(i,1);
                        }
                    }

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







