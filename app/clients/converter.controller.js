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
            name: 'AT Font Yapata',
            font: 'akt1',
            isDisabled: false
        }, {
            id: Model.Enum.FontGilaiPraong,
            name: 'AT Font Gilai Praong',
            font: 'champa_2',
            isDisabled: false
        }, {
            id: Model.Enum.FontCamEFEO,
            name: 'AT Font Cam EFEO',
            font: 'cam-efeo',
            isDisabled: false
        }, {
            id: Model.Enum.FontKTT,
            name: 'AT Kawom Tuek Tuah',
            font: 'blue1',
            isDisabled: false
        }, {
            id: Model.Enum.FontUniCamKur,
            name: 'AT Unicode Cam kar',
            font: 'cjmkh',
            isDisabled: false
        }, {
            id: Model.Enum.FontUniCamVN,
            name: 'AT Unicode Cam VN',
            font: 'cham_roman',
            isDisabled: false
        }, {
            id: Model.Enum.TransCamEFEO,
            name: 'Latin tuei EFEO',
            font: "",
            isDisabled: false
        }, {
            id: Model.Enum.TransInrasara,
            name: 'Latin tuei Inrasara',
            font: "",
            isDisabled: false
        }, {
            id: Model.Enum.TransKawomTT,
            name: 'Latin Kawom Tuek Tuah',
            font: "",
            isDisabled: false
        }];
        self.destinationList = angular.copy(self.sourceList);

        // Selected source index
        self.indexSource = Model.Enum.FontYapata;
        self.fontSource = self.sourceList[0].font;
        // Source button clicked event
        self.setIndexSource = function(index, font) {
            self.indexSource = index;
            self.fontSource = font;
            if (self.indexSource === self.indexDestination) {
                self.indexDestination = moveActive(self.indexSource, self.indexDestination);
                self.fontDestination = self.destinationList[self.indexDestination].font;
            }
                     
            // Convert data
            self.convertData();
        };

        // Source Dropdownlist selected item changedevent
        self.selectItemSource = function(index, font) {
            self.indexDestination = selectItemConvert(index, self.sourceList, self.destinationList, self.indexDestination);
            self.indexSource = 2;
            self.fontSource = font;
            self.fontDestination = self.destinationList[self.indexDestination].font;
            self.destinationList[6].isDisabled = false;
            self.destinationList[7].isDisabled = false;
            if(index==5)
            {
              self.destinationList[6].isDisabled = true;
              self.destinationList[7].isDisabled = true;
            }

            // Convert data
            self.convertData();
        };

        // Selected destination index
        self.indexDestination = Model.Enum.FontGilaiPraong;
        self.fontDestination = self.destinationList[1].font;
        // Destination button clicked event
        self.setIndexDestination = function(index,font) {
            self.indexDestination = index;
            if (self.indexDestination === self.indexSource) {
                self.indexSource = moveActive(self.indexDestination, self.indexSource);
                self.fontSource = self.sourceList[self.indexSource].font;
            }
            self.fontDestination = font;
            // Convert data
            self.convertData();
        };

        // Source Dropdownlist selected item changedevent
        self.selectItemDestination = function(index, font) {
            self.indexSource = selectItemConvert(index, self.destinationList, self.sourceList, self.indexSource);
            self.indexDestination = 2;
            self.fontDestination = font;
            self.fontSource = self.sourceList[self.indexSource].font;
            // Convert data
            self.convertData();
        };

        self.changeConvert = function() {
            var tempfont = self.fontDestination;
            self.fontDestination = self.fontSource;
            self.fontSource = tempfont;

            var tempList = self.destinationList;
            self.destinationList = self.sourceList;
            self.sourceList = tempList;

            var temp = self.indexSource;
            self.indexSource = self.indexDestination;
            self.indexDestination = temp;

            // Convert data
            self.convertData();
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
        self.changeFont = function(){

        };

        // Check convert type is font
        self.isFont = function(dataType) {
            return Number(dataType) <= Model.Enum.FontUniCamVN;
        };
    }]);
