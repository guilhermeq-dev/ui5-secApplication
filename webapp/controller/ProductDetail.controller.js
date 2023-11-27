sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "../model/Formatter",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
      "sap/ui/model/odata/v2/ODataModel",
      "sap/m/library",
      "../model/models",
      "sap/m/MessageToast"
      
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Formatter, Filter, FilterOperator, ODataModel, models, MessageToast) {
      "use strict";
  
      return Controller.extend("com.lab2dev.secapplication.controller.ProductDetail", {
      
        onInit: function () {
           var bDataModel = new ODataModel('/northwind/northwind.svc/');
           this.getView().setModel(bDataModel)
        },
        onSearch: function (oEvent) {
          // add filter for search
          var aFilters = [];
          var sQuery = oEvent.getSource().getValue();
          if (sQuery && sQuery.length > 0) {
              var filter = new Filter("ProductName", FilterOperator.Contains, sQuery);
              aFilters.push(filter);
          }
          // update list binding
          var oList = this.byId("idList");
          var oBinding = oList.getBinding("items");
          oBinding.filter(aFilters, "Application");
        },
        onPress: function(oEvent) {

          const item = oEvent.getSource()

          const itemTitle = item.getTitle()

          const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
          
          const pressed = oResourceBundle.getText("pressed", [itemTitle])

          // const message = `${pressed}: ${itemTitle}!`

          MessageToast.show(pressed)
        }
      });
    });
  