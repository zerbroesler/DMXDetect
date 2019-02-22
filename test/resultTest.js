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
