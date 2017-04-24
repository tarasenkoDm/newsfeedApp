(function () {
    "use strict";

    angular.module("newsfeed")
        .controller("newsfeed", newsfeed);

    newsfeed.$inject = ["$http", "NEWSFEED_URL_CONSTANTS", "$rootScope"];

    function newsfeed($http, NEWSFEED_URL_CONSTANTS, $rootScope) {
        var newsfeed = this;

        // Parameters
        newsfeed.SORTING_OPTIONS = [
            { name: "title", value: "title" },
            { name: "creation date", value: "createdDate" },
            { name: "last update", value: "updatedDate" }
        ];
        newsfeed.sortField = newsfeed.SORTING_OPTIONS[1].value;
        newsfeed.reverseSortOrder = true;
        newsfeed.filter = "";

        newsfeed.articles = [];
        newsfeed.newArticleModel = {};
        newsfeed.editPopupVisible = false;
        newsfeed.errorMessage = "";

        //Methods
        newsfeed.showEditPopup = showEditPopup;
        newsfeed.hideEditPopup = hideEditPopup;
        newsfeed.getEmptyModel = getEmptyModel;
        newsfeed.removeImage = removeImage;
        newsfeed.saveArticle = saveArticle;
        newsfeed.deleteArticle = deleteArticle;
        newsfeed.resetFilter = resetFilter;
        newsfeed.clearErrorMessage = clearErrorMessage;

        //Functions

        function clearErrorMessage() {
            newsfeed.errorMessage = "";
            $rootScope.showPopup = false;
        }

        function resetFilter() {
            newsfeed.sortField = newsfeed.SORTING_OPTIONS[1].value;
            newsfeed.reverseSortOrder = true;
            newsfeed.filter = "";
        }

        function removeImage() {
            newsfeed.newArticleModel.image = '';
        }

        function showEditPopup(modelForEdit) {
            newsfeed.editPopupVisible = true;
            $rootScope.showPopup = true;
            if (modelForEdit) {
                newsfeed.newArticleModel = _.cloneDeep(modelForEdit);
            }
            else {
                newsfeed.newArticleModel = getEmptyModel();
            }
        }

        function hideEditPopup() {
            newsfeed.editPopupVisible = false;
            $rootScope.showPopup = false;
        }


        function getEmptyModel() {
            return {
                id: "",
                author: $rootScope.lodinedUser,
                title: "",
                text: "",
                image: "",
                createdDate: "",
                updatedDate: ""
            }
        }

        function saveArticle() {
            if (newsfeed.newArticleModel.id) {
                newsfeed.newArticleModel.updatedDate = $.now();
                $http.put(NEWSFEED_URL_CONSTANTS["PUT_ARTICLE"] +
                    "/" + newsfeed.newArticleModel.id,
                    newsfeed.newArticleModel)
                    .then(function () {
                        var articleIndex = _.findIndex(
                            newsfeed.articles, {'id': newsfeed.newArticleModel.id}
                        );
                        newsfeed.articles[articleIndex] = newsfeed.newArticleModel;
                       hideEditPopup();
                    })
                    .catch(function(err) {
                        newsfeed.errorMessage = "Error while updating article: " +  err.status + ' ' + err.statusText;
                        $rootScope.showPopup = true;
                    })
            } else {
                newsfeed.newArticleModel.id = createId();
                newsfeed.newArticleModel.createdDate = $.now();

                $http.post(NEWSFEED_URL_CONSTANTS["POST_ARTICLE"], newsfeed.newArticleModel)
                    .then(function () {
                        newsfeed.articles.push(newsfeed.newArticleModel);
                        hideEditPopup();
                    })
                    .catch(function(err) {
                        newsfeed.errorMessage = "Error while adding new article: " +  err.status + ' ' + err.statusText;
                        $rootScope.showPopup = true;
                    });
            }
        }

        function deleteArticle(id) {
            $http.delete(NEWSFEED_URL_CONSTANTS["DELETE_ARTICLE"] + "/" + id)
                .then(function () {
                    var articleIndex = _.findIndex(newsfeed.articles, {'id': id});
                    newsfeed.articles.splice(articleIndex, 1);
                })
                .catch(function(err) {
                    newsfeed.errorMessage = "Error while deleting article: " +  err.status + ' ' + err.statusText;
                    $rootScope.showPopup = true;
                });
        }

        function createId() {
            return $.now();
        }

        //Initializatiion

        (function () {
            $http.get(NEWSFEED_URL_CONSTANTS["GET_NEWSFEED"])
                .then(function (response) {
                    newsfeed.articles = response.data;
                })
                .catch(function(err) {
                    newsfeed.errorMessage = "Error while loading newsfeed: " +  err.status + ' ' + err.statusText;
                    $rootScope.showPopup = true;
                })
        })();
    }
})();