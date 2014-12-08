angular.module('bonApp', ['ngRoute'])
    .controller('BonController', ['$scope', '$http', '$route', function($scope, $http, $route) {

        var tva = 1.21;

        $scope.articles = [
            {isbn : "1445478518", title : "HTML5 and JavaScript Web Apps", price : 16.98, quantite : 10},
            {isbn : "1449324784", title : "I am Batman - Secrets", price : 20.5, quantite : 1},
            {isbn : "4789320511", title : "World of Unicorns", price : 250.65, quantite : 6},
            {isbn : "4789320511", title : "World of Little Ponies", price : 20.65, quantite : 60}
        ];

        $http.get('https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i').
            success(function(data, status, headers, config) {
                $scope.catalogue = data;
            }).
            error(function(data, status, headers, config) {
                $scope.catalogue = [];
            });

        $scope.isBold = function (article) {
            return article.price * article.quantite > 1000;
        };

        $scope.getMontant = function (article) {
            return article.price * article.quantite;
        };

        $scope.getTVA = function(article) {
            return $scope.getMontant(article) * tva;
        };

        $scope.getTotalHT = function () {
            var total = 0;
            angular.forEach($scope.articles, function(article) {
                total += $scope.getMontant(article);
            });
            return total;
        };

        $scope.getTotalTTC = function () {
            var total = 0;
            angular.forEach($scope.articles, function(article) {
                total += $scope.getTVA(article);
            });
            return total;
        };

        $scope.deleteArticle = function (i) {
            $scope.articles.splice(i, 1);
        };

        //$scope.addArticle = function() {
        //    $scope.articles.push({isbn : $scope.isbn, title : $scope.title, price : $scope.price, quantite : $scope.quant ? $scope.quant : 1});
        //    $scope.isbn = '';
        //    $scope.title = '';
        //    $scope.price = '';
        //    $scope.quant = '';
        //};

        $scope.addArticle2 = function() {
            $scope.articles.push({
                    isbn : $scope.artCatalogue["ISBN-10"],
                    title : $scope.artCatalogue.title,
                    price : $scope.artCatalogue.price,
                    quantite : $scope.quantite ? $scope.quantite : 1});
            $scope.artCatalogue = undefined;
            $scope.quantite = '';
        };

    }]);
