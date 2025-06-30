sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.LeaveReqDetailed", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
        
            oRouter.getRoute("LeaveReqDetailed").attachPatternMatched(this._onLeaveReqMatched, this); // ✅ Will fail if function not found
        
            this.getView().setModel(new JSONModel(), "context");
            this.getView().setModel(new JSONModel({ items: [] }), "documents");
        },
        
        _onLeaveReqMatched: function (oEvent) {
            const sId = oEvent.getParameter("arguments").ID;
            if (!sId) return;
          
            const oView = this.getView();
            const sPath = "/LeaveRequest(ID=" + sId + ",IsActiveEntity=true)"; // Use quotes if string/UUID
          
            oView.bindElement({
              path: sPath,
              parameters: { expand: "files" },
              events: {
                dataReceived: function (oEvent) {
                  const oData = oEvent.getParameter("data");
                  if (oData) {
                    oView.getModel("context").setData(oData);
                    oView.getModel("documents").setData({ items: oData.files || [] });
                  }
                }
              }
            });
          },
            
        
           



        openPreview: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext("documents");
            const oDoc = oContext.getObject();

            if (!oDoc || !oDoc.content) {
                sap.m.MessageToast.show("No file content available.");
                return;
            }

            const byteCharacters = atob(oDoc.content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: oDoc.mediaType });
            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");
        },


        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1", {}, true);
        }
    });
});
