describe('BonController', function () {
    var scope, ctrl, $httpBackend;

    beforeEach(module('bonApp'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i')
            .respond([{'ISBN-10': 'AAAA', title: 'Test1', price: 11}, {'ISBN-10': 'BBBB', title: 'Test2', price: 22}]);
        scope = $rootScope.$new();
        ctrl = $controller('BonController', {$scope: scope});
    }));

    it('should create "catalogue" model with 2 articles fetched from xhr', function() {
        expect(scope.catalogue).toBeUndefined();
        $httpBackend.flush();
        expect(scope.catalogue).toEqual([{'ISBN-10': 'AAAA', title: 'Test1', price: 11}, {'ISBN-10': 'BBBB', title: 'Test2', price: 22}]);
    });

    it('should delete an article from the cart', function() {
        scope.articles = [
            {isbn: 'AAAA', title: 'Test1', price: 11, quantite : 1},
            {isbn: 'BBBB', title: 'Test2', price: 22, quantite : 2}
        ];

        scope.deleteArticle(scope.articles[0]);

        expect(scope.articles).toEqual([
            {isbn: 'BBBB', title: 'Test2', price: 22, quantite : 2}
        ]);
    });

    it('should add an article to the cart', function() {
        scope.artCatalogue = {'ISBN-10': 'CCCC', title: 'Test3', price: 33};
        scope.quantite = 10;

        scope.articles = [
            {isbn: 'AAAA', title: 'Test1', price: 11, quantite : 1},
            {isbn: 'BBBB', title: 'Test2', price: 22, quantite : 2}
        ];

        scope.addArticle2();

        expect(scope.articles).toEqual([
            {isbn: 'AAAA', title: 'Test1', price: 11, quantite : 1},
            {isbn: 'BBBB', title: 'Test2', price: 22, quantite : 2},
            {'isbn': 'CCCC', title: 'Test3', price: 33, quantite : 10}
        ]);
    });


});