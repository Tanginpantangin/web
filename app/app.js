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
        'firebase'
    ])
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
            controller: 'LoginController',
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
            controller: 'MainController',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'clients/main.controller.js',
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
            controller: 'HomePageController',
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
        });
    }]);
