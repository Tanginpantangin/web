/* global angular, google */
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

        var drawChart = function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Manager');
            data.addColumn('string', 'ToolTip');

            var dataTable = [];

            // Root node
            var name = '<span translate>' + $filter('translate')('our_project') + '</span>';
            dataTable.push([{
                v: 'root',
                f: name
            }, '', name]);

            // Launched node
            name = '<span translate>' + $filter('translate')('done') + '</span>';
            dataTable.push([{
                v: 'done',
                f: name
            }, 'root', name]);

            // In progress node
            name = '<span translate>' + $filter('translate')('inprogress') + '</span>';
            dataTable.push([{
                v: 'inprogress',
                f: name
            }, 'root', name]);

            // Not started node
            name = '<span translate>' + $filter('translate')('notstart') + '</span>';
            dataTable.push([{
                v: 'notstart',
                f: name
            }, 'root', name]);

            ctrl.projects.forEach(function(item) {
                name = '<span translate>' + $filter('translate')(item.name) + '</span>';
                dataTable.push([name, item.status, name]);
            });

            data.addRows(dataTable);

            // Create the chart.
            var chart = new google.visualization.OrgChart(document.getElementById('projects-chart'));
            // Draw the chart, setting the allowHtml option to true for the tooltips.
            chart.draw(data, {
                allowHtml: true
            });
        };

        ctrl.init = function() {
            ctrl.timeline = $filter('orderBy')(ctrl.timeline, '-date');
            ctrl.projects = $filter('orderBy')(ctrl.projects, 'status');
            google.charts.setOnLoadCallback(drawChart);
        };
        ctrl.init();
    }]);
