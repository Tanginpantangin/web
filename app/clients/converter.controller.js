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
    .controller('ConverterController', [function() {
        var self = this;
        self.message = 'Convert page';
        self.akhars = [
            { id: 1, name: 'Akhar BBC' },
            { id: 2, name: 'Akhar Thrah' },
            { id: 3, name: 'Rumi BBC' }
          ];
          self.selectedAkhar = { id: 1, name: 'Akhar BBC' };

          self.change = function(){
              console.log(self.sourceText);
              var xalih = new window.cam.service.Paxalih();
              console.log('xalih', xalih);
          };
    }]);
