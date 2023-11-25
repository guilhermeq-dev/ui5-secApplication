sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/Formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/library",
    "sap/m/MessageToast"    
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Formatter, Filter, FilterOperator, ODataModel, MessageToast) {
    "use strict";
    
    return Controller.extend("com.lab2dev.secapplication.controller.Home", {
      formatter: Formatter,
      onInit: function () {

        const products = [
          {
            Name: "Notebook A1", 
            ProductId: 1,
            SupplierName: "Acer", 
            Price: 3499.99, 
            CurrencyCode: "BRL", 
            Status: "Available", 
            WeightMeasure: 3.8, 
            WeightUnit: "KG", 
            Width: 28, 
            Depth: 21, 
            Height: 2.5, 
            DimUnit: "cm"
          },
          {
            Name: "Notebook A2", 
            ProductId: 2,
            SupplierName: "Acer", 
            Price: 3499.99, 
            CurrencyCode: "BRL", 
            Status: "Available", 
            WeightMeasure: 3.8, 
            WeightUnit: "KG", 
            Width: 28, 
            Depth: 21, 
            Height: 2.5, 
            DimUnit: "cm"
          },
          {
            Name: "Notebook A3", 
            ProductId: 3,
            SupplierName: "Acer", 
            Price: 3499.99, 
            CurrencyCode: "BRL", 
            Status: "Available", 
            WeightMeasure: 3.8, 
            WeightUnit: "KG", 
            Width: 28, 
            Depth: 21, 
            Height: 2.5, 
            DimUnit: "cm"
          },
          {
            Name: "MacBook PRO", 
            ProductId: 4,
            SupplierName: "Apple", 
            Price: 8500.00, 
            CurrencyCode: "BRL", 
            Status: "Available", 
            WeightMeasure: 2.8, 
            WeightUnit: "KG", 
            Width: 28, 
            Depth: 21, 
            Height: 2.5, 
            DimUnit: "cm"
          },
          {
            Name: "Iphone 15 PRO", 
            ProductId: 5,
            SupplierName: "Apple", 
            Price: 10000.00, 
            CurrencyCode: "BRL", 
            Status: "Available", 
            WeightMeasure: 3.8, 
            WeightUnit: "KG", 
            Width: 28, 
            Depth: 21, 
            Height: 2.5, 
            DimUnit: "cm"
          }
        ];

        var oModel = new JSONModel(products);
        this.getView().setModel(oModel, "productsList");
      },
      onPress: function (oEvent) {
        const item = oEvent.getSource();
        const itemTitle = item.GetTittle();
        const message = `O item ${itemTitle} foi clicado!`;
        MessageToast(message, {
          title: "Informação do item",
        });
      },
      onFilterProducts: function (oEvent) {
        var aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
        }
        const oTable = this.byId("productTable");
        const oBinding = oTable.getBinding("items");
        oBinding.filter(aFilter);
        // var bFilter = [];
        // const bQuery = oEvent.getParameter("query");
        // if (bQuery) {
        //   bFilter.push(new Filter("CurrencyCode", FilterOperator.Contains, bQuery));
        // }
        // const bTable = this.byId("productTable");
        // const bBinding = bTable.getBinding("items");
        // bBinding.filter(bFilter);
      },
      onPopinLayoutChanged: function () {
        var oTable = this.byId("productTable");
        var oComboBox = this.byId("idPopinLayout");
        var sPopinLayout = oComboBox.getSelectedKey();
        switch (sPopinLayout) {
          case "Block":
            oTable.setPopinLayout(PopinLayout.Block);
            break;
          case "GridLarge":
            oTable.setPopinLayout(PopinLayout.GridLarge);
            break;
          case "GridSmall":
            oTable.setPopinLayout(PopinLayout.GridSmall);
            break;
          default:
            oTable.setPopinLayout(PopinLayout.Block);
            break;
        }
      },
      onSelect: function (oEvent) {
        var bSelected = oEvent.getParameter("selected"),
          sText = oEvent.getSource().getText(),
          oTable = this.byId("productTable"),
          aSticky = oTable.getSticky() || [];

        if (bSelected) {
          aSticky.push(sText);
        } else if (aSticky.length) {
          var iElementIndex = aSticky.indexOf(sText);
          aSticky.splice(iElementIndex, 1);
        }

        oTable.setSticky(aSticky);
      },
      onToggleInfoToolbar: function (oEvent) {
        var oTable = this.byId("productTable");
        oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
      },
      onNavTo: function() {
        this.getOwnerComponent().getRouter().navTo("ProductDetail")
      }
    });
  }
);
