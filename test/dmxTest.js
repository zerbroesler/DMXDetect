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
  QUnit.test( "toggle value sets channel to value", function( assert ) {
	    dmx.toggleValue(1,77);
	    assert.equal(dmx.getValue(1),77);
  });
  QUnit.test( "toggle value resets channel to 0", function( assert ) {
	    dmx.toggleValue(1,77);
	    dmx.toggleValue(1,33);
	    assert.equal(dmx.getValue(1),0);
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
  QUnit.test( "getMaxChannel returns maximum channel 1 for empty dmx", function( assert ) {
    assert.equal(dmx.getMaxChannel(),1);
  });
    QUnit.test( "getMaxChannel returns maximum channel with value", function( assert ) {
    dmx.setValue(77,1);
    assert.equal(dmx.getMaxChannel(),77);
  });
  QUnit.test( "increaseValue increase value of channel", function( assert ) {
    dmx.setValue(2,2);
    dmx.increaseValue(1);
    dmx.increaseValue(2);
    assert.equal(dmx.getValue(1),1);
    assert.equal(dmx.getValue(2),3);
    assert.equal(dmx.getValue(3),0);
  });
  QUnit.test( "count counts the channels which are not a value (0)", function( assert ) {
      var countDmx = new Dmx();
      dmx.setValue(2,2);
      dmx.count(countDmx)
      assert.equal(countDmx.getValue(1),0);
      assert.equal(countDmx.getValue(2),1);
  });

  QUnit.test( "difference sets 1 for any difference between two DMXes", function( assert ) {
      var differenceDmx;
      var otherDmx = new Dmx();
      dmx.setValue(2,2);
      otherDmx.setValue(5,33);
      differenceDmx = dmx.difference(otherDmx);
      assert.equal(differenceDmx.getValue(1),0);
      assert.equal(differenceDmx.getValue(2),1);
      assert.equal(differenceDmx.getValue(3),0);
      assert.equal(differenceDmx.getValue(4),0);
      assert.equal(differenceDmx.getValue(5),1);
      assert.equal(differenceDmx.getValue(6),0);
  });

