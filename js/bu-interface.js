var simon = require('./../js/simon.js');

$(document).ready(function() {
  var sequence = simon.sequenceGenerator(1);
  simon.playSimon(sequence, simon.colorDiv);
  var index = 0;
  $('div').each(function(){
    $(this).click(function(){
      simon.colorDiv($(this).attr('id'));//attr gathers value from id.
      var div = $(this);
      var click = div.attr('id');
      console.log("You clicked on: " + click + " supposed to click on " + sequence[index]);
      if (simon.compareSequence(index, click, sequence)) {
        console.log("compare true, index: " + index);
        index++;
        if(index >= sequence.length){
          sequence = simon.sequenceGenerator(sequence);
          index = 0;
          window.setTimeout(function() {
            simon.playSimon(sequence, simon.colorDiv);
          }, 2000);
        }
      } else {
        sequence = simon.sequenceGenerator(1);
        index = 0;
        window.setTimeout(function() {
          simon.playSimon(sequence, simon.colorDiv);
        }, 2000);
      }
    });
  });
});
