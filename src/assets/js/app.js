function mark(item){
  $(item)
    .add(item+'>.unity>a.checkbox')
    .toggleClass('active');
}
var core = {
  init:function(){
    console.log('init:starting');
    $('#number-of .actions>a.plus').click(function(){
      return false;
    });
    $('#number-of .actions>a.minus').click(function(){
      return false;
    });
    $('#number-of').submit(function(){
      return false;
    });
    $('#items>.item>.unity>a.checkbox').click(function(){
      mark($(this).attr('href'));
      return false;
    })
    console.log('init:ok!');
  }
}
$(function(){
  core.init();
})