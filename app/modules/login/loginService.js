
login.service('loginService', ['$http', '$q', 'Flash', 'apiService', function ($http, $q, Flash, apiService) {

    var loginService = {};


    //service to communicate with users model to verify login credentials
    var accessLogin = function (parameters) {
        var deferred = $q.defer();
        
        apiService.getLogin("Security/v2.0.0/login", parameters).then(function (response) {
            if (response){
                deferred.resolve(response);
            }else{
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
            }
            
        }, function (response) {
            deferred.reject(response);
        });
        
        return deferred.promise;
    };

    loginService.accessLogin = accessLogin;

    return loginService;

}]);
