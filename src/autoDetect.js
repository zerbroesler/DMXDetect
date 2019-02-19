var Autodetect = function(lamp){

	var properties = {
		channels : 4,
		probedColor : []
	};
	var oldColor = new Color(0,0,0);
	var channelNo = 0;
	
	this.init = function(){
		this.initProperties();
	};
	this.initProperties = function(){
		for (var channelNo = 0; channelNo < properties.channels; channelNo++) {
			properties.probedColor[channelNo] = new Color(0,0,0); 
		}
	};
	this.setChannelAttribute = function(color){
		color.subtract(oldColor);
		properties.probedColor[channelNo].copyColor(color);
		oldColor.addColor(color);
		return color;
	};
	this.getChannelNo = function(){
		return channelNo;
	};
	this.getChannelColor = function(channelNo){
		return properties.probedColor[channelNo];
	};
	
	this.autodetect = function(){
		
		if(!oldColor.isWhite()){
			channelNo = this.findUnprobedChannel();
			if(channelNo>=0){
				lamp.setChannelValue(channelNo,255);
			}else{
				// All channels probed, turn off some

			}
		}
	}
	this.findUnprobedChannel = function(){
		var found = false;
		channelNo = 0;
		do{
			if(properties.probedColor[channelNo].isEmpty()){
				found = true;
				break;
			}
			channelNo++;
		}while((found == false) && (channelNo < properties.channels));
		if(channelNo === properties.channels){
			return -1;
		}else{
			return channelNo;		
		}
	}
};