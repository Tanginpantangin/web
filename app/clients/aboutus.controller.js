/* global angular */
'use strict';

angular.module('app')
    .controller('AboutUsController', ['$filter', function($filter) {
        var ctrl = this;
        ctrl.init = function() {
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
            }, {
                name: 'jachang_name',
                introduction: 'jachang_intro',
                avatar: 'clients/assets/img/jabraok.jpg',
                facebook: 'https://www.facebook.com/vinhlt3',
                linkedin: 'https://www.linkedin.com/in/vinh-luu-truong-935143b0'
            }];
            ctrl.projects = {
                done: {
                    status: 'done',
                    projects: ['xalih_name_aboutus']
                },
                inprogress: {
                    status: 'inprogress',
                    projects: ['Kadha_adaoh_Cam_Name_aboutus', 'video_bac_name', 'inalang_name',
                        'xakawi_name',
                    ]
                },
                notstart: {
                    status: 'notstart',
                    projects: ['karaoke_name', 'film_name', 'essay_name', 'vocabulary_name']
                }
            };
        };
        ctrl.init();
    }]);
