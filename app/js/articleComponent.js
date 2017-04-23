(function () {
    "use strict";

    angular.module("newsfeed")
        .component("articleComponent", articleComponent());

    function articleComponent() {
        return {
            templateUrl: "../templates/articleComponentTemplate.html",
            controller: articleComponentCtrl,
            controllerAs: "articleComponentCtrl",
            bindings: {
                article: "<",
                onEdit: "&",
                onDelete: "&"
            }
        };

        function articleComponentCtrl() {
            var articleComponentCtrl = this;
        }
    }
})();