
dashboard.service('dashboardService', ['$http', '$q', 'Flash', 'apiService', function ($http, $q, Flash, apiService) {

    var dashboardService = {};
    
    var getAccounts = function () {
        var deferred = $q.defer();
        
        apiService.getAccounts("accounts/v1.0.0/account?page=0&size=10", localStorage.xAuthorizationToken).then(function (response) {
            
            if (response){
                deferred.resolve(response);
            }else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
            
        },function (response) {
                deferred.reject(response);
        });
        return deferred.promise;
    };
    
      var getTransaction = function () {
        var deferred = $q.defer();
        
        apiService.getTransaction("transactions/v1.0.0/transaction/findByAccountId/1?page=0&size=10", localStorage.xAuthorizationToken).then(function (response) {
            
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
