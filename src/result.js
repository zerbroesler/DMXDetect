function Result(){

	var data = {};
    function render(){
    	var html = '<p>';
		html += JSON.stringify(data);
    	return html;
    }
    function saveIn(where,value){
    	if(!where.find(function(element){
    		return element === value;
    	})){
    		where.push(value);
    	}
    }    
    
    function getAttributes(attributeName){
    	return data[attributeName];
    }

    function addAttribute(attributeName,value){
    	if(data[attributeName]===undefined){
    		data[attributeName]=[];
    	}
    	saveIn(data[attributeName],value);
    }
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) !== index;
	}
    function findDim(){
    	doubles = [];
    	for(var attributeName in data){
    	    if (data.hasOwnProperty(attributeName)) {
    	    	doubles = doubles.concat(data[attributeName]);
    	    }
    	}
    	var unique = doubles.filter( onlyUnique )
    	if(unique.length>0){
        	return unique[0];
    	}
    	return -1;
	}
	function getAttributeChannel(attributeName){
		var dim = findDim();
//		var unique = data[attributeName].filter( onlyUnique );
		var channels = data[attributeName];
		if(channels === undefined){
			return -1;
		}
		switch(channels.length){
			case 1:
				return channels[0];
				break;
			case 2:
				if(channels[0]===dim){
					return channels[1];
				}else{
					return channels[0];
				}
			default:
				return -1;
		}

	}
    
    return{
        render : render,
        getAttributes : getAttributes, 
		addAttribute : addAttribute,
		getAttributeChannel : getAttributeChannel,
        findDim : findDim,
    }

}