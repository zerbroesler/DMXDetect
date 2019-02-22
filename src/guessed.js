Guessed = function () {

    var numberOfChannels = 0;
    var guessData = []; // {dmx:dmx,color:color}
    var dmx = new Dmx();
    var sure = false;
	var result = { r:[],g:[],b:[],v:-1};

    function setDmx(dmxIn) {
        dmx = dmxIn;
    }

    function render() {
        var html = new Dmx().renderHeading(numberOfChannels);
        var color;
        html = html.slice(0, -6); // Remove </tr>
        html += '<th>Color</th></tr>';
        guessData.forEach(function (guessElement) {
            html += guessElement.dmx.renderData(numberOfChannels);
            html = html.slice(0, -6); // Remove </tr>
            color = guessElement.color.getColor();
            html += '<td style = "width: 50px; background-color : rgb(' + (color.r) + ',' + (color.g) + "," + (color.b) + ');"> </td>';
            html += '</tr>'
        });
        html += '</table>';
        return html;
    }
//    function renderResults() {
//        var html = new Dmx().renderHeading(numberOfChannels);
//        var color;
//        html = html.slice(0, -6); // Remove </tr>
//        html += '<th>Color</th></tr>';
//        guessData.forEach(function (guessElement) {
//            html += guessElement.dmx.renderData(numberOfChannels);
//            html = html.slice(0, -6); // Remove </tr>
//            color = guessElement.color.getColor();
//            html += '<td style = "width: 50px; background-color : rgb(' + (color.r) + ',' + (color.g) + "," + (color.b) + ');"> </td>';
//            html += '</tr>'
//        });
//        html += '</table>';
//        return html;
//    }
    
    
    function addGuess(color) {
        numberOfChannels = Math.max(dmx.getMaxChannel(), numberOfChannels);
        var guessIndex = guessData.length;
        guessData[guessIndex] = {
            dmx: dmx.clone(),
            color: color,
        };
    }
    function savein(where,value){
    	if(!where.find(function(element){
    		return element === value;
    	})){
    		where.push(value);
    	}
    }
    function calculatePossibilites() {

    	var prevDmx;
    	var prevColor;
    	
    	var differenceDmx;
    	var differenceColor;
    	
    	var differences = [];
        guessData.forEach(function (guessElement) {
        	if(prevDmx !== undefined){
        		differenceDmx = guessElement.dmx.difference(prevDmx);
        		differenceColor = guessElement.color.clone();
        		differenceColor.difference(prevColor);
        		differenceColorValues = differenceColor.getColor();
        		var dcv = differenceColorValues;
        		var guess = {
        				r : -1,
        				g : -1,
        				b : -1
        		}
        		var max = differenceDmx.getMaxChannel();
        		if(dcv.r!==0){ guess.r = max; savein(result.r,max) };
        		if(dcv.g!==0){ guess.g = max; savein(result.g,max) };
        		if(dcv.b!==0){ guess.b = max; savein(result.b,max) };
//        		if(dcv.value!==0){ guess.v = max };
        		differences.push({dmx: differenceDmx.clone(),color : differenceColor, guess: guess});
        	}
        	prevDmx = guessElement.dmx;
        	prevColor = guessElement.color;
        });
        
        return {
            sure: sure,
        };
    }
    function getRandomInt(max) {
    	  return Math.floor(Math.random() * Math.floor(max));
    	}
    function getUnguessedChannel() {
    	return getRandomInt(5)+1;
//        var countDmx = new Dmx();
//        guessData.forEach(function (guessElement) {
//            guessElement.dmx.count(countDmx);
//        });
//        for (var dmxChannel = 1; dmxChannel <= 512; dmxChannel++) {
//            if (countDmx.getValue(dmxChannel) === 0) {
//                return dmxChannel;
//            }
//        }
//        return 0;
    }
    function nextGuess() {
        var unguessed = getUnguessedChannel();
        dmx.toggleValue(unguessed, 255);
        calculatePossibilites();
        return dmx;
    }
    return {
        setDmx: setDmx,
        render: render,
        addGuess: addGuess,
        getUnguessedChannel: getUnguessedChannel,
        nextGuess: nextGuess,
        calculatePossibilites: calculatePossibilites,
    }

}