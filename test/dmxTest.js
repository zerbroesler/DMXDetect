var dmx = new Dmx();

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
  });
  QUnit.test( "getValue throws error on invalid value", function( assert ) {
    assert.throws(function(){dmx.setValue(1,-1)});
    assert.throws(function(){dmx.setValue(1,256)});
  });
  QUnit.test( "getValue reads stored channel value", function( assert ) {
      dmx.setValue(1,77);
      dmx.setValue(77,1);
    assert.equal(dmx.getValue(1),77);
    assert.equal(dmx.getValue(77),1);
  });