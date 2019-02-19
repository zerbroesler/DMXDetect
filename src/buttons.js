function Buttons(autodetect,lamp){

	this.off = function(){
		this.set(0,0,0);
	};
	this.red = function(){
		this.set(1,0,0);
	};
	this.green = function(){
		this.set(0,1,0);
	};
	this.blue = function(){
		this.set(0,0,1);
	};
	this.yellow = function(){
		this.set(1,1,0);
	};
	this.cyan = function(){
		this.set(0,1,1);
	};
	this.magenta = function(){
		this.set(1,0,1);
	};
	this.white = function(){
		this.set(1,1,1);
	};
	this.set = function(r,g,b){
		var color = new Color(r*255,g*255,b*255);

		var channelNo = autodetect.getChannelNo();
		color = autodetect.setChannelAttribute(color);
		lamp.setElementColor("c"+channelNo,color);
		autodetect.autodetect();
		lamp.setColor();
	}
	

};