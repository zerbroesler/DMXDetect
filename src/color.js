var Color = function(r,g,b){
    var s = {
        r : r,
        g : g,
        b : b,
        value : 255,
        empty : true,
    }


//    this.isEmpty = function(){
//        return s.empty;
//    }
    this.isBlack = function(){
        if(s.r==0 && s.g==0 && s.b==0){
            return true;
        }else{
            return false;
        }
    };
    this.isWhite = function(){
        if(s.r==255 && s.g==255 && s.b==255){
            return true;
        }else{
            return false;
        }
    };
    this.getColor = function(){
        var result = {};//new Color();
        result.r = s.r * s.value / 255;
        result.g = s.g * s.value / 255;
        result.b = s.b * s.value / 255;
        result.value = s.value;
        result.empty = s.empty;
        return result;
    };
    this.setValue = function(value){
        s.value = value;
        s.empty = false;
    };
    this.setColor = function(r,g,b){
        s.r = r;
        s.g = g;
        s.b = b;
        s.empty = false;
    };
    this.addColorRGB = function(r,g,b){
        s.r = Math.max(s.r,r);
        s.g = Math.max(s.g,g);
        s.b = Math.max(s.b,b);
        s.empty = false;
    };
    this.addColor = function(color){
        var o=color.getColor();
        this.addColorRGB(o.r,o.g,o.b);
    };
    this.copyColor = function(color){
        var o=color.getColor();
        s.r = o.r;
        s.g = o.g;
        s.b = o.b;
        s.value = o.value;
        s.empty = false;
    };
    this.clone = function(){
    	var clon = new Color();
    	clon.setColor(s.r,s.g,s.b)
    	clon.setValue(s.value);
    	return clon;
    }
    this.subtract = function(color){
        var c = color.getColor();
        s.r = Math.max(s.r-c.r,0);
        s.g = Math.max(s.g-c.g,0);
        s.b = Math.max(s.b-c.b,0);
        s.empty = false;
    };
    this.difference = function(color){
        var c = color.getColor();
        s.r = Math.abs(s.r-c.r);
        s.g = Math.abs(s.g-c.g);
        s.b = Math.abs(s.b-c.b);
        s.empty = false;
    };
}