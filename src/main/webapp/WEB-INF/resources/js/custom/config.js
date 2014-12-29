app.config([ '$routeProvider', '$httpProvider', 'localStorageServiceProvider', function($routeProvider, $httpProvider, localStorageServiceProvider) {

    // ======= local storage configuration ========

    localStorageServiceProvider.prefix = 'example';

	// ======= router configuration =============

	$routeProvider
		.when('/main', {
			templateUrl: 'resources/html/partials/view/main.html'
		})
		.when('/customer/search', {
			controller: 'CustomerController',
			templateUrl: 'resources/html/partials/view/customer_search.html'
		})
		.when('/login', {
			templateUrl: 'resources/html/partials/view/login.html'
		})
		.otherwise({ redirectTo : "/main"});
	
	// ======== http configuration ===============
	
	//configure $http to view a login whenever a 401 unauthorized response arrives
    $httpProvider.responseInterceptors.push(function ($rootScope, $q) {
        return function (promise) {
            return promise.then(
                //success -> don't intercept
                function (response) {
                    return response;
                },
                //error -> if 401 save the request and broadcast an event
                function (response) {
                    if (response.status === 401) {
                        var deferred = $q.defer(),
                            req = {
                                config: response.config,
                                deferred: deferred
                            };

                        $httpProvider.defaults.headers.common.Authorization = null;

                        $rootScope.requests401.push(req);
                        $rootScope.$broadcast('event:loginRequired');

                        return deferred.promise;
                    }
                    return $q.reject(response);
                }
            );
        };
    });
}]);