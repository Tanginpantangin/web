/* global angular */
'use strict';

angular.module('app')
    .directive('tFooter', ['$rootScope', '$filter', '$translate',
        function($rootScope, $filter, $translate) {
            return {
                templateUrl: 'clients/directives/footer.html',
                restrict: 'E',
                replace: true,
                link: function($scope) {

                    $scope.languages = [{
                        value: 'en',
                        text: 'English'
                    }, {
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
