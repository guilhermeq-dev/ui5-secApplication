sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "../model/Formatter",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
      "sap/ui/model/odata/v2/ODataModel",
      "sap/m/library",
      "sap/m/MessageToast",
      
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Formatter, Filter, FilterOperator, ODataModel, MessageToast) {
      "use strict";
  
      return Controller.extend("com.lab2dev.secapplication.controller.ProductDetail", {
      
        onInit: function () {
          console.log("OI")
        },
      });
    });
  