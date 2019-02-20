 function init(){

	event = new Event();
	var ui = new Ui();
	var lamp = new Lamp(['Value','R','G','B']);
	var guessed = new Guessed();
	buttons = new Buttons(guessed);
	
	var update = function(event){
		if(event==='rerender'){
			ui.renderElement('lamp',lamp.render());
			ui.renderElement('guessed',guessed.render());
		}
	}
	var nextGuess = function(event){
		if(event === 'nextGuess'){
			guessed.nextGuess();
		}
	}
	
	event.attach(update);
	event.attach(nextGuess);
	update('rerender');

	// 	var lamp = new Lamp(['Value','R','G','B']);
// //var lamp = new Lamp(['R','G','B']);
// 	var autodetect = new Autodetect(lamp);
// 	// Global, because it is used in html
// 	buttons = new Buttons(autodetect,lamp);

// 	autodetect.init();
// 	autodetect.autodetect();
// 	lamp.setColor();
};