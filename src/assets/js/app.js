function setHeight() {
  mh = $('#main').height();
  rh = $('#results').height();
  baseHeight = Math.max(mh,rh);
  $('#container')
    .add('#main')
    .add('#results')
    .height(baseHeight);
}
function randomIcons(){
  n = Math.floor(Math.random()*20)+1;
  $('#male-icon').attr('src', '/assets/img/avatar-man-'+n+'.svg');
  n = Math.floor(Math.random()*15)+1;
  $('#female-icon').attr('src', '/assets/img/avatar-woman-'+n+'.svg');
}
function moveTo(target){
  if(target == '#results'){
    y = - baseHeight;
  } else {
    y = 0;
  }
  $('#main').css('margin-top', y);
  $('#main')
    .add('#results')
    .toggleClass('waiting');
}
function showResults(){
  mn = Number($('#men').val());
  wn = Number($('#women').val());
  t = mn + wn;
  $('#total').html(t);
  $('#total-men').html(mn);
  $('#total-women').html(wn);
  $('#male-icon').attr('title', mn+' homens');
  $('#female-icon').attr('title', wn+' mulheres');
  randomIcons();
  moveTo('#results');
}
function checkItem(item){
  $(item)
    .add(item+'>.unity>a.checkbox')
    .toggleClass('active');
}
var core = {
  init:function(){
    $('#men').focus();
    setHeight();
    $('#number-of .actions>a.plus').click(function(){
      input = $(this).attr('href');
      v = $(input).val() ? $(input).val() : 0;
      if($(input).val()<$(input).attr('max')){v++;}
      $(input).val(v);
      return false;
    });
    $('#number-of .actions>a.minus').click(function(){
      input = $(this).attr('href');
      v = $(input).val() ? $(input).val() : 0;
      if($(input).val()>0){v--;}
      $(input).val(v);
      return false;
    });
    $('#number-of').submit(function(){
      showResults();
      return false;
    });
    $('#results .reset-form').click(function(){
      moveTo('#main')
      return false;
    });
    $('#items>.item>.unity>a.checkbox').click(function(){
      checkItem($(this).attr('href'));
      return false;
    })
  }
}
$(function(){
  core.init();
})