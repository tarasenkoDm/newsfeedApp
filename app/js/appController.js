(function () {
    "use strict";

    angular.module("app")
        .controller("appController", appController);

    appController.$inject = ["$rootScope"];

    function appController($rootScope) {
        var appController = this;
        $rootScope.lodinedUser = "User-author"
    }
})();