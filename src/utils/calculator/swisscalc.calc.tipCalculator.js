//
// Eric Morgan
// Copyright (c) 2014.
//

// Class for implementing a tip calculator

 global.swisscalc = global.swisscalc || {};
global.swisscalc.calc = global.swisscalc.calc || {};
global.swisscalc.calc.tipCalculator = function() {
	this._subtotal = new global.swisscalc.display.fixedPointDisplay(2);	// Use fixed point display to handle keypad inputs
	this._tipPercent = 0.15;										// Store the actual value
};

// Getters...
global.swisscalc.calc.tipCalculator.prototype.getSubtotalValue 		= function() 		{ return this._subtotal.getDisplayValue(); };
global.swisscalc.calc.tipCalculator.prototype.getTipValueDecimal		= function() 		{ return this._tipPercent; };
global.swisscalc.calc.tipCalculator.prototype.getTipValuePercentage 	= function()		{ return this._tipPercent * 100.0; };

// Setters...
global.swisscalc.calc.tipCalculator.prototype.setSubtotalValue 		= function(value) 	{ this._subtotal.setDisplayValue(value); };
global.swisscalc.calc.tipCalculator.prototype.setTipValueDecimal 		= function(decimal) { this._tipPercent = decimal; };
global.swisscalc.calc.tipCalculator.prototype.setTipValuePercentage 	= function(perc) 	{ this._tipPercent = perc / 100.0; };

// Display functions...
global.swisscalc.calc.tipCalculator.prototype.getSubtotalDisplay 		= function() 		{ return global.swisscalc.lib.format.asUSCurrency(this._subtotal.getDisplayValue()); };
global.swisscalc.calc.tipCalculator.prototype.getTipPercentDisplay 	= function() 		{ return (this._tipPercent * 100.0).toFixed(1) + "%"; };
global.swisscalc.calc.tipCalculator.prototype.getTipAmountDisplay 		= function() 		{ return global.swisscalc.lib.format.asUSCurrency(this.getTipAmount()); };
global.swisscalc.calc.tipCalculator.prototype.getTipCombinedDisplay 	= function() 		{ return this.getTipPercentDisplay() + " " + this.getTipAmountDisplay(); };
global.swisscalc.calc.tipCalculator.prototype.getTotalDisplay 			= function()		{ return global.swisscalc.lib.format.asUSCurrency(this.getTotal()); };

// Returns the tip amount (in dollars)
global.swisscalc.calc.tipCalculator.prototype.getTipAmount = function() {
	const subtotal = this.getSubtotalValue();
	return subtotal * this._tipPercent;
};

// Returns the bill total including tip (in dollars)
global.swisscalc.calc.tipCalculator.prototype.getTotal = function() {
	const tipAmount = this.getTipAmount();
	return this.getSubtotalValue() + tipAmount;
};
