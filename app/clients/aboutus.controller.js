/* global angular */
'use strict';

angular.module('app')
    .controller('AboutUsController', [function() {
        var self = this;
        self.members = [{
            name: 'jayam_name',
            introduction: 'jayam_intro',
            avatar: 'clients/assets/img/jayam.jpg',
            facebook: 'https://www.facebook.com/jayampadra',
            linkedin: '#'
        },
        {
            name: 'jabraok_name',
            introduction: 'jabraok_intro',
            avatar: 'clients/assets/img/jabraok.jpg',
            facebook: 'https://www.facebook.com/vinhlt3',
            linkedin: 'https://www.linkedin.com/in/vinh-luu-truong-935143b0'
        },
        {
            name: 'jatri_name',
            introduction: 'jatri_intro',
            avatar: 'clients/assets/img/jatri.jpg',
            facebook: 'https://www.facebook.com/hoangtri.dong',
            linkedin: '#'
        }];
    }]);
