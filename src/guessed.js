Guessed = function () {

    var numberOfChannels = 0;
    var guessData = []; // {dmx:dmx,color:color}
    var dmx = new Dmx();
    var sure = false;
	result = new Result();
	var channelCount = 0;
    var wasWhite = false;
    var rgbInfluence = [];

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

    function renderStatistic() {    
        var html = '<table style = "border: 1px solid black"><tr>\n';
        html += '<th>Red</th>\n';
        html += '<th>Green</th>\n';
        html += '<th>Blue</th>\n';
        html += '</tr>'
        rgbInfluence.forEach(function (rgbI) {
            html += '<tr>'
            html += '<td>'+rgbI.r+'</td>';
            html += '<td>'+rgbI.g+'</td>';
            html += '<td>'+rgbI.b+'</td>';
            html += '</tr>'
        });
        html += '</table>';
        return html;
    }
    function renderResult() {
    	return result.render();
    }
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

    function calculatePossibilites() {

    	result = new Result();
    	var prevDmx;
    	var prevColor;
    	
    	var differenceDmx;
    	var differenceColor;
    	
    	var differences = [];
        guessData.forEach(function (guessElement) {
        	if(prevDmx !== undefined){
        		differenceDmx = guessElement.dmx.getDifferences(prevDmx);
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
        		if(dcv.r!==0){ guess.r = max; result.addAttribute('r',max) };
        		if(dcv.g!==0){ guess.g = max; result.addAttribute('g',max) };
        		if(dcv.b!==0){ guess.b = max; result.addAttribute('b',max) };

        		differences.push({dmx: differenceDmx.clone(),color : differenceColor, guess: guess});
        	}
        	prevDmx = guessElement.dmx;
        	prevColor = guessElement.color;
        });
        
        return {
            sure: sure,
            result : result,
        };
    }
    function getRandomInt(max) {
    	  return Math.floor(Math.random() * Math.floor(max));
    	}
    function getUnguessedChannel() {
    	if(wasWhite){
    		if(guessData[guessData.length-1].color.isBlack()){
    			// find the dim from the data
    			channelCount = result.findDim();
    			return result.findDim();
    		}else{
        		channelCount++;
        		return channelCount;
    		}
    	}else if(guessData[guessData.length-1].color.isWhite()){
    		channelCount = 1;
    		wasWhite = true;
    		return channelCount;    		
    	}else{
    		channelCount++;
    		return channelCount;
    	}
// First switch all channels to on, one after the other    	
    	
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
        renderResult: renderResult,
        renderStatistic: renderStatistic,
        addGuess: addGuess,
        getUnguessedChannel: getUnguessedChannel,
        nextGuess: nextGuess,
        calculatePossibilites: calculatePossibilites,
    }

}