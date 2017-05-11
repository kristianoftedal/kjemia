﻿// Write your Javascript code.
function postOrder(data) {
    $.ajax({
        type: 'POST',
        url: '/api/Order',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: ko.toJSON(data),
        success: function (response) {
            return true;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function KompendiumModel() {
    var self = this;
    self.product = "Kompendium";
    self.name = ko.observable();
    self.phone = ko.observable();
    self.address = ko.observable();
    self.postnummer = ko.observable();
    self.poststed = ko.observable();
    self.highSchool = ko.observable();
    self.showError = ko.computed(function () {
        if (self.highSchool() != undefined && self.highSchool()) {
            return self.highSchool().toLowerCase().indexOf("akademiet") !== -1;
        }
    });
    self.validate = function () {
        if (self.name() == undefined || self.name() == '') {
            self.nameError(true);
            return false;
        }
        if (self.phone() == undefined || self.phone() == '') {
            self.phoneError(true);
            return false;
        }
        if (self.address() == undefined || self.address() == '') {
            self.addressError(true);
            return false;
        }
        if (self.postnummer() == undefined || self.postnummer() == '') {
            self.postnummerError(true);
            return false;
        }
        if (self.poststed() == undefined || self.poststed() == '') {
            self.poststedError(true);
            return false;
        }
        if (self.highSchool() == undefined || self.highSchool() == '') {
            self.highSchoolError(true);
            return false;
        }
        return true;
    };
    self.sendOrder = function (self) {
        postOrder(self);
    }
}

//function WorkshopModel() {
//    var self = this;
//    self.product = "Workshop";
//    self.name = ko.observable();
//    self.address = ko.observable();
//    self.email = ko.observable();
//    self.highSchool = ko.observable();
//    self.showError = ko.computed(function () {
//        if (self.highSchool() != undefined && self.highSchool()) {
//            return self.highSchool().toLowerCase().indexOf("akademiet") !== -1 || self.highSchool().toLowerCase().indexOf("sonans") !== -1
//        }
//    });
//    self.sendOrder = function (self) {
//        postOrder(self);
//    }
//}

function ExamModel() {
    var self = this;
    self.product = "Generalprøve, eksamen";
    self.name = ko.observable();
    self.email = ko.observable();
    self.phone = ko.observable();
    self.highSchool = ko.observable();
    self.showError = ko.computed(function () {
        if (self.highSchool() != undefined && self.highSchool() != '') {
            return self.highSchool().toLowerCase().indexOf("akademiet") !== -1;
        }
    });
    self.sendOrder = function (self) {
        postOrder(self);
    }
}

function HoursModel() {
    var self = this;
    self.product = "Privatundersvisning";
    self.name = ko.observable();
    self.address = ko.observable();
    self.email = ko.observable();
    self.highSchool = ko.observable();
    self.showError = ko.computed(function () {
        if (self.highSchool() != undefined && self.highSchool() != '') {
            return self.highSchool().toLowerCase().indexOf("akademiet") !== -1;
        }
    });
    self.isSuccess = ko.observable(false);
    self.phone = ko.observable();
    self.sendOrder = function (self) {
        postOrder(self);
    }
}

var kompendiumModel = new KompendiumModel();
ko.applyBindings(kompendiumModel, document.getElementById("kompendiumModal1"));
ko.applyBindings(kompendiumModel, document.getElementById("kompendiumModal2"));

//var workshopModel = new WorkshopModel();
//ko.applyBindings(workshopModel, document.getElementById("workshopModal"));

var examModel = new ExamModel();
ko.applyBindings(examModel, document.getElementById("eksamenModal"));

var hoursModel = new HoursModel();
ko.applyBindings(hoursModel, document.getElementById("privatundervisningModal"));

$(document).ready(function () {
    $('#compendiumButton1').on('click', function (e) {
        if (kompendiumModel.highSchool().toLowerCase().indexOf("akademiet") !== -1) {
            e.preventDefault();
            kompendiumModel.name("elev fra en ulovlig skole")
            postOrder(kompendiumModel);
            kompendiumModel.showError(true);
            return false;
        }
        else {
            kompendiumModel.product += " 1";
            postOrder(kompendiumModel);
        }
    });
    $('#compendiumButton2').on('click', function (e) {
        if (kompendiumModel.highSchool().toLowerCase().indexOf("akademiet") !== -1) {
            e.preventDefault();
            kompendiumModel.name("elev fra en ulovlig skole")
            postOrder(kompendiumModel);
            kompendiumModel.showError(true);
            return false;
        }
        else {
            kompendiumModel.product += " 2";
            postOrder(kompendiumModel);
        }
    });
    $('#workshopCompendiumButton').on('click', function (e) {
        if (workshopModel.highSchool().toLowerCase().indexOf("akademiet") !== -1) {
            e.preventDefault();
            workshopModel.name("elev fra en ulovlig skole")
            postOrder(workshopModel);
            workshopModel.showError(true);
            return false;
        }
        workshopModel.product = "Workshop & kompendium";
        postOrder(workshopModel);
    });
    $('#workshopButton').on('click', function (e) {
        if (workshopModel.highSchool().toLowerCase().indexOf("akademiet") !== -1) {
            e.preventDefault();
            workshopModel.name("elev fra en ulovlig skole")
            postOrder(workshopModel);
            workshopModel.showError(true);
            return false;
        }
        workshopModel.product = "Workshop";
        postOrder(workshopModel);
    });
    $('#examButton').on('click', function (e) {
        if (examModel.highSchool().toLowerCase().indexOf("akademiet") !== -1) {
            e.preventDefault();
            examModel.name("elev fra en ulovlig skole")
            postOrder(examModel);
            examModel.showError(true);
            return false;
        }
        postOrder(examModel);
    });
    $('#hoursButton').on('click', function (e) {
        hoursModel.isSuccess(true);
        postOrder(hoursModel);
    });

    $('#closeHours').on('click', function (e) {
        $('#privatundervisningModal').modal('hide');
        hoursModel = new HoursModel();
    });
});

