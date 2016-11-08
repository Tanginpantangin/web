/* global angular */
'use strict';

angular.module('app')
.animation('.slide-animation', function() {
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
    })

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
            ctrl.ourProducs = [{
                  Name: "product_dictionary_name",
                  Description:"product_dictionary_description",
                   Avatar:"clients/assets/img/home_dictionary.png"
                 },{
                   Name: "product_converter_name",
                   Description:"product_converter_description",
                   Avatar:"clients/assets/img/home_translate.png"
                 },{
                   Name: "product_calendar_name",
                   Description:"product_calendar_description",
                   Avatar:"clients/assets/img/home_Celendar.png"
                 }];


      };
      ctrl.init();
    }]);
