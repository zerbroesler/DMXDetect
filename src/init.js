 function init(){

	event = new Event();
	var ui = new Ui();
	var dmx = new Dmx();
	var lamp = new Lamp(['Value','R','G','B']);
	var guessed = new Guessed();
	buttons = new Buttons(guessed,dmx);
	dmx.setValue(3,222);
	
	var rerender = function(event){
		if(event==='rerender'){
			ui.renderElement('dmx',dmx.render(10));
			ui.renderElement('lamp',lamp.render());
			ui.renderElement('guessed',guessed.render());
		}
	}
	var nextGuess = function(event){
		if(event === 'nextGuess'){
			guessed.nextGuess(dmx);
		}
	}

	event.attach(rerender);
	event.attach(nextGuess);

	// 	var lamp = new Lamp(['Value','R','G','B']);
// //var lamp = new Lamp(['R','G','B']);
// 	var autodetect = new Autodetect(lamp);
// 	// Global, because it is used in html
// 	buttons = new Buttons(autodetect,lamp);

// 	autodetect.init();
// 	autodetect.autodetect();
// 	lamp.setColor();
};