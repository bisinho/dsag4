// eslint-disable-next-line no-undef
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/IconColor",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    'sap/m/library',
], function (Controller, IconColor, MessageToast, JSONModel, mobileLibrary) {
    "use strict";

    var URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("corona.Corona.controller.Home", {
        onInit: function () {
            var currentDate = new Date();
            var oViewModel = new JSONModel({
                busy: false,
                delay: 0,
                date: currentDate
            });

            this.getView().setModel(oViewModel, "viewModel");
            var oModelNames = [
                { name: "countriesData" },
                { name: "totalData" },
                { name: "coronaNews" },
                { name: "continentData" }
            ];

            oModelNames.map(model => this._getCovidModel(model.name));

        },
        _getCovidModel: function (sName) {
            var that = this;
            var sUrl = "https://api.collectapi.com/corona/" + sName;
            var oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty("/busy", true);
            // @ts-ignore
            var reqMessage = $.ajax({
                url: sUrl,
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("content-type", "application/json");
                    xhr.setRequestHeader("authorization", "apikey 3LKqpjC3RdOPN0kcwLNbCR:4AlSvCNsY4jSHLcmFE8EpU");
                },
                async: true,
                success: function (data) {
                    that._loadData(sName, data.result);
                },
                error: function (request, status, error) { }
            });
        },
        _loadData: function (name, data) {
            var oViewModel = this.getView().getModel("viewModel");
            var oModel = new JSONModel(data);
            oModel.setSizeLimit(20);
            this.getOwnerComponent().setModel(oModel, name);

            if (name === "continentData") {
                oViewModel.setProperty("/busy", false);
                MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgDataLoaded"), { closeOnBrowserNavigation: false });
            }
        },
        navToNewspaper: function (oEvent) {
            var oSelectedItem = oEvent.getSource().getBindingContext("coronaNews").getObject();
            var sUrl = oSelectedItem.url;

            URLHelper.redirect(sUrl, true);
        },
        navToDetailPage: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("countriesData").sPath;
            this.getOwnerComponent().getRouter().navTo("RouteDetail", { path: sPath.substring(1) });
        },
        formatIconFlag: function (sCountryName) {
            var str = "https://lipis.github.io/flag-icon-css/flags/1x1/";

            switch (sCountryName) {
                case "Turkey":
                    str = str + "tr.svg";
                    break;
                case "UK":
                    str = str + "gb.svg";
                    break;
                case "USA":
                    str = str + "us.svg";
                    break;
                case "India":
                    str = str + "in.svg";
                    break;
                case "Brazil":
                    str = str + "br.svg";
                    break;
                case "Spain":
                    str = str + "es.svg";
                    break;
                case "Germany":
                    str = str + "de.svg";
                    break;
                case "Colombia":
                    str = str + "co.svg";
                    break;
                case "France":
                    str = str + "fr.svg";
                    break;
                case "Italy":
                    str = str + "it.svg";
                    break;
                case "Argentina":
                    str = str + "ar.svg";
                    break;
                case "Mexico":
                    str = str + "mx.svg";
                    break;
                case "Poland":
                    str = str + "pl.svg";
                    break;
                case "Russia":
                    str = str + "ru.svg";
                    break;
                case "Iran":
                    str = str + "ir.svg";
                    break;
                case "South Africa":
                    str = str + "za.svg";
                    break;
                case "Ukraine":
                    str = str + "ua.svg";
                    break;
                case "Peru":
                    str = str + "pe.svg";
                    break;
                case "Netherlands":
                    str = str + "nl.svg";
                    break;
                case "Czechia":
                    str = str + "cz.svg";
                    break;
                default:
                    break;
            }

            return str;
        }
    });
});