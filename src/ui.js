function Ui(){

    function renderElement(elementName,html){
        var element = document.getElementById(elementName);
        element.innerHTML=html;        
    }
    return{
        renderElement : renderElement,
    }

}