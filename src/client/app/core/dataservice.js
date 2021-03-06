(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        /* jshint validthis:true */
        var readyPromise;

        var service = {
            getPlayer: getPlayer,
            getPlayers: getPlayers,
            ready: ready
        };

        return service;

        function getPlayer(id) {
            return $http.get('/api/player/' + id)
                .then(getPlayerComplete)
                .catch(getPlayerFailed);

            function getPlayerComplete(data, status, headers, config) {
                return data.data;
            }

            function getPlayerFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getPlayer')(e);
            }
        }

        function getPlayers() {
            return $http.get('/api/players')
                .then(getPlayersComplete)
                .catch(getPlayersFailed);

            function getPlayersComplete(data, status, headers, config) {
                return data.data;
            }

            function getPlayersFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getPlayers')(e);
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
