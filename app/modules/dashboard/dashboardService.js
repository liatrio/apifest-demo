
dashboard.service('dashboardService', ['$http', '$q', 'Flash', 'apiService', function ($http, $q, Flash, apiService) {

    var dashboardService = {};
    
    var getAccounts = function () {
        var deferred = $q.defer();
        
        apiService.getAccounts("Account/v2.0.0/account?page=0&size=10", localStorage.xAuthorizationToken).then(function (response) {
            
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
         
        var deferred = $q.defer();
        var re;        
        apiService.getTransaction("Transactions/v2.0.0/transaction/findByAccountId/"+accountId+"?page=0&size=10", localStorage.xAuthorizationToken).then(function (response) {
            
            if (response){
                re=response;
                apiService.getTransaction("Transactions/v2.0.0/transaction/findByAccountId/"+accountId+"?page=1&size=10", localStorage.xAuthorizationToken).then(function (response) {
                for (i = 0; i < 10; i++) { 
                    re.content.push(response.content[i]);
                }                    
                });
                deferred.resolve(re);
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
