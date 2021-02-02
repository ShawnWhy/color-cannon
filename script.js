
var currentColor={
    One:0,
    Two:0,
    Three:0
}
var beamArray=[];
var lever='off'
var producePallet = function(){
    var Pallet = $('<div>');
    $(Pallet).addClass('pallet');
    $(Pallet).addClass('palletJump');
    $(Pallet).css('background-color','rgb('+currentColor.One+','+currentColor.Two+','+currentColor.Three+')')
    $('.magazine').append(Pallet);
}

var displayEmpty=function(){
    var Pallet = $('<div>');
    $(Pallet).addClass('pallet');
    $(Pallet).addClass('palletJump');
    $(Pallet).html('NO AMMO')
    $('.magazine').append(Pallet);
    setTimeout(() => {
        $('.magazine').html('');
    }, 1000);

}

var roulette = function(number, lightcolor, darkcolor){
    var rand = Math.floor(Math.random()*250);
    currentColor[number]=rand;
    setTimeout(() => {

        $('.rotator'+number+' .screenOne').css('background-color', lightcolor)
        $('.rotator'+number+' .screenTwo').css('background-color',darkcolor)
        $('.rotator'+number+' .screenThree').css('background-color',darkcolor)
        setTimeout(() => {
            $('.rotator'+number+' .screenTwo').css('background-color',lightcolor)
            $('.rotator'+number+' .screenOne').css('background-color',darkcolor)
            $('.rotator'+number+' .screenThree').css('background-color',darkcolor)
            setTimeout(() => {
                $('.rotator'+number+' .screenThree').css('background-color',lightcolor)
                $('.rotator'+number+' .screenTwo').css('background-color',darkcolor)
                $('.rotator'+number+' .screenOne').css('background-color',darkcolor)
                setTimeout(() => {
                    $('.rotator'+number+' .screenOne').css('background-color',lightcolor)
                    $('.rotator'+number+' .screenTwo').css('background-color',darkcolor)
                    $('.rotator'+number+' .screenThree').css('background-color',darkcolor)
                    setTimeout(() => {
                        $('.rotator'+number+' .screenTwo').css('background-color',lightcolor)
                        $('.rotator'+number+' .screenOne').css('background-color',darkcolor)
                        $('.rotator'+number+' .screenThree').css('background-color',darkcolor)
                        $('.rotator'+number+' .screenTwo').html(rand);
                }, 100);
            }, 100);
        }, 100);
    }, 100);
}, 100);
      

}

var rotation;

$(document).ready(function() {
    // the same as yours.
    function rotateOnMouse(e, pw) {

        var offset = pw.offset();
        console.log(offset);
        var center_x =  105;
        var center_y = 315;
        var mouse_x = e.pageX;
        var mouse_y = e.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 10;
        //            window.console.log("de="+degree+","+radians);
        if(degree>0&&degree<170){
        lever='on'
        rotation=degree;
        $(pw).css('transform', 'rotate(' + degree + 'deg)');
        }// $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
        // $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
        // $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');
    }
  
    $('.round').mousedown(function(e) {
      e.preventDefault(); // prevents the dragging of the image.
      $(document).on('mousemove', function(e2) {
        rotateOnMouse(e2, $('.bar'));
      });
    });
  
    $(document).mouseup(function(e) {

      $(document).off('mousemove');
      if(lever==='on'){
      if(rotation<30){
      $('.bar').css('transform','rotate(0deg)')
      }
      else{
        $('.bar').css('transform','rotate('+rotation/2+'deg)')

      setTimeout(() => {
        $('.bar').css('transform','rotate(0deg)')
        }, rotation/4);
      }
      if(rotation>30){
          roulette("One","pink",'darkred')
          setTimeout(() => {
            roulette("Two","lightgreen",'darkgreen')
            setTimeout(() => {
                roulette("Three","lightblue",'darkblue')
                    setTimeout(() => {
                        lever='off'


                        producePallet()
                        console.log(lever)                        
                    },500);
                }, 100);
            }, 100);
         }
    }});
});

$(document).on('click','.pallet',function(e) {
e.preventDefault();
e.stopPropagation();
$(e.target).remove();
})

var fire = function(){


    $('.beam').html('')

    var colorArray = $('.pallet');
    var arraylength = colorArray.length;
    if (arraylength>0){
        $('.beamContainer').addClass('beamGrow')
        for(i=0;i<40;i++){
            var rand = Math.floor(Math.random()*arraylength)
            var color = $(colorArray[rand]).css('background-color')
            var beam = $('<div>');
            $(beam).addClass('beamStreak');
            $(beam).css('background-color',color);
            $('.beam').append(beam)
            beamArray.push(color);
            // $('.veil').append(beam)
}
        setTimeout(() => {
            $('.beamContainer').removeClass('beamGrow')
        }, 5000);
        setTimeout(() => {
            $('.veil').addClass('veilOver')
            for(i=0;i<beamArray.length;i++){
                var rand = Math.random()*5
                var frontBeam = $("<div>");
                $(frontBeam).addClass('frontStreak')
                $(frontBeam).css('background-color',beamArray[i]);
                $(frontBeam).css('animation',"frontStreak "+rand+'s both');
                $('.veil').append(frontBeam);
            }
        }, 500);
    }
    else{
        displayEmpty()
    }
}




$('.fireButton').mousedown(function(e){
    $('.fireButton').css('transform','scaleY(.5)')
    $('.fireButton p').addClass('invisibleP')
    fire();


})
$(document).mouseup(function(e){
    $('.fireButton').css('transform','scaleY(1)')
    $('.fireButton p').removeClass('invisibleP')

})

