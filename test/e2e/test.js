describe('Commande Controller', function() {

    var articles;

    beforeEach(function () {
        browser.get('http://localhost:8000/app/index.html');
        articles = element.all(by.repeater('article in articles').column("isbn"));

    });

    it('should create example articles', function() {
        expect(articles.count()).toEqual(4);
        expect(articles.get(1).getText()).toEqual('1449324784');
    });

    it('should delete one article', function() {
        element.all(by.repeater('article in articles')).get(0).element(by.css("a.deleteButton")).click();

        expect(articles.count()).toEqual(3);
        expect(articles.get(0).getText()).toEqual("1449324784");

    });

    it('should add one article', function() {
        element(by.model("artCatalogue")).all(by.cssContainingText("option", "Ninja")).click();
        element(by.model("quantite")).sendKeys(10);
        element(by.buttonText("Add")).click();

        expect(articles.count()).toEqual(5);
        var titleAdded = element.all(by.repeater('article in articles').column("title"));
        expect(titleAdded.last().getText()).toContain("Ninja");
        var quantite = element.all(by.repeater('article in articles')).last().element(by.model("article.quantite"));
        expect(quantite.getAttribute("value")).toEqual('10');
    });
});