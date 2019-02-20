var guessed = new Guessed();
QUnit.module("Guessed");
QUnit.test( "render returns something", function( assert ) {
    assert.ok( dmx.render());
  });

//   QUnit.test( "", function( assert ) {
//     assert.ok( dmx.);
//   });
//   QUnit.test( "getValue reads a channel value", function( assert ) {
//     assert.equal( dmx.getValue(1),0);
//   });