var Dmx = function(){

    var channelValues = [];
    var channelNo;
    for(channelNo = 1;channelNo<=512;channelNo++){
        channelValues[channelNo]=0;
    }

    function render(NumberOfChannels){
        var html = '<table style = "border: 1px solid black"><tr>\n';
        var channelNo;
        for(channelNo = 1;channelNo<=NumberOfChannels;channelNo++){
            html +=  '<th>C'+channelNo+'</th>\n';
        };
        html += '</tr>\n<tr>';
        for(channelNo = 1;channelNo<=NumberOfChannels;channelNo++){
            html +=  '<td>'+channelValues[channelNo]+'</td>\n';
        };
        html += '</tr></table>';
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
        render : render,
        getValue : getValue,
        setValue : setValue,
    }
}