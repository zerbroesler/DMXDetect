var dmx;
QUnit.module("Dmx",{
  beforeEach : function(){
    dmx = new Dmx();
  }
});
QUnit.test( "render returns something", function( assert ) {
    assert.ok( dmx.render());
  });

//   QUnit.test( "", function( assert ) {
//     assert.ok( dmx.);
//   });
  QUnit.test( "getValue reads a channel value", function( assert ) {
    assert.equal( dmx.getValue(1),0);
  });
  QUnit.test( "getValue throws error on invalid channel number", function( assert ) {
    assert.throws(function(){dmx.getValue(0)});
    assert.throws(function(){dmx.getValue(513)});
  });
  QUnit.test( "getValue throws error on invalid value", function( assert ) {
    assert.throws(function(){dmx.setValue(1,-1)});
    assert.throws(function(){dmx.setValue(1,256)});
  });
  QUnit.test( "getValue reads stored channel value", function( assert ) {
    dmx.setValue(1,77);
    dmx.setValue(77,1);
    dmx.setValue(512,37);
    assert.equal(dmx.getValue(1),77);
    assert.equal(dmx.getValue(77),1);
    assert.equal(dmx.getValue(512),37);
  });
  QUnit.test( "clone creates a copy, not reference", function( assert ) {
    dmx.setValue(1,77);
    dmx.setValue(77,1);
    dmx.setValue(512,33);
    var dmxClone = dmx.clone();
    assert.notEqual(dmx,dmxClone);
    assert.equal(dmxClone.getValue(1),77);
    assert.equal(dmxClone.getValue(2),0);
    assert.equal(dmxClone.getValue(77),1);
    assert.equal(dmxClone.getValue(512),33);
  });
  QUnit.test( "getMaxChannel returns maximum channel with value", function( assert ) {
    dmx.setValue(77,1);
  assert.equal(dmx.getMaxChannel(),77);
});
