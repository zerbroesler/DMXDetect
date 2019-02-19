var Lamp = function(channelMap){

    var color = new Color(0,0,0);
    if(channelMap.includes('Value')){
        color.setValue(0);
    }else{
        color.setValue(255);
    }
    
	this.setColor = function(){
		this.setElementColor("color",color);
	}

	this.setElementColor = function(elementName,color){
		var element = document.getElementById(elementName);
		var values = color.getColor();
		element.setAttribute("style",'background-color : rgb('+(values.r)+','+(values.g)+","+(values.b));
	}

    this.setChannelValue = function(channel,value){
        attribute = channelMap[channel];
        switch (attribute) {
        case 'R':
            color.addColorRGB(value,0,0);
            break;
        case 'G':
            color.addColorRGB(0,value,0);
            break;
        case 'B':
            color.addColorRGB(0,0,value);
            break;
        case 'Value':
            color.setValue(value);
            break;
        default:
            break;
        }
    }
}
