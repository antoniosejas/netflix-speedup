import handlers from './modules/handlers';
import msg from './modules/msg';
import form from './modules/form';
import runner from './modules/runner';

import $ from 'jquery';

// here we use SHARED message handlers, so all the contexts support the same
// commands. but this is NOT typical messaging system usage, since you usually
// want each context to handle different commands. for this you don't need
// handlers factory as used below. simply create individual `handlers` object
// for each context and pass it to msg.init() call. in case you don't need the
// context to support any commands, but want the context to cooperate with the
// rest of the extension via messaging system (you want to know when new
// instance of given context is created / destroyed, or you want to be able to
// issue command requests from this context), you may simply omit the
// `handlers` parameter for good when invoking msg.init()

console.log('POPUP SCRIPT WORKS!'); // eslint-disable-line no-console

// form.init(runner.go.bind(runner, msg.init('popup', handlers.create('popup'))));
var msgPopup = msg.init('popup', {
  // ping: function(done) { done('pong'); }
})


var initFormCallBack = (speedI,speed) => {
		msgPopup.cmd(['ct'], 'changeSpeedVideo', 'I want you change the video I to speed', speedI, speed, (ok) =>
		{
		  console.log('changeSpeedVideo ok',ok)
		});
	}
msgPopup.cmd(['ct'], 'getVideos', 'I want array of videos and current speed !', (arraySpeeds) =>
{
  form.init(initFormCallBack,arraySpeeds)
});

