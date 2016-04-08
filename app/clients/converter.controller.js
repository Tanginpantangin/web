/* global angular, Model */
'use strict';

angular.module('app')
    .directive('autoheight', function() {
        return function(scope, element) {
            document.getElementById(element[0].id).addEventListener('keyup', function() {
                this.style.overflow = 'hidden';
                if (this.scrollHeight > 154) {
                    this.style.height = this.scrollHeight + 'px';
                }
                if (this.scrollHeight > 600) {
                    this.style.overflow = 'auto';
                    this.style.height = '600px';
                }
                if (this.scrollHeight < 154) {
                    this.style.overflow = 'hidden';
                    this.style.height = '154px';
                }
            }, false);

        };
    })
    .controller('ConverterController', ['$timeout', function($timeout) {
        var self = this;

        // Data source of combobox
        self.sourceList = [{
            id: Model.Enum.FontYapata,
            name: 'AT Font Yapata'
        }, {
            id: Model.Enum.FontGilaiPraong,
            name: 'AT Font Gilai Praong'
        }, {
            id: Model.Enum.FontCamEFEO,
            name: 'AT Font Cam EFEO'
        }, {
            id: Model.Enum.FontKTT,
            name: 'AT Kawom Tuek Tuah'
        }, {
            id: Model.Enum.FontUniCamKur,
            name: 'AT Unicode Cam kar'
        }, {
            id: Model.Enum.FontUniCamVN,
            name: 'TA Unicode Cam VN'
        }, {
            id: Model.Enum.TransCamEFEO,
            name: 'Latin tuei EFEO'
        }, {
            id: Model.Enum.TransInrasara,
            name: 'Latin tuei Inrasara'
        }, {
            id: Model.Enum.TransKawomTT,
            name: 'Latin Kawom Tuek Tuah'
        }];
        self.destinationList = angular.copy(self.sourceList);

        // Selected source index
        self.indexSource = Model.Enum.FontYapata;

        // Source button clicked event
        self.setIndexSource = function(index) {
            self.indexSource = index;
            if (self.indexSource === self.indexDestination) {
                self.indexDestination = moveActive(self.indexSource, self.indexDestination);
            }

            // Convert data
            self.convertData();
        };

        // Source Dropdownlist selected item changedevent
        self.selectItemSource = function(index) {
            self.indexDestination = selectItemConvert(index, self.sourceList, self.destinationList, self.indexDestination);
            self.indexSource = 2;

            // Convert data
            self.convertData();
        };

        // Selected destination index
        self.indexDestination = Model.Enum.FontGilaiPraong;

        // Destination button clicked event
        self.setIndexDestination = function(index) {
            self.indexDestination = index;
            if (self.indexDestination === self.indexSource) {
                self.indexSource = moveActive(self.indexDestination, self.indexSource);
            }

            // Convert data
            self.convertData();
        };

        // Source Dropdownlist selected item changedevent
        self.selectItemDestination = function(index) {
            self.indexSource = selectItemConvert(index, self.destinationList, self.sourceList, self.indexSource);
            self.indexDestination = 2;

            // Convert data
            self.convertData();
        };

        self.changeConvert = function() {
            var tempList = self.destinationList;
            self.destinationList = self.sourceList;
            self.sourceList = tempList;
            var temp = self.indexSource;
            self.indexSource = self.indexDestination;
            self.indexDestination = temp;
        };

        var moveActive = function(index1, index2) {
            if (index1 === 0) {
                return index2 + 1;
            }
            if ((index1 === 1) || (self.sourceList[2].id === self.destinationList[2].id)) {
                return index2 - 1;
            }
            return index2;
        };

        var selectItemConvert = function(index, listMain, listCondition, indexCondition) {
            // Fist position in list dropdownlist have position=3
            index = index + 3;
            listMain.swap(index, 2);
            if (listMain[2].id === listCondition[2].id) {
                indexCondition = indexCondition - 1;
            }
            return indexCondition;
        };

        // Source text changed event
        self.change = function() {
            self.convertData();
        };

        // Convert data
        self.convertData = function() {
            $timeout(function() {
                var result = '';
                var sourceType = self.sourceList[self.indexSource].id;
                var destinationType = self.destinationList[self.indexDestination].id;
                var data = self.sourceText;
                switch (sourceType) {
                    case Model.Enum.FontGilaiPraong:
                    case Model.Enum.FontYapata:
                    case Model.Enum.FontCamEFEO:
                    case Model.Enum.FontUniCamKur:
                    case Model.Enum.FontUniCamVN:
                    case Model.Enum.FontKTT:
                        if (self.isFont(destinationType)) {
                            var fontPaxalih = new window.cam.service.FontToFontPaxalih();
                            result = fontPaxalih.DoConvert(data, sourceType, destinationType);
                        } else {
                            var rumiPaxalih = new window.cam.service.CamToTransPaxalih();
                            result = rumiPaxalih.DoConvert(data, sourceType, destinationType);
                        }
                        break;

                    default:
                        if (self.isFont(destinationType)) {
                            var camPaxalih = new window.cam.service.TransToCamPaxalih();
                            result = camPaxalih.DoConvert(data, sourceType, destinationType);
                        } else {
                            var transPaxalih = new window.cam.service.TransToTransPaxalih();
                            result = transPaxalih.DoConvert(data, sourceType, destinationType);
                        }
                        break;
                }
                self.destinations = result;
            }, 0);
        };

        // Check convert type is font
        self.isFont = function(dataType) {
            return Number(dataType) <= Model.Enum.FontUniCamVN;
        };
    }]);
