/* Start Fieldset functions */
var current_fs, next_fs, previous_fs; // fieldsets
var left, opacity, scale; // fieldset properties which we will animate
var animating; // flag to prevent quick multi-click glitches

$('.next').click(function () {

  $parentFieldsetId = $(this).closest('fieldset').attr('id');
  if ($parentFieldsetId == 'fieldset-1') {
    if (validateFieldset1() == false) {
      return false;
    }
  }
  else if ($parentFieldsetId == 'fieldset-2') {
    if (validateFieldset2() == false) {
      return false;
    }
  }

  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

	// activate next step on progressbar using the index of next_fs
  $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

	// show the next fieldset
  next_fs.show();
	// hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function (now, mx) {
      // as the opacity of current_fs reduces to 0 - stored in "now"
      // 1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      // 2. bring next_fs from the right(50%)
      left = (now * 50) + '%';
			// 3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'transform': 'scale(' + scale + ')'});
      next_fs.css({'left': left, 'opacity': opacity});
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
		// this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

$('.previous').click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

	// de-activate current step on progressbar
	$('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

	// show the previous fieldset
  previous_fs.show();
	// hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function (now, mx) {
			// as the opacity of current_fs reduces to 0 - stored in "now"
			// 1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
			// 2. take current_fs to the right(50%) - from 0%
      left = ((1 - now) * 50) + '%';
			// 3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'left': left});
      previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
		// this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

$('.submit').click(function () {
  return false;
});
/* End Fieldset functions */

/* Start Upload functions */
function handleFileSelect (evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('output').insertBefore(span, null);
        document.getElementById('fileinput-button').className = 'hidden';
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);
/* End Upload functions */

/* Start Form Validation functions */
function validateFieldset1()
{
  var $files = document.getElementById('files');
  if ($files.value == null || $files.value == '') {
      $('#fieldset-1 .subtitle').removeClass('invisible').addClass('error');
      //document.getElementById('fileinput-button').className = 'hidden';
      $files.focus();console.log('false');
      return false;
  }
  else {
    console.log('true');
  }
  return true;
}

function validateFieldset2()
{
  var $fname = document.getElementById('fname');
  var $fnameNotif = document.getElementById('fname-notif');
  if ($fname.value == null || $fname.value == '') {
      $fnameNotif.className = 'notif visible error';
      $fname.focus();
      return false;
  }
  else {
    $fnameNotif.className = 'notif invisible';
  }

  var $lname = document.getElementById('lname');
  var $lnameNotif = document.getElementById('lname-notif');
  if ($lname.value == null || $lname.value == '') {
      $lnameNotif.className = 'notif visible error';
      $lname.focus();
      return false;
  }
  else {
    $lnameNotif.className = 'notif invisible';
  }

  var $phone = document.getElementById('phone');
  var $phoneNotif = document.getElementById('phone-notif');
  if ($phone.value == null || $phone.value == '') {
      $phoneNotif.className = 'notif visible error';
      $phone.focus();
      return false;
  }
  else {
    $phoneNotif.className = 'notif invisible';
  }

  return true;
}
/* End Form Validation functions */
