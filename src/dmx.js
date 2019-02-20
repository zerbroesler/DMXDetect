var Dmx = function(){

    var channelValues = [];
    for(var channelNo = 1;channelNo<=512;channelNo++){
        channelValues[channelNo]=0;
    }

    function clone(){
        var clonedDmx = new Dmx();
        for(var channelNo = 1;channelNo<=512;channelNo++){
            clonedDmx.setValue(channelNo,getValue(channelNo));
        }
        return clonedDmx;
    }
    function getMaxChannel(){
        var maxChannel;
        for(var channelNo = 1;channelNo<=512;channelNo++){
            if(channelValues[channelNo] !== 0){
                maxChannel = channelNo;
            }
        }
        return maxChannel;
    }

    function render(NumberOfChannels){
        var html = renderHeading(NumberOfChannels);
        html += renderData(NumberOfChannels);
        html += '</table>';
        return html;
    }
    function renderHeading(NumberOfChannels){
        var html = '<table style = "border: 1px solid black"><tr>\n';
        var channelNo;
        for(channelNo = 1;channelNo<=NumberOfChannels;channelNo++){
            html +=  '<th>C'+channelNo+'</th>\n';
        };
        html += '</tr>\n';
        return html;
    }
    function renderData(NumberOfChannels){
        var html = '<tr>';
        for(channelNo = 1;channelNo<=NumberOfChannels;channelNo++){
            html +=  '<td>'+channelValues[channelNo]+'</td>\n';
        };
        html += '</tr>';
        return html;
    }

    function getValue(channelNo){
        checkChannelNo(channelNo);
        return channelValues[channelNo];
    }
    function setValue(channelNo,channelValue){
        checkChannelNo(channelNo);
        checkValueRange(channelValue);
        channelValues[channelNo]=channelValue;
    }

    function checkChannelNo(channelNo){
        if((channelNo <1) || (channelNo >512)){
            throw 'Channelnumber invalid';
        }
    }
    function checkValueRange(value){
        if(value<0 || value >255){
            throw 'Channelvalue out of range';
        }
    }

    return {
        clone : clone,
        getMaxChannel : getMaxChannel,
        render : render,
        renderHeading : renderHeading,
        renderData : renderData,
        getValue : getValue,
        setValue : setValue,
    }
}