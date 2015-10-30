(function () {
    'use strict';

    angular
        .module('app.menList')
        .controller('menList', menList);

    /* @ngInject */
    function menList($state, dataservice, logger) {
        var vm = this;
        vm.menList = [];
        vm.gotoManPlayer = gotoManPlayer;
        vm.title = 'MEN\'S RANKING 20';

        activate();

        function activate() {
            return getPlayers().then(function () {
                logger.info('Activated Players View');
            });
        }

        function getPlayers() {
            return dataservice.getPlayers().then(function (data) {
                vm.players = data;
                return vm.players;
            });
        }

        function gotoManPlayer(c) {
            $state.go('Mandetail', {
                id: c.id
            });
        }
    }
})();
