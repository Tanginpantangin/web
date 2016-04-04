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
        self.sourceList = [
            { id: 1, name: 'AT Font Yapata'},
            { id: 2, name: 'AT Font Gilai Praong'},
            { id: 3, name: 'AT Font Cam EFEO'},
            { id: 4, name: 'AT Kawom Tuek Tuah'},
            { id: 5, name: 'AT Unicode Cam kar'},
            { id: 6, name: 'TA Unicode Cam VN'},
            { id: 7, name: 'Latin tuei EFEO'},
            { id: 8, name: 'Latin tuei Inrasara'},
            { id: 9, name: 'Latin Kawom Tuek Tuah'}
          ];
          self.destinationList =  angular.copy(self.sourceList);
          //This is Source
          self.indexSource = 0;// as IsDefause
          self.setIndexSource = function(index) {// event click button
                  self.indexSource = index;
                  if(self.indexSource==self.indexDestination){
                      self.indexDestination = moveActive(self.indexSource,self.indexDestination);
                  }
          };
          self.selectItemSource = function(index)//select dropdownlist
          {
              self.indexDestination=selectItemConvert(index,self.sourceList,self.destinationList,self.indexDestination);
              self.indexSource = 2;
          };
          // this is Destination
            self.indexDestination = 1;// as IsDefause
            self.setIndexDestination = function(index) {// event click button
                self.indexDestination = index;
                if(self.indexDestination==self.indexSource){
                    self.indexSource = moveActive(self.indexDestination,self.indexSource);
                }
            };
            self.selectItemDestination = function(index)//select dropdownlist
            {
              self.indexSource=selectItemConvert(index,self.destinationList,self.sourceList,self.indexSource);
              self.indexDestination = 2;
            };
            self.changeConvert = function(){
              var tempList = self.destinationList;
              self.destinationList = self.sourceList;
              self.sourceList = tempList;
              var temp = self.indexSource;
              self.indexSource=self.indexDestination;
              self.indexDestination = temp;
            };
            Array.prototype.swap = function(a, b){
              var temp = this[a];
              this[a] = this[b];
              this[b] = temp;
            };
            var moveActive = function(index1, index2){
              if(index1==0)
              {
                return index2+1;
              }
              if((index1==1)||(self.sourceList[2].id==self.destinationList[2].id))
              {
                return index2-1;
              }
              return index2;
            };
            var selectItemConvert = function(index,listMain,listCondition,indexCondition, isIndexSource){
              index = index+3;//fist position in list dropdownlist have position=3
              listMain.swap(index,2);
              if(listMain[2].id==listCondition[2].id)
              {
                    indexCondition= indexCondition-1;
              }
              return indexCondition;
            };

    }]);
