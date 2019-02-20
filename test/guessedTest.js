var guessed;
QUnit.module("Guessed",{
    beforeEach : function(){
      guessed = new Guessed();
    }
  });
QUnit.test( "render returns something", function( assert ) {
    assert.ok( guessed.render());
  });

//   QUnit.test( "", function( assert ) {
//     assert.ok( dmx.);
//   });
   QUnit.test( "getUnguessedChannel returns channel 1", function( assert ) {
     assert.equal( guessed.getUnguessedChannel(),1);
   });
   QUnit.test( "getUnguessedChannel returns channel 2", function( assert ) {
       var dmx = new Dmx();
       dmx.setValue(1,255);
        guessed.addGuess(dmx);
        assert.equal( guessed.getUnguessedChannel(),2);
  });   