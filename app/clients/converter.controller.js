/* global angular */
'use strict';

angular.module('app')
    .controller('ConverterController', [function() {
        var self = this;
        self.message = 'Convert page';
        self.akhars = [
            { id: 1, name: 'Akhar BBC' },
            { id: 2, name: 'Akhar Thrah' },
            { id: 3, name: 'Rumi BBC' }
          ];
          self.selectedAkhar = { id: 1, name: 'Akhar BBC' };
          
    }]);
