var Lamp = function(channelMap){

    var dmx = new Dmx();
    var NumberOfChannels = channelMap.length;

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
        var dmxHtml = dmx.renderHeading(NumberOfChannels);
        dmxHtml += dmx.renderData(NumberOfChannels);
        dmxHtml += '<tr>\n';
        channelMap.forEach(function(attribute){
            dmxHtml +=  '<td>'+attribute+'</td>\n';
        });
        dmxHtml += '</tr>\n</table>\n';
        var color = getColor().getColor();
        var html = '<div id="color"  style = "width : 50px; background-color : rgb('+(color.r)+','+(color.g)+","+(color.b)+')"';
        html+='>---</div>';
        
        return dmxHtml + '<br>' + html;
    };
    setDmx = function(dmxIn){
        dmx = dmxIn;
    };

    return {
        render : render,
        setChannelValue : setChannelValue,
        getColor : getColor,
        setDmx : setDmx,
    };
};
