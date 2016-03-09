/* global angular */
'use strict';
angular
    .module('app', [
        'oc.lazyLoad',
        'ui.router',
        'ngRoute',
        'ngMaterial',
        'ngMessages',
        'ngSanitize',
        'firebase',
        'pascalprecht.translate'
    ])
    .config(['$mdThemingProvider', '$translateProvider', function($mdThemingProvider, $translateProvider) {

        // Configure theme
        $mdThemingProvider.theme('default').primaryPalette('deep-orange');

        // Configure supported multiple languages
        $translateProvider
            .useStaticFilesLoader({
                prefix: '/translations/',
                suffix: '.json'
            })
            .preferredLanguage('akt');
    }])
    .run(['$rootScope', function($rootScope) {
        $rootScope.lang = 'akt';
    }])
    .config(['$stateProvider', '$ocLazyLoadProvider', '$urlRouterProvider', function($stateProvider, $ocLazyLoadProvider, $urlRouterProvider) {

        // Configure lazy load
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        // Configure home page
        $urlRouterProvider.when('', '/');

        // Login page
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'login/login.controller.js',
                        ]
                    });
                }
            }
        })

        // Client - main
        .state('main', {
            templateUrl: 'clients/main.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'clients/main.controller.js',
                            'clients/directives/header.js',
                            'clients/directives/footer.js',
                            'clients/assets/css/site.css',
                        ]
                    });
                }
            }
        })

        // Home page
        .state('main.home', {
            url: '/',
            templateUrl: 'clients/homepage.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'clients/homepage.controller.js',
                        ]
                    });
                }
            }
        })

        // Converter page
        .state('main.converter', {
            url: '/converter',
            templateUrl: 'clients/converter.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'clients/converter.controller.js',
                        ]
                    });
                }
            }
        })

        // Document page
        .state('main.document', {
            url: '/document',
            templateUrl: 'clients/document.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'clients/document.controller.js',
                        ]
                    });
                }
            }
        })

        // Converter page
        .state('main.aboutus', {
            url: '/aboutus',
            templateUrl: 'clients/aboutus.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'clients/aboutus.controller.js',
                        ]
                    });
                }
            }
        });
    }]);
