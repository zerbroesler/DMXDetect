var result;
QUnit.module("Result",{
    beforeEach : function(){
      result = new Result();
    }
});
QUnit.test( "result returns something", function( assert ) {
    assert.ok( result.render());
});
QUnit.test( "getAttributes returns undefined for unknown", function( assert ) {
    assert.deepEqual(result.getAttributes('unknown'),undefined);
});
QUnit.test( "getAttributes returns array with value added before", function( assert ) {
	result.addAttribute('Red',3);
    assert.deepEqual(result.getAttributes('Red')[0],3);
});
QUnit.test( "getAttributes returns multiple values added before", function( assert ) {
	result.addAttribute('Red',3);
	result.addAttribute('Red',0);
    assert.deepEqual(result.getAttributes('Red')[0],3);
    assert.deepEqual(result.getAttributes('Red')[1],0);
});
QUnit.test( "getAttributes returns unique values only once", function( assert ) {
	result.addAttribute('Red',3);
	result.addAttribute('Red',2);
	result.addAttribute('Red',3);
    assert.deepEqual(result.getAttributes('Red')[0],3);
    assert.deepEqual(result.getAttributes('Red')[1],2);
    assert.deepEqual(result.getAttributes('Red').length,2);
});

QUnit.test( "find dim gets channel which appears at multiple attributes", function( assert ) {
    result.addAttribute('Red',0);
    result.addAttribute('Green',1);
    result.addAttribute('Blue',2);
    result.addAttribute('Red',3);
    result.addAttribute('Green',3);
    result.addAttribute('Blue',3);
    var channel = result.findDim();
    assert.deepEqual(channel,3);
});

QUnit.test( "find dim returns -1 when all channels are unique", function( assert ) {
    result.addAttribute('Red',0);
    result.addAttribute('Green',1);
    result.addAttribute('Blue',2);
    var channel = result.findDim();
    assert.deepEqual(channel,-1);
});

QUnit.test( "getAttributeChannel returns channel when unique", function( assert ) {
	result.addAttribute('Red',3);
    result.addAttribute('Red',3);
    var channel = result.getAttributeChannel('Red');
    assert.deepEqual(channel,3);
    
});

QUnit.test( "getAttributeChannel returns -1 when not found", function( assert ) {
    result.addAttribute('Blue',3);
    var channel = result.getAttributeChannel('Red');
    assert.deepEqual(channel,-1);
    
});
QUnit.test( "getAttributeChannel returns channel when dim is known", function( assert ) {
    result.addAttribute('Red',2);
    result.addAttribute('Green',3);
    result.addAttribute('Blue',4);
    result.addAttribute('Red',7);
    result.addAttribute('Green',7);
    result.addAttribute('Blue',7);

    var channel = result.findDim();
    assert.deepEqual(channel,7);
    var channel = result.getAttributeChannel('Red');
    assert.deepEqual(channel,2);
    
});
