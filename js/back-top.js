$(function(){ 
  $(window).scroll(function(){
    //var $(window).scrollTop(); 為 scroll
    var scroll = $(window).scrollTop();  
    if( scroll >= 70){
      // 當卷軸超過70px,.goTop就淡入，如果小於就淡出
      $(".goTop").fadeIn();      
    }else{      
      $(".goTop").fadeOut(); 
    }
  });
  // 當我按下.goTop時，添加動畫讓卷軸跑道最上面
  $('.goTop').click(function(){
    $('html,body').animate({
      scrollTop:$('html').offset().top
    })  
    return false;
  });
})