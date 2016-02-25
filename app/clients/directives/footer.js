/* global angular */
'use strict';

angular.module('app')
    .directive('tFooter', [
        function() {
            return {
                templateUrl: 'clients/directives/footer.html',
                restrict: 'E',
                replace: true,
                link: function($scope) {
                    $scope.message = 'this is footer';
                }
            };
        }
    ]);
