/* global angular, Model */
'use strict';

angular.module('app')
    .directive('autoheight', function() {
        return function(scope, element, attrs) {
            document.getElementById(element[0].id).addEventListener('keyup', function() {
                this.style.overflow = 'hidden';

                if (this.scrollHeight > 154) {
                    this.style.height = this.scrollHeight + 'px';
                };
                if (this.scrollHeight > 600) {
                    this.style.overflow = 'auto';
                    this.style.height = "600px";
                }
                if (this.scrollHeight < 154) {
                    this.style.overflow = 'hidden';
                    this.style.height = "154px";
                }
            }, false);

        };
    })
    .controller('ConverterController', ['$timeout', function($timeout) {
        var self = this;
        self.message = 'Convert page';
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

        self.indexSource = 0; // as IsDefause
        self.setIndexSource = function(index) {
            self.indexSource = index;
            if (self.indexSource == self.indexDestination) {
                if (self.indexSource == 0) {
                    self.indexDestination = self.indexDestination + 1;
                } else {
                    if (self.indexSource == 1) {
                        self.indexDestination = self.indexDestination - 1;
                    } else {
                        if (self.sourceList[self.indexSource].id == self.destinationList[2].id) {
                            self.indexDestination = self.indexDestination - 1;
                        }
                    }
                }
            }

            self.convertData();
        };
        self.selectItemSource = function(index) //select dropdownlist
            {

                index = index + 3; //fist position in list dropdownlist have position=3 in akhars ;
                var temp = self.sourceList[index];
                self.sourceList[index] = self.sourceList[2];
                self.sourceList[2] = temp;
                self.indexSource = 2;
                if (self.sourceList[self.indexSource].id == self.destinationList[2].id) {
                    self.indexDestination = self.indexDestination - 1;
                }

                self.convertData();
            };

        self.indexDestination = 1; // as IsDefause
        self.setIndexDestination = function(index) {
            self.indexDestination = index;
            if (self.indexDestination == self.indexSource) {
                if (self.indexDestination == 0) {
                    self.indexSource = self.indexSource + 1;
                } else {
                    if (self.indexDestination == 1) {
                        self.indexSource = self.indexSource - 1;
                    } else {
                        if (self.destinationList[self.indexDestination].id == self.sourceList[2].id) {
                            self.indexSource = self.indexSource - 1;
                        }
                    }
                }
            }

            self.convertData();
        };
        //select dropdownlist
        self.selectItemDestination = function(index) {
            index = index + 3; //fist position in list dropdownlist have position=3 in akhars ;
            var temp = self.destinationList[index];
            self.destinationList[index] = self.destinationList[2];
            self.destinationList[2] = temp;
            self.indexDestination = 2;
            if (self.destinationList[self.indexDestination].id == self.sourceList[2].id) {
                self.indexSource = self.indexSource - 1;
            }

            self.convertData();
        };

        self.changeConvert = function() {

            var tempList = self.destinationList;
            self.destinationList = self.sourceList;
            self.sourceList = tempList;
            var temp = self.indexSource;
            self.indexSource = self.indexDestination;
            self.indexDestination = temp;

            self.convertData();
        };

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
