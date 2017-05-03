
dashboard.service('dashboardService', ['$http', '$q', 'Flash', 'apiService', function ($http, $q, Flash, apiService) {

    var dashboardService = {};
    
    var getAccounts = function () {
        var deferred = $q.defer();
        
        apiService.getAccounts("accounts/v1.0.0/account?page=0&size=10", localStorage.xAuthorizationToken).then(function (response) {
            
            if (response){
                deferred.resolve(response);
            }else{
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
            }
            
        },function (response) {
                deferred.reject(response);
        });
        return deferred.promise;
    };
    
      var getTransaction = function (accountId) {
         console.log("coming to Send Message controller x x x 1"  + accountId);
        var deferred = $q.defer();
         console.log("coming to Send Message controller x x x 2");
        apiService.getTransaction("transactions/v1.0.0/transaction/findByAccountId/"+accountId+"?page=0&size=10", localStorage.xAuthorizationToken).then(function (response) {
             console.log("coming to Send Message controller x x x 3");
            if (response){
                deferred.resolve(response);
            }else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
            
        },function (response) {
                deferred.reject(response);
        });
        return deferred.promise;
    };
    
    
    dashboardService.getAccounts = getAccounts;
    dashboardService.getTransaction = getTransaction;
    
    return dashboardService;
    

}]);
