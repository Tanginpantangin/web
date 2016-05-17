/* global angular, Model */
'use strict';

angular.module('app', ['ngClipboard'])
    .controller('ConverterController', ['$timeout', '$rootScope','ngClipboard', function($timeout, $rootScope, ngClipboard) {
        var self = this;
        self.toClipboard = ngClipboard.toClipboard;
        // Data source of combobox
        self.sourceList = [{
            id: Model.Enum.FontYapata,
            name: 'AT Font Yapata',
            font: 'font-yapata'
        }, {
            id: Model.Enum.FontGilaiPraong,
            name: 'AT Font Gilai Praong',
            font: 'font-gilaipraong'
        }, {
            id: Model.Enum.FontCamEFEO,
            name: 'AT Font Cam EFEO',
            font: 'font-cham-efeo'
        }, {
            id: Model.Enum.FontKTT,
            name: 'AT Kawom Tuek Tuah',
            font: 'font-ktt'
        }, {
            id: Model.Enum.FontUniCamKur,
            name: 'AT Unicode Cam Kur',
            font: 'font-uni-camkur'
        }, {
            id: Model.Enum.FontUniCamVN,
            name: 'AT Unicode Cam VN',
            font: 'font-uni-camvn'
        }, {
            id: Model.Enum.TransCamEFEO,
            name: 'Latin tuei EFEO',
            font: "font-yuen"
        }, {
            id: Model.Enum.TransInrasara,
            name: 'Latin tuei Inrasara',
            font: "font-yuen",
            isDisabled: false
        }, {
            id: Model.Enum.TransKawomTT,
            name: 'Latin Kawom Tuek Tuah',
            font: "font-yuen"
        }];
        self.destinationList = angular.copy(self.sourceList);
        // Selected source index
        self.indexSource = Model.Enum.FontYapata;
        self.fontSource = self.sourceList[0].font;
        // Source button clicked event
        self.setIndexSource = function(index, font) {
            self.SourceId = self.sourceList[index].id; //use for disable
            self.indexSource = index;
            self.fontSource = font;
            if (self.indexSource === self.indexDestination) {
                self.indexDestination = moveActive(self.indexSource, self.indexDestination, true);
                self.fontDestination = self.destinationList[self.indexDestination].font;
            }

            // Convert data
            self.convertData();
        };

        console.log(self.sourceList);
        // Source Dropdownlist selected item changedevent
        self.selectItemSource = function(index, font) {
            self.SourceId = self.sourceList[index+3].id; //use for disable
            self.indexDestination = selectItemConvert(index, self.sourceList, self.destinationList, self.indexDestination, true);
            self.indexSource = 2;
            self.fontSource = font;
            self.fontDestination = self.destinationList[self.indexDestination].font;

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
                self.indexSource = moveActive(self.indexDestination, self.indexSource, false);
                self.fontSource = self.sourceList[self.indexSource].font;
            }
            self.fontDestination = font;
            // Convert data
            self.convertData();
        };

        // Source Dropdownlist selected item changedevent
        self.selectItemDestination = function(index, font) {
            self.indexSource = selectItemConvert(index, self.destinationList, self.sourceList, self.indexSource, false);
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
            if(self.indexSource == self.indexDestination)
            {
                if((self.sourceList[2].id==6 || self.sourceList[2].id==7)&&self.destinationList[2].id==8)
                {
                    self.indexDestination = self.indexDestination -1;
                }
            }
            // Convert data
            self.convertData();
        };

        var moveActive = function(index1, index2, isSource) {
            if (index1 === 0) {
                return index2 + 1;
            }
            if ((index1 === 1) || (self.sourceList[2].id === self.destinationList[2].id)) {
                return index2 - 1;
            }
            if((self.sourceList[2].id==6 || self.sourceList[2].id ==7) && (self.destinationList[2].id==8)){
              return index2 - 1;
            }

            return index2;
        };

        var selectItemConvert = function(index, listMain, listCondition, indexCondition, isSource) {
            // Fist position in list dropdownlist have position=3
            index = index + 3;
            listMain.swap(index, 2);
            if (listMain[2].id === listCondition[2].id && indexCondition ==2) {
                indexCondition = indexCondition - 1;
            }
            if((listMain[2].id==6 || listMain[2].id==7) && listCondition[2].id==8 && isSource==true && indexCondition ==2){
              indexCondition = indexCondition - 1;
            }
            return indexCondition;
        };

        // Source text changed event
        self.change = function() {
            self.convertData();
        };
        self.clearSource = function(){
            self.sourceText="";
            self.destinations=[];
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
        self.autoExpand = function(e) {
         var element = typeof e === 'object' ? e.target : document.getElementById(e);
         if (element.scrollHeight < 154) {
             element.style.overflow = 'hidden';
             element.style.height = '154px';
         };
         if(element.scrollHeight>154)
         {
           var scrollHeight = element.scrollHeight; // replace 60 by the sum of padding-top and padding-bottom
           element.style.height =  scrollHeight + "px";
              element.style.overflow = 'hidden';
         };
         if (element.scrollHeight > 600) {
             element.style.overflow = 'auto';
             element.style.height = '600px';
         };
     };

     function expand() {
       self.autoExpand('TextArea');
     };
    }]);
