(function() {
    'use strict';

    angular
        .module('app.womenList')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'Women',
                config: {
                    abstract: true,
                    template: '<ui-view class="shuffle-animation"/>',
                    url: '/Women'
                }
            },
            {
                state: 'Women.womenList',
                config: {
                    url: '/womenList',
                    templateUrl: 'app/womenList/womenList.html',
                    controller: 'womenList',
                    controllerAs: 'vm',
                    title: 'Women\'s List',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-female"></i> WOMEN'
                    }
                }
            },
            {
                state: 'Womandetail',
                config: {
                    url: '/:id',
                    templateUrl: 'app/womenList/woman-detail.html',
                    controller: 'WomanDetail',
                    controllerAs: 'vm',
                    title: 'Woman Detail'
                }
            }
        ];
    }
})();
