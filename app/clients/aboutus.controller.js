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
            name: 'jabraok_name',
            introduction: 'jabraok_intro',
            avatar: 'clients/assets/img/jabraok.jpg',
            facebook: 'https://www.facebook.com/vinhlt3',
            linkedin: 'https://www.linkedin.com/in/vinh-luu-truong-935143b0'
        }, {
            name: 'jatri_name',
            introduction: 'jatri_intro',
            avatar: 'clients/assets/img/jatri.jpg',
            facebook: 'https://www.facebook.com/hoangtri.dong',
            linkedin: '#'
        }];

        ctrl.projects = [{
            name: 'xalih_name_aboutus',
            description: 'xalih_des_aboutus',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '0-done'
        }, {
            name: 'Kadha_adaoh_Cam_Name_aboutus',
            description: 'Kadha_adaoh_Cam_des_aboutus',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '1-inprogress'
        }, {
            name: 'video_bac_name',
            description: 'video_bac_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '1-inprogress'
        },
        {
            name: 'inalang_name',
            description: 'inalang_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '1-inprogress'
        },
        {
            name: 'xakawi_name',
            description: 'xakawi_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '1-inprogress'
        },
        {
            name: 'karaoke_name',
            description: 'karaoka_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '2-notstart'
        },
        {
            name: 'film_name',
            description: 'film_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '2-notstart'
        },
        {
            name: 'essay_name',
            description: 'essay_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '2-notstart'
        },
        {
            name: 'vocabulary_name',
            description: 'vocabulary_des',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            status: '2-notstart'
        }];

        ctrl.timeline = [{
            date: new Date('2013/05/01'),
            content: 'timeline_begin',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            icon: 'power_settings_new'
        }, {
            date: new Date('2013/07/01'),
            content: 'timeline_launch_xalih',
            img: 'clients/assets/img/timeline_sample_2.jpg',
            icon: 'swap_horiz'
        }, {
            date: new Date('2016/02/13'),
            content: 'timeline_start_web',
            img: 'clients/assets/img/timeline_sample_3.jpg',
            icon: 'web'
        }, {
            date: new Date('2016/04/13'),
            content: 'timeline_launch_web',
            img: 'clients/assets/img/timeline_sample_2.jpg',
            icon: 'cloud_done'
        }, {
            date: new Date('2016/04/14'),
            content: 'timeline_start_xakawi',
            img: 'clients/assets/img/timeline_sample_1.jpg',
            icon: 'perm_contact_calendar'
        }];

        ctrl.init = function() {
            ctrl.timeline = $filter('orderBy')(ctrl.timeline, '-date');
            ctrl.projects = $filter('orderBy')(ctrl.projects, 'status');
        };
        ctrl.init();
    }]);
