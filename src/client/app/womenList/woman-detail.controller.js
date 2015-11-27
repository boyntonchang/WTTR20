(function () {
 'use strict';

 angular
  .module('app.womenList')
  .controller('WomanDetail', WomanDetail);

 /* @ngInject */
 function WomanDetail($stateParams, $window, dataservice, logger) {
  var vm = this;
  vm.cancel = cancel;
  vm.player = undefined;
  vm.goBack = goBack;
  vm.isUnchanged = isUnchanged;
  vm.getFullName = getFullName;
  vm.save = save;
  vm.title = 'Woman Detail';

  activate();

  function activate() {
   return getPlayer($stateParams.id).then(function () {
    logger.info('Activated Player Detail View');
   });
  }

  function cancel() {
   vm.player = angular.copy(vm.original);
  }

  function getPlayer(id) {
   return dataservice.getPlayer(id).then(function (data) {

    vm.player = data;
    vm.original = angular.copy(vm.player);
    return vm.player;
   });
  }

  function goBack() {
   $window.history.back();
  }

  function isUnchanged() {
   return angular.equals(vm.player, vm.original);
  }

  function getFullName() {
   return vm.player && vm.player.playerName;
  }

  function save() {
   vm.original = angular.copy(vm.player);
   logger.success('Saving Player (not really)');
  }
 }
})();