(function () {
 'use strict';

 angular
  .module('app.menList',[])
  .controller('ManDetail', ManDetail)
// .directive('fluidvids', function () {
//    return {
//        restrict: 'EA',
//        replace: true,
//        transclude: true,
//        scope: {
//           video: '@'
//        },
//   
//        template: '<div class="fluidvids">' +
//                    '<iframe ng-src="{{vm.video}}"></iframe>' +
//                  '</div>',
//        link: function (scope, element, attrs) {
//            var ratio = (attrs.height / attrs.width) * 100;
//            element[0].style.paddingTop = ratio + '%';
//        }
//    };
//});

 /* @ngInject */
 function ManDetail($stateParams, $window, dataservice, logger, $sce) {
  var vm = this;
  vm.cancel = cancel;
  vm.player = undefined;
  vm.goBack = goBack;
  vm.isUnchanged = isUnchanged;
  vm.getFullName = getFullName;
  vm.save = save;
  vm.title = 'Man Detail';
 

  activate();

  

     
     
   // console.log(vm.player);
 //vm.videoURL1 = $sce.trustAsResourceUrl(vm.player);


  
  
  function activate() {
   return getPlayer($stateParams.id).then(function () {
    logger.info('Activated Customer Detail View');
   });
  }

  function cancel() {
   vm.player = angular.copy(vm.original);
  }

  function getPlayer(id) {
   return dataservice.getPlayer(id).then(function (data) {
    vm.player = data;
    vm.original = angular.copy(vm.player);
    vm.videoURL1 = $sce.trustAsResourceUrl(vm.player.videoPath1);
    vm.videoURL2 = $sce.trustAsResourceUrl(vm.player.videoPath2);
    vm.videoURL3 = $sce.trustAsResourceUrl(vm.player.videoPath3);
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
}

)();