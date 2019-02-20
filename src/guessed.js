Guessed = function(){

    var numberOfChannels = 0;
    var guessData = [];

    function render(){
        var html = new Dmx().renderHeading(numberOfChannels);
        var color;
        html = html.slice(0,-5); // Remove </tr>
        html += '<th>Color</th></tr>';
        for (var guessIndex = 0;guessIndex < guessData.length; guessIndex++){
            html += guessData[guessIndex].dmx.renderData(numberOfChannels);
            html = html.slice(0,-5); // Remove </tr>
            color = guessData[guessIndex].color.getColor();
            html += '<td style = "width: 50px; background-color : rgb('+(color.r)+','+(color.g)+","+(color.b)+');"> </td></tr>';
        }
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
    return{
        render : render,
        addGuess : addGuess,
    }

}