(function () {
    "use strict";

    angular.module("newsfeed")
        .component("editPopupComponent", editPopupComponent());

    function editPopupComponent() {
        return {
            templateUrl: "../templates/editPopupComponentTemplate.html",
            controller: editPopupComponentCtrl,
            controllerAs: "editPopupComponentCtrl",
            bindings: {
                visible: "<",
                article: "=",
                onClose: "&",
                onRemoveImg: "&",
                onSave: "&"

            }
        };

        function editPopupComponentCtrl() {
            var editPopupComponentCtrl = this;


            editPopupComponentCtrl.save = save;

            function save() {
                if (editPopupComponentCtrl.newArticleForm.$invalid) {
                    editPopupComponentCtrl.newArticleForm.$setSubmitted();
                    return false;
                }
                editPopupComponentCtrl.onSave();
            }
        }
    }
})();