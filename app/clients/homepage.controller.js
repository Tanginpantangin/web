/* global angular */
'use strict';

angular.module('app')
    .controller('HomePageController', ['$state', function($state) {
        var ctrl = this;
        ctrl.gotoPage = function(state) {
            $state.go(state);
        };

        ctrl.init = function() {
            ctrl.slides = [{
                image: 'clients/assets/img/slider1.jpg',
                description: 'description 1'
            }, {
                image: 'clients/assets/img/slider2.jpg',
                description: 'description 2'
            }, {
                image: 'clients/assets/img/slider3.jpg',
                description: 'Another 1'
            }, {
                image: 'clients/assets/img/slider4.jpg',
                description: 'Another 3'
            }];
        };
        ctrl.init();
    }]);
