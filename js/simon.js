exports.playSimon = function(sequence, colorDiv) // pass in the color sequence
{
  // play the color sequence
  var play = function(sequence, index) {
    colorDiv(sequence[index]);
    window.setTimeout(function() {
      window.setTimeout(function() {
        index = index + 1;
        if( index < sequence.length ) {
          play(sequence, index);
        }
      }, 100);
      console.log(sequence);
    }, 750);
  };
  play(sequence, 0);
};

exports.colorDiv = function(id)
{
  $(".play1").removeClass("play1");
  $(".play2").removeClass("play2");
  $(".play3").removeClass("play3");
  $(".play4").removeClass("play4");
  $("#"+id).addClass('play'+id);
  window.setTimeout(function() {
    $("#"+id).removeClass('play'+id);
  }, 750);
}

exports.sequenceGenerator = function(sequence)  // pass in a sequence, or not?
{
  console.log("GENERATOR: " + sequence);
  if(sequence === 1)
  {
    // new sequence(new game)
    sequence = [Math.floor(Math.random()*4)+1];

  } else {
    // add to sequence
    sequence.push(Math.floor(Math.random()*4)+1);
  }
  return sequence;
};

// each click needs to compare
// each click has an index
exports.compareSequence = function(index, click, sequence)
{
  // use index to check sequence to see if click matches
  console.log( " Comparing: " + click + " n " +sequence[index]);
  return (click == sequence[index]);
};
