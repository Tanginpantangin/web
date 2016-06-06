/* global angular */
'use strict';

angular.module('app')
    .directive('tHeader', ['$location', '$rootScope', '$filter', '$translate',
        function($location, $rootScope, $filter, $translate) {
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

                    $scope.languages = [{
                        /*value: 'en',
                        text: 'English'
                    }, {*/
                        value: 'akt',
                        text: 'Akhar Thrah'
                    }, {
                        value: 'rm',
                        text: 'Rumi'
                    }, {
                        value: 'vi',
                        text: 'Vietnamese'
                    }];

                    $scope.currentLanguge = $filter('filter')($scope.languages, {
                        value: $rootScope.lang
                    })[0];

                    $scope.changeLanguage = function(langKey) {
                        $translate.use(langKey);

                        // Reset current language value
                        $rootScope.lang = langKey;

                        $scope.currentLanguge = $filter('filter')($scope.languages, {
                            value: $rootScope.lang
                        })[0];
                    };
                }
            };
        }
    ]);
