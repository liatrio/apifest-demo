dashboard.controller("EducationController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    
    if (typeof(Storage) !== "undefined") {
        
        if(!localStorage.getItem("success")){
            $state.go('login');
        
        }else{

            var vm = this;
            console.log("coming to Send Message controller");
            
            vm.showBroadcast = 0;
            $scope.accountDetails= {};
            vm.state = "Accounts";
            $('#processing-modal').modal('show');

            dashboardService.getAccounts().then(function (response) {
                
                $scope.modelDismiss();
                
                $scope.accountDetails = response;
                vm.showBroadcast = 1;
                
                if($scope.accountDetails.content.length == 0){
                    $('#noResultModal').modal('show');
                }

            });
            
            vm.viewMap = function (latitude, longitude) {
                console.log(latitude + " - " + longitude);
                
                var div = document.getElementById('iframeDiv');

                div.innerHTML = div.innerHTML + "<iframe id='iframe' src='https://maps.google.com/maps?q=" + longitude + "," + latitude + "&hl=es;z=14&amp;output=embed' height='450' frameborder='0' style='border:0;width:100%;' allowfullscreen></iframe>";
                
                var modal = document.getElementById('myModal');

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        var div = document.getElementById('iframeDiv');
                        div.innerHTML = "";
                        modal.style.display = "none";
                    }
                }
            };

            $scope.transactions = 0;
            vm.viewTransaction = function (accountId) {

                $('#processing-modal').modal('show');
                
                vm.showBroadcast = 2;
                
                dashboardService.getTransaction(accountId).then(function (response) {
                    
                    vm.state = "Transactions";
                    
                    // console.log(response.content[8].latitude + " - " + response.content[0].longitude);
                    console.log(response);
                    
                    $scope.transactions = response;
                    $scope.modelDismiss();
                    
                    if($scope.transactions.content.length == 0){
                        $('#noResultModal').modal('show');
                    }
                    
   
                    // PIE Chart Code ****************************

                    var airlines = 0; var autoRental = 0; var groceries = 0; var automotive = 0; var familyClothing = 0; 
                    var electronics = 0; var restaurants = 0; var drugStores = 0; var bookStores = 0; var others = 0; 
                    
                    var atm = 0;  var charge = 0;  var check = 0;  var deposit = 0;  var withdrawal = 0;  var online = 0;

                    angular.forEach($scope.transactions.content, function(value, key) {
                        
                        if(value.mccCode){
                            if(value.mccCode.mccCode == 3000){
                                airlines = airlines + 1;
                            }else if(value.mccCode.mccCode == 3351){
                                autoRental = autoRental + 1;
                            }else if(value.mccCode.mccCode == 5411){
                                groceries = groceries + 1;
                            }else if(value.mccCode.mccCode == 5533){
                                automotive = automotive + 1;
                            }else if(value.mccCode.mccCode == 5651){
                                familyClothing = familyClothing + 1;
                            }else if(value.mccCode.mccCode == 5732){
                                electronics = electronics + 1;
                            }else if(value.mccCode.mccCode == 5814){
                                restaurants = restaurants + 1;
                            }else if(value.mccCode.mccCode == 5912){
                                drugStores = drugStores + 1;
                            }else if(value.mccCode.mccCode == 5942){
                                bookStores = bookStores + 1;
                            }else if(value.mccCode.mccCode == 9999){
                                others = others + 1;
                            }
                        }
                        
                        if(value.transactionType) {
                            if(value.transactionType.accountType == "ATM"){
                                atm = atm + 1;
                            }else if(value.transactionType.accountType == "CHARGE"){
                                charge = charge + 1;
                            }else if(value.transactionType.accountType == "CHECK"){
                                check = check + 1;
                            }else if(value.transactionType.accountType == "DEPOSIT"){
                                deposit = deposit + 1;
                            }else if(value.transactionType.accountType == "WITHDRAWAL"){
                                withdrawal = withdrawal + 1;
                            }else if(value.transactionType.accountType == "ONLINE"){
                                online = online + 1;
                            }
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
                                    {  y: autoRental, legendText: "Auto Rental", label: "Auto Rental", color: "#ffcc99" },
                                    {  y: groceries, legendText: "Grocery Stores, Supermarkets", label: "Grocery Stores, Supermarkets", color: "#5F1EB3" },
                                    {  y: automotive, legendText: "Automotive Parts, Accessories Stores", label: "Automotive Parts, Accessories Stores", color: "#436EEE" },
                                   
                                    {  y: familyClothing, legendText: "Family Clothing Stores", label: "Family Clothing Stores", color: "#b3ffb3" },
                                    {  y: electronics, legendText: "Electronic Sales", label: "Electronic Sales", color: "#6AD863" },
                                    {  y: restaurants, legendText: "Fast Food Restaurants", label: "Fast Food Restaurants", color: "#51D8D6" },
                                    {  y: drugStores, legendText: "Drug Stores and Pharmacies", label: "Drug Stores and Pharmacies", color: "#D8515B" },
                                    {  y: bookStores, legendText: "Book Stores", label: "Book Stores", color: "#E38221" },
                                    {  y: others, legendText: "Other", label: "Other", color: "#DDEE63" }
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
                                    {  y: atm, legendText: "ATM", label: "ATM", color: "#ff704d"},
                                    {  y: charge, legendText: "CHARGE", label: "CHARGE", color: "#6AD863"},
                                    {  y: check, legendText: "CHECK", label: "CHECK", color: "#51D8D6"},
                                    {  y: deposit, legendText: "DEPOSIT", label: "DEPOSIT", color: "#D8515B"},
                                    {  y: withdrawal, legendText: "WITHDRAWAL", label: "WITHDRAWAL", color: "#ffcc99"},
                                    {  y: online, legendText: "Online", label: "Online", exploded: true, color: "#DDEE63" }
                                ]
                            }
                        ]
                    });
                    chartOne.render();
                
                });
                
            };
            
            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                $scope.modelDismiss();
            });

        }
            
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

}]);

