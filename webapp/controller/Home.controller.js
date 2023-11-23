sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "./Formatter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    'sap/m/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Formatter, Filter, FilterOperator, mobileLibrary) {
        "use strict";

        return Controller.extend("com.lab2dev.secapplication.controller.Home", {       

            onInit: function () {

                 const products = [
                     {
                         product: "Notebook",
                         productId: 1,
                         supplierName: "acer", 
                         width: 32, 
                         depth: 1.5, 
                         height: 20, 
                         dimUnit: "cm",
                         weight: 5, 
                         weightUnit: "KG",
                         price: 1999.00,
                         currencyCode: "USD"
                     },
                     {
                        product: "Monitor",
                        productId: 2,
                        supplierName: "AOC", 
                        width: 45, 
                        depth: 2, 
                        height: 30, 
                        dimUnit: "cm",
                        weight: 3, 
                        weightUnit: "KG",
                        price: 899.00,
                        currencyCode: "USD"
                    }
                ]

                 var oModel = new JSONModel(products)
                 this.getView().setModel(oModel, "productsList")
            },
            onPress: function(oEvent) {
                const item = oEvent.getSource()
                const itemTitle = item.GetTittle()
                const message = `O item ${itemTitle} foi clicado!`
                MessageToast(message, {
                    title: "Informação do item"
                })
            },
            onFilterProducts: function (oEvent) {
                var aFilter = []
                const sQuery = oEvent.getParameter("query")
                if (sQuery) {
                    aFilter.push(new Filter("product", FilterOperator.Contains, sQuery))
                }
                const oTable = this.byId("productsTable");
                const oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            },
            onPopinLayoutChanged: function() {
                var oTable = this.byId("productsTable");
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
            onSelect: function(oEvent) {
                var bSelected = oEvent.getParameter("selected"),
                    sText = oEvent.getSource().getText(),
                    oTable = this.byId("productsTable"),
                    aSticky = oTable.getSticky() || [];
    
                if (bSelected) {
                    aSticky.push(sText);
                } else if (aSticky.length) {
                    var iElementIndex = aSticky.indexOf(sText);
                    aSticky.splice(iElementIndex, 1);
                }
    
                oTable.setSticky(aSticky);
            },
            onToggleInfoToolbar: function(oEvent) {
                var oTable = this.byId("productsTable");
                oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
            }
        });
    });