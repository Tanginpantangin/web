/* global angular */
'use strict';

angular.module('app')
    .controller('AboutUsController', ['$filter', function($filter) {
        var ctrl = this;

        ctrl.members = [{
            name: 'jayam_name',
            introduction: 'jayam_intro',
            avatar: 'clients/assets/img/jayam.jpg',
            facebook: 'https://www.facebook.com/jayampadra',
            linkedin: '#'
        }, {
            name: 'jatri_name',
            introduction: 'jatri_intro',
            avatar: 'clients/assets/img/jatri.jpg',
            facebook: 'https://www.facebook.com/hoangtri.dong',
            linkedin: '#'
        }, {
            name: 'jabraok_name',
            introduction: 'jabraok_intro',
            avatar: 'clients/assets/img/jabraok.jpg',
            facebook: 'https://www.facebook.com/vinhlt3',
            linkedin: 'https://www.linkedin.com/in/vinh-luu-truong-935143b0'
        }];

        ctrl.projects = [{
            name: 'xalih_name_aboutus',
            status: 'done'
        }, {
            name: 'Kadha_adaoh_Cam_Name_aboutus',
            status: 'inprogress'
        }, {
            name: 'video_bac_name',
            status: 'inprogress'
        }, {
            name: 'inalang_name',
            status: 'inprogress'
        }, {
            name: 'xakawi_name',
            status: 'inprogress'
        }, {
            name: 'karaoke_name',
            status: 'notstart'
        }, {
            name: 'film_name',
            status: 'notstart'
        }, {
            name: 'essay_name',
            status: 'notstart'
        }, {
            name: 'vocabulary_name',
            status: 'notstart'
        }];

        ctrl.init = function() {
            ctrl.timeline = $filter('orderBy')(ctrl.timeline, '-date');
            ctrl.projects = $filter('orderBy')(ctrl.projects, 'status');
        };
        ctrl.init();
    }]);
