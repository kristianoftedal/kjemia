﻿// Write your Javascript code.
function postOrder(data) {
    debugger;
    console.log("data: " + data);
    $.ajax({
        type: 'POST',
        url: '/api/Order',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: ko.toJSON(data),
        success: function (response) {
            return true;
        }
    });
}


function KompendiumModel() {
    var self = this;
    self.name = ko.observable();
    self.address = ko.observable();
    self.highSchool = ko.observable();
    self.sendOrder = function (self) {
        postOrder(self);
    }
}

function WorkshopModel() {
    var self = this;
    self.name = ko.observable();
    self.address = ko.observable();
    self.email = ko.observable();
    self.highSchool = ko.observable();
    self.withCompendium = ko.observable(false);
    self.sendOrder = function (self) {
        postOrder(self);
    }
}

function ExamModel() {
    var self = this;
    self.name = ko.observable();
    self.email = ko.observable();
    self.phone = ko.observable();
    self.sendOrder = function (self) {
        postOrder(self);
    }
}

function HoursModel() {
    var self = this;
    self.name = ko.observable();
    self.address = ko.observable();
    self.email = ko.observable();
    self.highSchool = ko.observable();
    self.phone = ko.observable();
    self.topics = ko.observableArray();
    self.hours = ko.observable();
    self.kjemi = ko.observable("kjemi2");
    self.sendOrder = function (self) {
        postOrder(self);
    }
}


var kompendiumModel = new KompendiumModel();
ko.applyBindings(kompendiumModel, document.getElementById("kompendiumModal"));

var workshopModel = new WorkshopModel();
ko.applyBindings(workshopModel, document.getElementById("workshopModal"));

var examModel = new ExamModel();
ko.applyBindings(examModel, document.getElementById("eksamenModal"));

var hoursModel = new HoursModel();
ko.applyBindings(hoursModel, document.getElementById("privatundervisningModal"));


$(document).ready(function () {

    $('#compendiumButton').on('click', function (e) {
        postOrder(kompendiumModel);
    });
    $('#workshopCompendiumButton').on('click', function (e) {
        workshopModel.withCompendium(true);
        postOrder(workshopModel);
    });
    $('#workshopButton').on('click', function (e) {
        postOrder(workshopModel);
    });
    $('#examButton').on('click', function (e) {
        postOrder(examModel);
    });
    $('#hoursButton').on('click', function (e) {
        postOrder(hoursModel);
    });

});