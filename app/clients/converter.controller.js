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
          self.destinationList = [
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

          self.indexSource = 0;// as IsDefause
          self.setIndexSource = function(index) {
              self.indexSource = index;
                  if(self.indexSource==self.indexDestination){
                      if(self.indexSource==0)
                      {
                        self.indexDestination= self.indexDestination+1;
                      }
                      else{
                                if(self.indexSource==1)
                                {
                                    self.indexDestination= self.indexDestination-1;
                                }
                                else {
                                    if(self.sourceList[self.indexSource].id==self.destinationList[2].id)
                                    {
                                          self.indexDestination= self.indexDestination-1;
                                    }
                                }
                      }
                  }
          };
          self.selectItemSource = function(index)//select dropdownlist
          {

              index = index+3; //fist position in list dropdownlist have position=3 in akhars ;
              var temp = self.sourceList[index];
              self.sourceList[index] = self.sourceList[2];
              self.sourceList[2] = temp;
              self.indexSource = 2;
              if(self.sourceList[self.indexSource].id==self.destinationList[2].id)
              {
                    self.indexDestination= self.indexDestination-1;
              }
          };


            self.indexDestination = 1;// as IsDefause
            self.setIndexDestination = function(index) {
                self.indexDestination = index;
                if(self.indexDestination==self.indexSource){
                    if(self.indexDestination==0)
                    {
                      self.indexSource= self.indexSource+1;
                    }
                    else{
                              if(self.indexDestination==1)
                              {
                                  self.indexSource= self.indexSource-1;
                              }
                              else {
                                  if(self.destinationList[self.indexDestination].id==self.sourceList[2].id)
                                  {
                                        self.indexSource= self.indexSource-1;
                                  }
                              }
                    }
                }
            };
            self.selectItemDestination = function(index)//select dropdownlist
            {
                index = index+3; //fist position in list dropdownlist have position=3 in akhars ;
                var temp = self.destinationList[index];
                self.destinationList[index] = self.destinationList[2];
                self.destinationList[2] = temp;
                self.indexDestination = 2;
                if(self.destinationList[self.indexDestination].id==self.sourceList[2].id)
                {
                      self.indexSource= self.indexSource-1;
                }
            };
            self.changeConvert = function(){



             var tempList = self.destinationList;
            self.destinationList=self.sourceList;
            self.sourceList = tempList;
            var temp = self.indexSource;
           self.indexSource=self.indexDestination;
           self.indexDestination = temp;
            };

    }]);
