/* global angular */
'use strict';

angular.module('app')
    .controller('DocumentController', [function() {
        var ctrl = this;
        ctrl.documents = [{
            nameKey: 'Inalang_Aymoney_Name',
            descriptionKey: 'Inalang_Aymoney_Description',
            image: 'clients/assets/documents/DictionaryCabatonAymonierAmandine.png',
            file: 'clients/assets/documents/DictionaryCabatonAymonierAmandine.pdf',
            fileName: 'DictionaryCabatonAymonierAmandine.pdf',
            icon: 'clients/assets/img/home_dictionary.png'
        },
        {
            nameKey: 'Inalang_Mousay_Name',
            descriptionKey: 'Inalang_Mousay_Description',
            image: 'clients/assets/documents/TuDienMoussay.png',
            file: 'clients/assets/documents/TuDienMoussay.pdf',
            fileName: 'TuDienMoussay.pdf',
            icon: 'clients/assets/img/home_dictionary.png'
        },
        {
            nameKey: 'Xakawi_Cam_Name',
            descriptionKey: 'Xakawi_Cam_Description',
            image: 'clients/assets/documents/Xakawi_Thun_kra_dal_2016.png',
            file: 'clients/assets/documents/Xakawi_Thun_kra_dal_2016.pdf',
            fileName: 'Xakawi_Thun_kra_dal_2016.pdf',
            icon: 'clients/assets/img/home_Celendar.png'
        },
        {
            nameKey: 'Kadha_adaoh_Cam_Name',
            descriptionKey: 'Kadha_adaoh_Cam_Description',
            image: 'clients/assets/documents/kadha_adaoh_cam.png',
            file: 'clients/assets/documents/kadha_adaoh_cam.pdf',
            fileName: 'kadha_adaoh_cam.pdf',
            icon: 'clients/assets/img/icon_music.png'
        },
        {
            nameKey: 'Ebook_bac_Akhar_Cam_Name',
            descriptionKey: 'Ebook_bac_Akhar_Cam_Description',
            image: 'clients/assets/documents/AkharThrah7Harei.png',
            file: 'clients/assets/documents/AkharThrah7Harei.pdf',
            fileName: 'AkharThrah7Harei.pdf',
            icon: 'clients/assets/img/icon_selfStudy.png'
        }];
    }]);
