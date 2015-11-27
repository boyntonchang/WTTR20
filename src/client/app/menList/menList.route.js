(function () {
 'use strict';

 angular
  .module('app.menList')
  .run(appRun);

 /* @ngInject */
 function appRun(routerHelper) {
  routerHelper.configureStates(getStates());
 }

 function getStates() {
  return [
   {
    state: 'Men',
    config: {
     abstract: true,
     template: '<ui-view class="shuffle-animation"/>',
     url: '/Men'
    }
            },
   {
    state: 'menList',
    config: {
     url: '/',
     templateUrl: 'app/menList/menList.html',
     controller: 'menList',
     controllerAs: 'vm',
     title: 'Men\'s List',
     settings: {
      nav: 1,
      content: '<i class="fa fa-male"></i> MAN'
     }
    }
            },
//            {
//                state: 'menList',
//                config: {
//                    url: '/menList',
//                    templateUrl: 'app/menList/menList.html',
//                    controller: 'menList',
//                    controllerAs: 'vm',
//                    title: 'Men\'s List',
//                    settings: {
//                        nav: 1,
//                        content: '<i class="fa fa-male"></i> MAN'
//                    }
//                }
//            },
   {
    state: 'Mandetail',
    config: {
     url: '/:id',
     templateUrl: 'app/menList/man-detail.html',
     controller: 'ManDetail',
     controllerAs: 'vm',
     title: 'Man  Detail'
    }
            }
        ];
 }
})();