sap.ui.define(function(){
	"use strict"

	const Formatter = {
			status: function(sStatus){
					if(sStatus === "Available") {
							return "Success"
					}
					else if(sStatus === "Out of Stock") {
							return "Warning"
					}
					else if(sStatus === "Discontinued") {
							return "Error"
					}
					else{
							return "None"
					}
			},
			weightState :  function (fMeasure, sUnit) {
						const fMaxWeightSuccess = 1;
						const fMaxWeightWarning = 5;
						let fAdjustedMeasure = parseFloat(fMeasure);

					if (isNaN(fAdjustedMeasure)) {
						return "None";
					} else {
						if (sUnit === "G") {
							fAdjustedMeasure = fMeasure / 1000;
						}

						if (fAdjustedMeasure < 0) {
							return "None";
						} else if (fAdjustedMeasure < fMaxWeightSuccess) {
							return "Success";
						} else if (fAdjustedMeasure < fMaxWeightWarning) {
							return "Warning";
						} else {
							return "Error";
						}
					}	
			}
		}

		return Formatter;    

	}, bExport=  true)