sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/strings/formatMessage"
], function (Controller,formatMessage) {
    "use strict";

    return Controller.extend("corona.Corona.controller.Detail", {
        formatMessage: formatMessage,

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteDetail").attachMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + oEvent.getParameter("arguments").path,
                model: "countriesData"
            });
        },
        navToHome: function () {
            this.getOwnerComponent().getRouter().navTo("RouteHome");
        }
    });
});