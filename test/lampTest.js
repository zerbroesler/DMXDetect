var lamp;

function lampSimple(){
    return lamp = new Lamp(['R','G','B']);
}
function lampSimpleDim(){
    return lamp = new Lamp(['R','G','B','Value']);
}
function checkColor(assert,lamp,r,g,b){
    var color = lamp.getColor();
    var colorValues = color.getColor();
    assert.equal(colorValues.r,r);
    assert.equal(colorValues.g,g);
    assert.equal(colorValues.b,b);
};

QUnit.test( "render returns something", function( assert ) {
    var lamp = lampSimple();
    assert.ok( lamp.render());
});
//QUnit.test( "", function( assert ) {

QUnit.test( "getColor returns red", function( assert ) {
    var lamp = lampSimple();
    lamp.setChannelValue(1,255);
    checkColor(assert,lamp,255,0,0);
});
QUnit.test( "getColor returns dark red", function( assert ) {
    var lamp = lampSimpleDim();
    lamp.setChannelValue(1,255);
    lamp.setChannelValue(4,100);
    checkColor(assert,lamp,100,0,0);
});
QUnit.test( "getColor returns cyan", function( assert ) {
    var lamp = lampSimple();
    lamp.setChannelValue(2,255);
    lamp.setChannelValue(3,255);
    checkColor(assert,lamp,0,255,255);
});