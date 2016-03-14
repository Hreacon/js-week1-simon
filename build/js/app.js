(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./../js/simon.js":1}]},{},[2]);
