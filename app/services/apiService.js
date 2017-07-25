
app.service('apiService', ['$http', '$q', 'appSettings', function ($http, $q, appSettings) {

    var apiService = {};
    var apiBase = appSettings.apiBase;
    var accessToken = 'Bearer 4b43fb89-a358-326d-9a2b-93b711206710';
    
    $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };
        $http.defaults.useXDomain = true;
    
    //===========================GET LOGIN RESOURCE==============================
    // login detail object
   var getLogin = function (module, parameter) {
        var deferred = $q.defer();

        $http.post(apiBase + module, parameter, { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*', 'Authorization' : accessToken} }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };
    
    //===========================GET Dashboard RESOURCE==============================
    // get accouts
    var getAccounts = function (module, token) {
        var deferred = $q.defer();
        
        $http.get(apiBase + module, { headers: { 'Content-Type': 'application/json', 'X-Authorization' : token, 'Accept' : '*/*', 'Authorization' : accessToken } }).success(function (response) {
            
            deferred.resolve(response);

        }).catch(function (data, status, headers, config) { // <--- catch instead error
            
            deferred.reject(data.statusText);
            
        });

        return deferred.promise;
    };
    
     var getTransaction = function (module, token) {
        var deferred = $q.defer();
        
        $http.get(apiBase + module, { headers: { 'Content-Type': 'application/json', 'X-Authorization' : token, 'Accept' : '*/*', 'Authorization' : accessToken } }).success(function (response) {
            
            deferred.resolve(response);

        }).catch(function (data, status, headers, config) { // <--- catch instead error
            
            deferred.reject(data.statusText);
            
        });

        return deferred.promise;
    };
    
    
    apiService.getLogin = getLogin;
    
    apiService.getAccounts = getAccounts;
    
    apiService.getTransaction = getTransaction;

    return apiService;

}]);
