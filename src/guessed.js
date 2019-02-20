Guessed = function(){

    var numberOfChannels = 0;
    var guessData = [];

    function render(){
        var html = new Dmx().renderHeading(numberOfChannels);
        var color;
        html = html.slice(0,-5); // Remove </tr>
        html += '<th>Color</th></tr>';
        guessData.forEach(function(guessElement){
//            for (var guessIndex = 0;guessIndex < guessData.length; guessIndex++){
            html += guessElement.dmx.renderData(numberOfChannels);
            html = html.slice(0,-5); // Remove </tr>
            color = guessElement.color.getColor();
            html += '<td style = "width: 50px; background-color : rgb('+(color.r)+','+(color.g)+","+(color.b)+');"> </td></tr>';
        });
        html += '</table>';
        return html;
    }
    function addGuess(dmx,color){
        numberOfChannels = Math.max(dmx.getMaxChannel(),numberOfChannels);
        var guessIndex = guessData.length;
        guessData[guessIndex] = {
            dmx : dmx,
            color : color
        }
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
    return{
        render : render,
        addGuess : addGuess,
        getUnguessedChannel : getUnguessedChannel
    }

}