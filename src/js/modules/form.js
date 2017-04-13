// module for manipulating / validating the form shared between options and
// popup views.  when 'Go!' button is pressed, structured info is passed to
// provided callback.
//
// no unit tests for this module, it is jQuery manipulation mostly.
//
import $ from 'jquery';

const form = {};
form.changeString = function (parent, val) {
  $("span.speed",parent).text('('+val+'x)')
}
form.init = (callback,arraySpeeds) => {
  $(() => {
  	form.changeSpeeds(arraySpeeds)

    $('#content input[type="range"]').on('change mousemove',($e)=>{
      var speed = $($e.target).val()
      form.changeString($($e.target).parent(),speed)
    })
    $('#content input[type="range"]').on('change',($e)=>{
      var speed = $($e.target).val()
      callback($($e.target).data('index'),speed)
    })
  });
};

form.changeSpeeds = (arraySpeeds) => {
	console.log('arraySpeeds',arraySpeeds)
	var content = 'Not videos found'
	if (arraySpeeds && arraySpeeds.length > 0) {
		content = ''
		for (var i = 0; i < arraySpeeds.length; i++) {
			content += `<fieldset id="video${i}">
			   <legend> Video <span class="speed"></span></legend>
			   <input data-index="${i}" type="range" min="0.1" max="2.0" step="0.1"  value="${arraySpeeds[i]}" />
			 </fieldset>`
		}
	}
	$('#content').html(content)
}

export default form;
