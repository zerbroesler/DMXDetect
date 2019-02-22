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
    function findDim(){
    	doubles = [];
    	for(var attributeName in data){
    	    if (data.hasOwnProperty(attributeName)) {
    	    	doubles = doubles.concat(data[attributeName]);
    	    }
    	}
    	function onlyUnique(value, index, self) { 
    	    return self.indexOf(value) !== index;
    	}
    	var unique = doubles.filter( onlyUnique )
    	if(unique.length>0){
        	return unique[0];
    	}
    	return 1;
    }
    
    return{
        render : render,
        getAttributes : getAttributes, 
        addAttribute : addAttribute,
        findDim : findDim,
    }

}