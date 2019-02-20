Guessed = function(){
    
    var numberOfChannels = 0;
    var guessData = []; // {dmx:dmx,color:color}
    var dmx = new Dmx();
    var channels = [];
    var sure = false;
    
    function setDmx(dmxIn){
        dmx = dmxIn;
    }

    function render(){
        var html = new Dmx().renderHeading(numberOfChannels);
        var color;
        html = html.slice(0,-6); // Remove </tr>
        html += '<th>Color</th></tr>';
        guessData.forEach(function(guessElement){
            html += guessElement.dmx.renderData(numberOfChannels);
            html = html.slice(0,-6); // Remove </tr>
            color = guessElement.color.getColor();
            html += '<td style = "width: 50px; background-color : rgb('+(color.r)+','+(color.g)+","+(color.b)+');"> </td>';
            html += '</tr>'
        });
        html += '<tr>'
        channels.forEach(function(channelGuess){
            html += '<td>'
            html += channelGuess;
            html += '</td>'
        });
        html += '</tr>'
        html += '</table>';
        return html;
    }
    function addGuess(color){
        numberOfChannels = Math.max(dmx.getMaxChannel(),numberOfChannels);
        var guessIndex = guessData.length;
        guessData[guessIndex] = {
            dmx : dmx.clone(),
            color : color,
        };
        var possibilites = calculatePossibilites();
        channels = possibilites.channels;
        sure = possibilites.sure;
    }
    function calculatePossibilites(){
        channels = [];
        for (var dmxChannel = 1; dmxChannel <= numberOfChannels; dmxChannel++) {
            guessData.forEach(function(guessElement){
                var dmx = guessElement.dmx;
                var color = guessElement.color;
                channels[dmxChannel]=color.getColor().r;
            });
        };

        return {
            sure : sure,
            channels : channels,
        };
    }

    function getUnguessedChannel(){
        var countDmx = new Dmx();
        guessData.forEach(function(guessElement){
            guessElement.dmx.count(countDmx);
        });
        for (var dmxChannel = 1; dmxChannel <= 512; dmxChannel++) {
            if(countDmx.getValue(dmxChannel)===0){
                return dmxChannel;
            }
        }
        return 0;
    }
    function nextGuess(){
        var unguessed = getUnguessedChannel();
        dmx.setValue(unguessed,255);
        return dmx;
    }
    return{
        setDmx : setDmx,
        render : render,
        addGuess : addGuess,
        getUnguessedChannel : getUnguessedChannel,
        nextGuess : nextGuess,
        calculatePossibilites : calculatePossibilites,
    }

}