app.controller('MainController', function ($rootScope, $scope, $location) {
    $scope.logout = function () {
        $scope.$emit('event:logoutRequest');

        $location.path("/main");
    };

    $scope.login = function (credentials) {
        $scope.$emit('event:loginRequest', credentials.email, credentials.password);

        $location.path($rootScope.navigateTo);
    };
});

app.controller('CustomerController', function ($rootScope, $scope, CustomerService) {
    $scope.init = function () {
        CustomerService.getCustomers().then(
            function success(response) {
                $scope.customers = response;
            },
            function error() {
                $rootScope.errors.push({ code: "CUSTOMERS_GET_FAILURE", message: "Oooooops something went wrong, please try again" });
            });
    };

    $scope.delete = function (id) {
        CustomerService.deleteCustomer(id).then(
            function success(response) {
                if (response) {
                    angular.forEach($scope.customers, function (customer, index) {
                        if (id == customer.id) {
                            $scope.customers.splice(index, 1);

                            console.info("Customer " + id + " has been deleted.")
                        }
                    });
                }
                else {
                    console.error("Customer " + id + " was unable to be deleted.")
                }
            },
            function error() {
                $rootScope.errors.push({ code: "CUSTOMER_DELETE_FAILURE", message: "Oooooops something went wrong, please try again" });
            });
    };

    $scope.save = function (id) {
        angular.forEach($scope.customers, function (customer) {
                if (id == customer.id) {
                    CustomerService.saveCustomer(customer).then(
                        function success(response) {
                            if (response) {
                                console.info("Customer " + id + " has been saved.")
                            }
                            else {
                                console.error("Customer " + id + " was unable to be saved.")
                            }
                        });
                }
            },
            function error() {
                $rootScope.errors.push({ code: "CUSTOMER_SAVE_FAILURE", message: "Oooooops something went wrong, please try again" });
            });
    };
});