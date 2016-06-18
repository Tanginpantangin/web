/* global angular, TweenMax*/

'use strict';

var application = angular.module('app');

function animation() {
    return {
        beforeAddClass: function(element, className, done) {
            var scope = element.scope();

            if (className === 'ng-hide') {
                var finishPoint = element.parent()[0].offsetWidth;
                if (scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 1.5, {
                    left: finishPoint,
                    onComplete: done
                });
            } else {
                done();
            }
        },
        removeClass: function(element, className, done) {
            var scope = element.scope();

            if (className === 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent()[0].offsetWidth;
                if (scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 1.5, {
                    left: startPoint
                }, {
                    left: 0,
                    onComplete: done
                });
            } else {
                done();
            }
        }
    };
}
application.animation('.slide-animation', animation);

function slider($timeout) {
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
}
application.directive('slider', ['$timeout', slider]);
