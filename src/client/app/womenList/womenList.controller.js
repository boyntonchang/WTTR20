(function () {
    'use strict';

    angular
        .module('app.womenList')
        .controller('womenList', womenList);

    /* @ngInject */
    function womenList($state, dataservice, logger) {
        var vm = this;
        //vm.womenList = [];
         vm.gotoWomanPlayer = gotoWomanPlayer;
        vm.title = 'WOMEN\'S RANKING 20';

        activate();

         function activate() {
            return getPlayers().then(function () {
                logger.info('Activated  Women Players View');
            });
        }

        function getPlayers() {
            return dataservice.getPlayers().then(function (data) {
                vm.players = data;
            
                return vm.players;
            });
        }

        function gotoWomanPlayer(c) {
            $state.go('Womandetail', {
                id: c.id
            });
        }
    }
})();
