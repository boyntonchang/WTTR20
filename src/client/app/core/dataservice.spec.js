/* jshint -W117, -W030 */
describe('dataservice', function() {
    var players = mockData.getMockCustomers();
    var $httpFlush;

    beforeEach(function() {
        bard.appModule('app.core');
        bard.inject(this, '$httpBackend', '$rootScope', 'dataservice');
    });

    beforeEach(function() {
        $httpBackend.when('GET', '/api/players').respond(200, players);
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(dataservice).not.to.equal(null);
    });

    describe('getCustomers function', function() {
        it('should exist', function() {
            expect(dataservice.getCustomers).not.to.equal(null);
        });

        it('should return 5 Customers', function(done) {
            dataservice.getCustomers().then(function(data) {
                expect(data.length).to.equal(5);
            }).then(done, done);
            $httpFlush();
        });

        it('should contain Black Widow', function(done) {
            dataservice.getCustomers().then(function(data) {
                var hasBlackWidow = data.some(function isPrime(element, index, array) {
                    return element.firstName.indexOf('Black') >= 0;
                });
                expect(hasBlackWidow).to.be.true;
            }).then(done, done);
            $httpFlush();
        });
    });

    describe('ready function', function() {
        it('should exist', function() {
            expect(dataservice.ready).to.be.defined;
        });

        it('should return a resolved promise with the dataservice itself', function(done) {
            dataservice.ready().then(function(data) {
                expect(data).to.equal(dataservice);
            })
            .then(done, done);
            $rootScope.$apply(); // no $http so just flush
        });
    });
});
