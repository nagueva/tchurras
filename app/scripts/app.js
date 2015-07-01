item = {};
function printItens(){
  $.each(item, function(index, value) { 
    $('#'+index+'>span').html(Math.round(value*100)/100);
  });
}
function calc(mn,wn){
  mn = typeof mn !== 'undefined' ? mn : 1;
  wn = typeof wn !== 'undefined' ? wn : 1;
  item['meat'] = (.350*mn)+(.250*wn);
  item['sausage'] = (.150*mn)+(.100*wn);
  item['bread'] = (3*mn)+(2*wn);
  item['beer'] = (3*mn)+(1.5*wn);
  item['soda'] = (.500*mn)+(.750*wn);
  item['charcoal'] = (.300*mn)+(.250*wn);
  // item[''] = (*mn)+(*wn);
  printItens();
}
var core = {
  init:function(){
    $('#go').click(function(){
      mn = $('#men-number').val();
      wn = $('#women-number').val();
      calc(mn,wn);
      return false;
    });
  }
};

$(document).ready(function(){
  $(document).foundation();
  core.init()
});
