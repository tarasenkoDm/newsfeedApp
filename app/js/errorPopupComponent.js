(function () {
    "use strict";

    angular.module("newsfeed")
        .component("errorPopupComponent", errorPopupComponent());


    function errorPopupComponent() {
        return {

            templateUrl: "../templates/errorPopupComponentTemplate.html",

            controller: errorPopupComponentCtrl,
            controllerAs: "errorPopupComponentCtrl",
            bindings: {
                errorText: "<",
                onOk: "&"
            }
        };

        function errorPopupComponentCtrl() {
            var errorPopupComponentCtrl = this;
        }
    }
})();