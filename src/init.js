function init(){
	var lamp = new Lamp(['Value','R','G','B']);
//var lamp = new Lamp(['R','G','B']);
	var autodetect = new Autodetect(lamp);
	// Global, because it is used in html
	buttons = new Buttons(autodetect,lamp);

	autodetect.init();
	autodetect.autodetect();
	lamp.setColor();
};