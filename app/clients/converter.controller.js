/* global angular */
'use strict';

angular.module('app')
      .directive('autoheight', function() {
          return function(scope, element, attrs) {
            document.getElementById(element[0].id).addEventListener('keyup',function() {
                this.style.overflow = 'hidden';

                if(this.scrollHeight > 154)
                {
                  this.style.height =  this.scrollHeight + 'px';
                };
                if(this.scrollHeight > 600)
                {
                    this.style.overflow='auto';
                      this.style.height = "600px";
                }
                if(this.scrollHeight<154)
                {
                        this.style.overflow = 'hidden';
                    this.style.height = "154px";
                }
            }, false);

          };
      })
    .controller('ConverterController', ['$timeout', function($timeout) {
        var self = this;
        self.message = 'Convert page';
        self.akhars = [
            { id: 1, name: 'Akhar BBC' },
            { id: 2, name: 'Akhar Thrah' },
            { id: 3, name: 'Rumi BBC' }
          ];
          self.selectedAkhar = { id: 1, name: 'Akhar BBC' };

          self.change = function(){
              $timeout(function(){
                //   var xalih = new window.cam.service.TransToCamPaxalih();
                // var xalih = new window.cam.service.TransToTransPaxalih();
                // var xalih = new window.cam.service.CamToTransPaxalih();
                var xalih = new window.cam.service.FontToFontPaxalih();
                  //self.sourceText
                //   FontYapata: 0,
                //   FontGilaiPraong: 1,
                //   FontCamEFEO: 2,
                //   FontKTT: 3,
                //   FontUniCamKur: 4,
                //   FontUniCamVN: 5,
                //   TransCamEFEO: 6,
                //   TransInrasara: 7,
                //   TransKawomTT: 8
                  self.results = xalih.DoConvert(self.sourceText, Model.Enum.FontYapata, Model.Enum.FontKTT);
              },0);
          };
    }]);
