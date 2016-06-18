/* global angular */
'use strict';

angular.module('app')     
    .controller('HomePageController', ['$state', function($state) {
        var ctrl = this;
        ctrl.gotoPage = function(state) {
            $state.go(state);
        };
        ctrl.slides = [{
                image: 'clients/assets/img/bg-xalih.jpg',
                description: 'Image 00'
            }, {
                image: 'clients/assets/img/bg-xalih.jpg',
                description: 'Image 01'
            }, {
                image: 'clients/assets/img/bg-xalih.jpg',
                description: 'Image 00'
            }];

    }]);

    .directive('slider', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/slider/slider.html',
            scope: {
                slides: '=',
                timeInterval: '='
            },
            link: function(scope) {
                scope.timeInterval = scope.timeInterval ? scope.timeInterval : 5;

                var direction = 'left';
                var currentIndex = 0;
                var timeInterval = 5;
                var timeCounter = 0;
                setInterval(function() {
                    timeCounter++;
                    if (timeCounter === timeInterval) {
                        scope.prevSlide();
                    }
                }, 1000);

                scope.setCurrentSlideIndex = function(index) {
                    direction = (index > currentIndex) ? 'left' : 'right';
                    currentIndex = index;
                };

                scope.isCurrentSlideIndex = function(index) {
                    return currentIndex === index;
                };

                scope.prevSlide = function() {
                    $timeout(function() {
                        direction = 'left';
                        currentIndex = (currentIndex < scope.slides.length - 1) ? ++currentIndex : 0;
                        timeCounter = 0;
                    }, 0);
                };

                scope.nextSlide = function() {
                    $timeout(function() {
                        scope.direction = 'right';
                        currentIndex = (currentIndex > 0) ? --currentIndex : scope.slides.length - 1;
                        timeCounter = 0;
                    }, 0);
                };
            }
        };
    }]);
