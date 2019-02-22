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
    
    return{
        render : render,
        getAttributes : getAttributes, 
        addAttribute : addAttribute, 
    }

}