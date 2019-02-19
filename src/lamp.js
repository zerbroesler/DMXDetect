var Lamp = function(channelMap){

    var dmx = new Dmx();
    var NumberOfChannels = channelMap.length;

    // if(channelMap.includes('Value')){
    //     color.setValue(0);
    // }else{
    //     color.setValue(255);
    // }
    
	// this.setColor = function(){
	// 	this.setElementColor("color",color);
	// }

	// this.setElementColor = function(elementName,color){
	// 	var element = document.getElementById(elementName);
	// 	var values = color.getColor();
	// 	element.setAttribute("style",'background-color : rgb('+(values.r)+','+(values.g)+","+(values.b));
	// }

    setChannelValue = function(channel,value){
        dmx.setValue(channel,value);
    };
    getColor = function(){
        var color = new Color(0,0,0);
        var channelNo = 0;
        channelMap.forEach(function(attribute){
            channelNo++;
            var value = dmx.getValue(channelNo);
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
        });
        return color;
    };
    function render(){
        var dmxhtml = dmx.render(NumberOfChannels);
        var re = RegExp('^(.+)(<\/table>)$','s');
        var withoutTableHtml = re.exec(dmxhtml)[1];
        channelMap.forEach(function(attribute){
            withoutTableHtml +=  '<td>'+attribute+'</td>\n';
        });
        withoutTableHtml += '</tr>\n</table>\n';
        var html = '<div id="color" x-size ="50px">---</div>';
        return withoutTableHtml + '<br>' + html;
    };

    return {
        render : render,
        setChannelValue : setChannelValue,
        getColor : getColor,
    };
};
