/* global angular */
'use strict';

angular.module('app')
    .directive('tHeader', ['$location',
        function($location) {
            return {
                templateUrl: 'clients/directives/header.html',
                restrict: 'E',
                replace: true,
                link: function($scope) {
                    $scope.showSmallMenu = false;
                    $scope.menus = [{
                        href: '/',
                        name: 'Home'
                    }, {
                        href: '/converter',
                        name: 'Converter'
                    }, {
                        href: '/document',
                        name: 'Documents'
                    }, {
                        href: '/aboutus',
                        name: 'About Us'
                    }];

                    $scope.redirectPage = function(url) {
                        $location.path(url);
                    };

                    $scope.getActiveClass = function(page) {
                        return page.href == $location.path() ? 'active' : '';
                    };
                }
            };
        }
    ]);
