(function () {
    "use strict";

    angular.module("newsfeed")
        .constant("NEWSFEED_URL_CONSTANTS", {
            "GET_NEWSFEED": " http://localhost:3000/articles",
            "PUT_ARTICLE": "http://localhost:3000/articles",
            "POST_ARTICLE": "http://localhost:3000/articles",
            "DELETE_ARTICLE": "http://localhost:3000/articles"
        })
})();


