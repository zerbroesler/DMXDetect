 function init(){

	var ui = new Ui();
	var dmx = new Dmx();
	var lamp = new Lamp(['Value','R','G','B']);
	dmx.setValue(3,222);

	ui.renderElement('dmx',dmx.render(10));
	ui.renderElement('lamp',lamp.render());

	// 	var lamp = new Lamp(['Value','R','G','B']);
// //var lamp = new Lamp(['R','G','B']);
// 	var autodetect = new Autodetect(lamp);
// 	// Global, because it is used in html
// 	buttons = new Buttons(autodetect,lamp);

// 	autodetect.init();
// 	autodetect.autodetect();
// 	lamp.setColor();
};