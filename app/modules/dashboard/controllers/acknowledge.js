dashboard.controller("EducationController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    
    if (typeof(Storage) !== "undefined") {
        
        if(!localStorage.getItem("success")){
            $state.go('login');
        
        }else{
            
            var vm = this
            console.log("coming to Dashboard Home controller");
            
            // $('#processing-modal').modal('show');
            
            $scope.accountDetails = [];
            $scope.transactions = [];

            $scope.accountDetails.length = 0;
            vm.showBroadcast = 1;
            
            $scope.getAccountDetails = function () {

                dashboardService.getAccountDetails().then(function (response) {
                    
                    $scope.accountDetails = response;
                    // console.log($scope.accountDetails);
                    
                    $scope.modelDismiss();
                    
                    if($scope.accountDetails.length == 0){
                        $('#noResultModal').modal('show');
                    }

                });

            };
            
            $scope.getAccountDetails();
            
            
            vm.accountId = null;
            
            vm.viewTransaction = function (parameter) {
                $('#processing-modal').modal('show');
                vm.showBroadcast = 2;
                vm.selectedStatus = "";
                vm.broadcastId = parameter;
                $scope.transactions.length = 0;
                
                dashboardService.getTransaction(vm.broadcastId).then(function (response1) {
                    
                    // console.log(response);
                    
                    $scope.transactions = response1;
                    console.log($scope.transactions);
                    
                    $scope.modelDismiss();
                    
                    if($scope.accountDetails.length == 0){
                        $('#noResultModal').modal('show');
                    }
                    // PIE Chart Code ****************************

                    var airlines = 0;
                    var bookStores = 0;
                    var carRental = 0;
                    var fastFoodRestaurants = 0;
                    var drugStoresAndPharmacies = 0;
                    
                    var card = 0;
                    var online = 0;

                    angular.forEach($scope.transactions, function(value, key) {
                        
                        if(value.mccCode.mccCode == 3000){
                            airlines = airlines + 1;
                        }else if(value.mccCode.mccCode == 3351){
                            carRental = carRental + 1;
                        }else if(value.mccCode.mccCode == 5814){
                            fastFoodRestaurants = fastFoodRestaurants + 1;
                        }else if(value.mccCode.mccCode == 5912){
                            drugStoresAndPharmacies = drugStoresAndPharmacies + 1;
                        }else if(value.mccCode.mccCode == 5942){
                            bookStores = bookStores + 1;
                        }
                        
                        if(value.transactionType.accountType == "CARD"){
                            card = card + 1;
                        }else if(value.transactionType.accountType == "ONLINE"){
                            online = online + 1;
                        }
                        
                    });

                    var chart = new CanvasJS.Chart("chartId", {
                        title:{
                            text: ""
                        },
                        animationEnabled: true,
                        legend:{
                            verticalAlign: "bottom",
                            horizontalAlign: "center"
                        },
                        data: [
                            {
                                indexLabelFontSize: 14,
                                indexLabelFontFamily: "Monospace",       
                                indexLabelFontColor: "darkgrey", 
                                indexLabelLineColor: "darkgrey",        
                                indexLabelPlacement: "outside",
                                type: "pie",
                                showInLegend: true,
                                toolTipContent: "{legendText}: <strong>{y}%</strong>",
                                indexLabel: "{label} {y}%",
                                dataPoints: [
                                    {  y: airlines, legendText: "Airlines", label: "Airlines", exploded: true, color: "#ff704d"},
                                    {  y: bookStores, legendText: "Book Stores", label: "Book Stores", color: "#436EEE" },
                                    {  y: carRental, legendText: "Car Rental", label: "Car Rental", color: "#ffcc99" },
                                    {  y: fastFoodRestaurants, legendText: "Fast Food Restaurants", label: "Fast Food Restaurants", color: "#b3ffb3" },
                                    {  y: drugStoresAndPharmacies, legendText: "Drug Stores and Pharmacies", label: "Drug Stores and Pharmacies", color: "#57045e" }
                                ]
                            }
                        ]
                    });

                    chart.render();

                    var chartOne = new CanvasJS.Chart("chartIdType", {
                        title:{
                            text: ""
                        },
                        animationEnabled: true,
                        legend:{
                            verticalAlign: "bottom",
                            horizontalAlign: "center"
                        },
                        data: [
                            {
                                indexLabelFontSize: 14,
                                indexLabelFontFamily: "Monospace",       
                                indexLabelFontColor: "darkgrey", 
                                indexLabelLineColor: "darkgrey",        
                                indexLabelPlacement: "outside",
                                type: "pie",
                                showInLegend: true,
                                toolTipContent: "{legendText}: <strong>{y}%</strong>",
                                indexLabel: "{label} {y}%",
                                dataPoints: [
                                    {  y: card, legendText: "Card", label: "Card", color: "#ff704d"},
                                    {  y: online, legendText: "Online", label: "Online", exploded: true, color: "#436EEE" }
                                ]
                            }
                        ]
                    });
                    
                    chartOne.render();
                    
                });
                
            };
            
            var airlines = 0;
            var bookStores = 0;
            var carRental = 0;
            var fastFoodRestaurants = 0;
            var drugStoresAndPharmacies = 0;
            
            var chart = new CanvasJS.Chart("chartId", {
                title:{
                    text: ""
                },
                animationEnabled: true,
                legend:{
                    verticalAlign: "bottom",
                    horizontalAlign: "center"
                },
                data: [
                    {
                        indexLabelFontSize: 14,
                        indexLabelFontFamily: "Monospace",       
                        indexLabelFontColor: "darkgrey", 
                        indexLabelLineColor: "darkgrey",        
                        indexLabelPlacement: "outside",
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "{legendText}: <strong>{y}%</strong>",
                        indexLabel: "{label} {y}%",
                        dataPoints: [
                            {  y: airlines, legendText: "Airlines", label: "Airlines", color: "#ff704d"},
                            {  y: bookStores, legendText: "Book Stores", label: "Book Stores", color: "#436EEE" },
                            {  y: carRental, legendText: "Car Rental", label: "Car Rental", color: "#ffcc99" },
                            {  y: fastFoodRestaurants, legendText: "Fast Food Restaurants", label: "Fast Food Restaurants", color: "#b3ffb3" },
                            {  y: drugStoresAndPharmacies, legendText: "Drug Stores and Pharmacies", label: "Drug Stores and Pharmacies", color: "#57045e" }
                        ]
                    }
                ]
            });
            
            
            var card = 0;
            var online = 0;
            
            var chartOne = new CanvasJS.Chart("chartIdType", {
                title:{
                    text: ""
                },
                animationEnabled: true,
                legend:{
                    verticalAlign: "bottom",
                    horizontalAlign: "center"
                },
                data: [
                    {
                        indexLabelFontSize: 14,
                        indexLabelFontFamily: "Monospace",       
                        indexLabelFontColor: "darkgrey", 
                        indexLabelLineColor: "darkgrey",        
                        indexLabelPlacement: "outside",
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "{legendText}: <strong>{y}%</strong>",
                        indexLabel: "{label} {y}%",
                        dataPoints: [
                            {  y: card, legendText: "Airlines", label: "Airlines", color: "#ff704d"},
                            {  y: online, legendText: "Book Stores", label: "Book Stores", color: "#436EEE" }
                        ]
                    }
                ]
            });
            
            
            
            // get data from service and add it in to drop box
//            $scope.groupName = [];
//            $scope.broadcastDetails = [];
//            
//            $scope.callLog = [];
//
//            dashboardService.getGroups().then(function (response) {
//                angular.forEach(response.user_groups, function(value, key){
//
//                    this.push(value);
//
//                }, $scope.groupName);
//                
//                if($scope.groupName.length == 0){
//                    $scope.modelDismiss();
//                    $scope.show();
//                }
//            });
//
//            // add contact form
//            $scope.data = {
//                group_names: null,
//            };

            
            vm.noResult = function (parameter) {
        
                if($scope.callLog.length !== 0 && parameter === 0  && !$('#noResultModal').is(':visible')){
                    
                    $scope.modelDismiss();
                    $scope.show();
                }
                
                return true;
                    
            };
            
            vm.myStyle = function(status) {
                
                if(status[0].call_status == "completed"){
                    return '#b3ffb3';
                }else if(status[0].call_status == "no-answer"){
                    return '#F8F8FF';
                }else if(status[0].call_status == "busy"){
                    return '#436EEE';
                }else if(status[0].call_status == "failed"){
                    return '#ff704d';
                }
            }
//            
            
            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                $scope.modelDismiss();
            });
            
        }
            
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

}]);

