sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("project1.controller.Login", {
        onLogin: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            const sUser = this.byId("usernameInput").getValue();
            const sPass = this.byId("passwordInput").getValue();

            if (sUser === "admin" && sPass === "admin") {
                MessageToast.show("Login successful");

                // Set shared model on Component
                const oUserModel = new sap.ui.model.json.JSONModel({
                    employeeName: sUser
                });

                this.getOwnerComponent().setModel(oUserModel, "userModel");

                oRouter.navTo("View1"); // name as per your manifest
            } else {
                MessageToast.show("Invalid credentials");
            }
        }
    });
});
