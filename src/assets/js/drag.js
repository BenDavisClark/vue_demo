/**
 *
 * 实现网页元素任意放大、缩小、拖拽、移动
 * @param fatherEl 父元素id
 * @param el 拖动点的id
 */
export  function  idrag(fatherEl,el){
  $(document).mousemove(function(e) {

    if (!!this.move) {
      var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
        callback = document.call_down || function() {
          $(this.move_target).css({
            'top': e.pageY - posix.y,
            'left': e.pageX - posix.x
          });
        };

      callback.call(this, e, posix);
    }
  }).mouseup(function(e) {
    if (!!this.move) {
      var callback = document.call_up || function(){};
      callback.call(this, e);
      $.extend(this, {
        'move': false,
        'move_target': null,
        'call_down': false,
        'call_up': false
      });
    }
  });

  var $box = $('#'+fatherEl).mousedown(function(e) {
    var offset = $(this).offset();
    var posLeft = $(this).position().left
    var posTop = $(this).position().top
    this.posix = {'x': e.pageX-posLeft, 'y': e.pageY - posTop};
    $.extend(document, {'move': true, 'move_target': this});
  }).on('mousedown', '#'+el, function(e) {
    var posix = {
      'w': $box.width(),
      'h': $box.height(),
      'x': e.pageX,
      'y': e.pageY
    };

    $.extend(document, {'move': true, 'call_down': function(e) {
        console.log($box.width())
        console.log($box.height())

        $box.css({
          'width': Math.max(30, e.pageX - posix.x + posix.w),
          'height': Math.max(30, e.pageY - posix.y + posix.h)
        });
      }});
    return false;
  });
}
