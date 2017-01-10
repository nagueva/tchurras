var item = {};
var ms = [
  'homens',
  'carinhas',
  'camaradas',
  'queridões',
  'skywalkers',
  'garotos',
  'manos',
  'manolos',
  'amigos'
];
var ws = [
  'mulheres',
  'queridinhas',
  'amigas',
  'garotas',
  'minas',
  'lindas',
  'amigas'
];
var errors = [
  'Opa, esse churrasco precisa ter pelo menos uma pessoa.',
  'Ops, você precisa informar um número válido.'
];
var mh = $('#main').height();
var rh = $('#results').height();
var baseHeight = Math.max(mh,rh);
function setHeight() {
  $('#container')
    .add('#main')
    .add('#results')
    .height(baseHeight);
}
function randomIcons(){
  var n = Math.floor(Math.random()*18)+1;
  $('#male-icon').attr('src', '/assets/img/avatar-man-'+n+'.svg');
  var n = Math.floor(Math.random()*14)+1;
  $('#female-icon').attr('src', '/assets/img/avatar-woman-'+n+'.svg');
}
function moveTo(target){
  if(target == '#results'){
    var y = -1*baseHeight;
  } else {
    var y = 0;
  }
  $('#main').css('margin-top', y);
  $('#main')
    .add('#results')
    .toggleClass('waiting');
}
function validate() {
  if($('#men').is(':invalid')||$('#women').is(':invalid')){
    showErrors(1);
  } else{
    var mn = Number($('#men').val());
    var wn = Number($('#women').val());
    if(mn==0&&wn==0){
      showErrors(0);
    } else {
      $('html, body').animate({scrollTop: 0}, 500);
      $('#form-msgs').slideUp();
      showResults(mn, wn);
    }        
  }
}
function showErrors(code){
  $('#form-msgs').html(errors[code]).slideDown();
  if(code==0){
    var target = $('#men');
  } else if(code = 1){
    var target = $('#men:invalid').add('#women:invalid');
  }
  target.focus();
}
function showResults(mn, wn){
  window.history.pushState('new-url', 'Number of participants', '/#!m'+mn+'w'+wn);
  $('#link').val(window.location.href);
  item['meat'] = (.350*mn)+(.250*wn);
  item['sausage'] = (.150*mn)+(.100*wn);
  item['bread'] = (2*mn)+(1*wn);
  item['beer'] = (1.5*mn)+(.700*wn);
  item['soda'] = (.500*mn)+(.750*wn);
  item['charcoal'] = (.300*mn)+(.250*wn);
  // item[''] = (*mn)+(*wn);
  var t = mn + wn;
  $('#total').html(t);
  $('#total-men').html(mn);
  $('#total-women').html(wn);
  randomIcons();
  $('#male-icon').attr('title', mn+' '+ms[Math.floor(Math.random() * ms.length)]);
  $('#female-icon').attr('title', wn+' '+ws[Math.floor(Math.random() * ws.length)]);
  $.each(item, function(index, value) { 
    $('#'+index+'>.unity>span.value').html(Math.round(value*100)/100);
  });
  moveTo('#results');
  $('#form-msgs').slideUp();
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
    var url = window.location.href.split('#!')[1];
    if(url){
      var mn = url.replace('m','').split('w')[0];
      var wn = url.split('w')[1];
      $('#men').val(mn);
      $('#women').val(wn);
      validate();
    }
    $(document).foundation();
    $('#number-of .actions>a.plus').click(function(){
      var input = $(this).attr('href');
      var v = $(input).val() ? $(input).val() : 0;
      if($(input).val()<$(input).attr('max')){v++;}
      $(input).val(v);
      return false;
    });
    $('#number-of .actions>a.minus').click(function(){
      var input = $(this).attr('href');
      var v = $(input).val() ? $(input).val() : 0;
      if($(input).val()>0){v--;}
      $(input).val(v);
      return false;
    });
    $('#number-of').submit(function(){
      validate();
      return false;
    });
    $('#results .reset-form').click(function(){
      moveTo('#main');
      $('html, body').animate({scrollTop: 0}, 500);
      window.history.pushState('reset-url', 'Original URL', '/');
      $('#items>.item')
        .add('#items>.item>.unity>a.checkbox')
        .removeClass('active');
      return false;
    });
    $('#items>.item>.unity>a.checkbox').click(function(){
      checkItem($(this).attr('href'));
      return false;
    });
    $('#link').click(function(){
      $(this).select();
    })
  }
}
$(function(){
  core.init();
})
$(document).on('open.zf.reveal', function () {
  $('#link').select();
});