Guessed = function () {

    var numberOfChannels = 0;
    var guessData = []; // {dmx:dmx,color:color}
    var dmx = new Dmx();
    var sure = false;
    result = new Result();
	var channelCount = 0;
    var wasWhite = false;
    var guessPhase = 0;

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
    function renderResult() {
        var html = result.render();
        html += '<br>Dim: ';
        html += result.findDim();
        html += '<br>Red: ';
        html += result.getAttributeChannel('R');
        html += '<br>Green: ';
        html += result.getAttributeChannel('G');
        html += '<br>Blue: ';
        html += result.getAttributeChannel('B');
        return html;
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
        		if(dcv.r!==0){ guess.r = max; result.addAttribute('R',max) };
        		if(dcv.g!==0){ guess.g = max; result.addAttribute('G',max) };
        		if(dcv.b!==0){ guess.b = max; result.addAttribute('B',max) };

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
        // Phases
        const setLeftToRight = 0;
        const findDim = 1;
        const turnOffLeftToRight = 2;
//        const noDimFound = 3;
        const random = 4;

        switch(guessPhase){
            case setLeftToRight :
                if(guessData[guessData.length-1].color.isWhite()){
                    channelCount = 1;
                    guessPhase = findDim;
                    return channelCount;    		
                }else{
                    channelCount++;
                    return channelCount;
                }
            case findDim:
            // Set channels to 0 from left to right
                if(guessData[guessData.length-1].color.isBlack()){
                    // find the dim from the data
                    dim = result.findDim();
                    if(dim === -1){
                        channelCount++                        
                        return channelCount;
                    }else{
                        guessPhase = turnOffLeftToRight;
                        channelCount = dim;
                        return channelCount;
                    }
                }else{
                    channelCount++;
                    return channelCount;
                }
            case turnOffLeftToRight:
                channelCount++;
                if(channelCount===numberOfChannels){
                    guessPhase = random;
                    return -1;
                }else{
                    return channelCount;
                }
            // case noDimFound:
            //     guessPhase = random;
            //     return -1;
            case random:
                return getRandomInt(numberOfChannels)+1;
            default:
              return -1;
        }

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

    }
    function nextGuess() {
        var unguessed = getUnguessedChannel();
        if(unguessed === -1){
            console.log("fatal error");
            return dmx;
        }
        dmx.toggleValue(unguessed, 255);
        calculatePossibilites();
        return dmx;
    }
    return {
        setDmx: setDmx,
        render: render,
        renderResult: renderResult,
        addGuess: addGuess,
        getUnguessedChannel: getUnguessedChannel,
        nextGuess: nextGuess,
        calculatePossibilites: calculatePossibilites,
    }

}