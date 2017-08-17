// Utils

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return 'drift-' + text;
}

// Draw

$('.dr').each(function(i) {
  var $input = $(this).find(":checkbox");
  $input.addClass('drift draw');
  var id = makeId();
  $input.attr('id', id);

  var newLabel = '<label for=' + id + '><span></span>' + $(this).text().trim() + '</label>'
  var $input = $(this).children()[0];

  $(this).html($input);
  $(this).append(newLabel);
});



// Wiggle
var driftHTML = $('.drift.wiggle').html();
var driftHTML2 = '<span class="wiggleText wiggleStatic">' + driftHTML + '</span>';
$('.drift.wiggle').html(driftHTML2);

$('.drift.wiggle').on('click', function(e) {
  var target = $(this).find('.wiggleText');
  target.addClass('wiggleAnimate').delay(300).queue(function(next) {
    target.removeClass('wiggleAnimate');
    next();
  })

});

// Sliding animation
$('.slide').click(function() {
  // $(this).toggleClass('slideAnimate');
  $(this).addClass('slideAnimate').delay(400).queue(function(next) {
    $(this).removeClass('slideAnimate');
    next();
  })
});


// Bounce
$('.bounce').click(function() {
  $(this).addClass('bounceAnimate').delay(300).queue(function(next) {
    $(this).removeClass('bounceAnimate');
    next();
  });
});

// Glow
// $('.glow').click(function() {
//   $(this).addClass('glowAnimate').delay(300).queue(function(next) {
//     $(this).removeClass('glowAnimate');
//     next();
//   });
// });

$('input.glow:checkbox').click(function() {
  if (this.checked) {
    $(this).addClass('glowAnimate').delay(300).queue(function(next) {
      $(this).removeClass('glowAnimate');
      next();
    });
  }
})
