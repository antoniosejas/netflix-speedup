import $ from 'jquery';
import handlers from './modules/handlers';
import msg from './modules/msg';

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

console.log('CONTENT SCRIPT WORKS!'); // eslint-disable-line no-console

msg.init('ct', {
	getVideos: function(what, done) { 
		var videos = []
		document.querySelectorAll('video').forEach(function(k,v){
			videos.push(k.playbackRate)
		})
		done(videos)
	},
	changeSpeedVideo: function (what, videoI, speed, done) {
		console.log('changing video rate to speed',what, videoI, speed)
		console.log('videos', $('video')); // eslint-disable-line no-console

		$('video')[videoI].playbackRate = speed
		done('yay !! speed setted',speed)
	}
});

console.log('jQuery version2:', $().jquery); // eslint-disable-line no-console
