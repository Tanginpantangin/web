/* global angular */
'use strict';

angular.module('app')
    .controller('HomePageController', ['$state', function($state) {
        var ctrl = this;
        ctrl.gotoPage = function(state) {
            $state.go(state);
        };
    }]);
