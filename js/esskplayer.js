if (!(typeof Function.prototype.bind == 'function')) {
	Function.prototype.bind = function (bind) {
    	var self = this;
    	return function () {
        	var args = Array.prototype.slice.call(arguments);
        	return self.apply(bind || null, args);
    	};
	};
}

function Esskplayer(src, opts){

	this.container = document.createElement('div');
	this.container.className = 'esskplayer_vidContainer';

	if(Modernizr.video){
		this.video = document.createElement('video');
		this.src = src;
		this.video.src = src;
		//this.video.controls=true;  //take me out!
		this.elasped = null;
		this.duration=null;
		this.readyCheck=null; //timer
		this.updateElapsed=null; //timer
		
		
		//events
		

		//divs and stuffs
		this.container.appendChild(this.video);
		this.playPauseButton = null;
		this.showElasped = null;
		this.showDuration = null;
		this.controls_bottom = null;
		this.rewindButton = null;
		this.muteButton = null;
		this.scrubContainer=null;
		this.scrubBar = null;
		this.scrubPlayed=null;
		this.scrubLoaded = null;
		
		
		console.log("end of setup, src="+this.src);
		
		var that = this;	
		var mkPlayPause = function(){
			if (!that.playPauseButton){
			that.playPauseButton = document.createElement('div');
			that.playPauseButton.className = 'esskplayer_Play';
			that.playPauseButton.onclick = that.playPause.bind(that);
			}
		return that.playPauseButton;
		}
		
		var mkShowElapsed= function(){
			if (!that.showElapsed){
			that.showElapsed = document.createElement('div');
			that.showElapsed.className = 'esskplayer_showElapsed';
			
			that.showElapsed.innerHTML = that.formatSecondsAsTime(0) + ' /' ;
			}
			return that.showElapsed;
		}
		
		var mkShowDuration= function(){
			if (!that.showDuration){
			that.showDuration = document.createElement('div');
			that.showDuration.className = 'esskplayer_showDuration';
			
			that.showDuration.innerHTML = '--:--' ;
			}
			return that.showDuration;
		}
		
		var mkRewind= function(){
			if (!that.rewindButton){
			that.rewindButton = document.createElement('div');
			that.rewindButton.className = 'esskplayer_rewindButton';
			that.rewindButton.onclick = that.rewind.bind(that);
			}
			return that.rewindButton;
		}
		
		var mkMuteButton= function(){
			if (!that.muteButton){
			that.muteButton = document.createElement('div');
			that.muteButton.className = 'esskplayer_not_muted';
			that.muteButton.onclick = that.mute.bind(that);
			}
			return that.muteButton;
		}
		
		
		var mkControlsBottom= function(){
			if (!that.controlsBottom){
			that.controlsBottom = document.createElement('div');
			that.controlsBottom.className = 'esskplayer_controlsBottom';
			that.controlsBottom.appendChild(mkPlayPause());
			that.controlsBottom.appendChild(mkRewind());
			that.controlsBottom.appendChild(mkShowElapsed());
			that.controlsBottom.appendChild(mkShowDuration());
			that.controlsBottom.appendChild(mkMuteButton());
			}
			return that.controlsBottom;
		}
		

		
		var mkScrubPlayed= function(){
			if (!that.scrubPlayed){
			that.scrubPlayed = document.createElement('div');
			that.scrubPlayed.innerHtml = ' ';
			that.scrubPlayed.className = 'esskplayer_scrubPlayed';
			}
			return that.scrubPlayed;
		}
		
		var mkScrubLoaded= function(){
			if (!that.scrubLoaded){
			that.scrubLoaded = document.createElement('span');
			that.scrubLoaded.className = 'esskplayer_scrubLoaded';
			}
			return that.scrubLoaded;
		}
		
		var mkScrubBar= function(){
			if (!that.scrubBar){
			that.scrubBar = document.createElement('div');
			that.scrubBar.className = 'esskplayer_scrubBar';
			
			
			that.scrubBar.onclick = function (e){  //inline function as binding seems to stop event passing to the prototyped method
					that.video.currentTime = that.video.duration*(e.offsetX/that.scrubBar.offsetWidth);
					that.getElapsed();
					//console.log(newTime);
				}	
			that.scrubBar.appendChild(mkScrubPlayed());
			that.scrubBar.appendChild(mkScrubLoaded());
			}
			return that.scrubBar;
		}	
		
		var mkScrubContainer= function(){
			if (!that.scrubContainer){
			that.scrubContainer = document.createElement('div');
			that.scrubContainer.className = 'esskplayer_scrubContainer';
			that.scrubContainer.appendChild(mkScrubBar());

			}
			return that.scrubContainer;
		}
		

		
		//this goes last
		this.container.appendChild(mkScrubContainer());
		this.container.appendChild(mkControlsBottom());
		this.readyCheck = window.setInterval(this.setDuration.bind(this),500);
		
		//console.log(this);
		}
		else{
	
		this.container.innerHTML = 	'<OBJECT CLASSID="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"' +
									'CODEBASE="http://www.apple.com/qtactivex/qtplugin.cab" WIDTH="160" HEIGHT="136" >'+
									'<PARAM NAME="src" VALUE="'+ src +'" >' +
									'<EMBED SRC="'+ src +'" TYPE="video/mp4"' + 
									'PLUGINSPAGE="http://www.apple.com/quicktime/download" WIDTH="160" HEIGHT="136" ></EMBED>' +
									'</OBJECT>';
		}
	}
	
	Esskplayer.prototype = {
	  playPause: function (){
		console.log(this);
		if (this.video.paused){
		this.video.play();
		this.playPauseButton.className = "esskplayer_Pause";
		this.updateElapsed= window.setInterval(this.getElapsed.bind(this),1000);
		console.log("starting updateElapsed");
		}else{
		this.video.pause();
		clearInterval(this.updateElapsed); 
		//console.log("stopping updateElapsed");
		this.playPauseButton.className = "esskplayer_Play";
		}
	},
	
	
	mute: function (){
		if (this.video.muted){
		this.video.muted = false;
		this.muteButton.className= 'Esskplayer_not_muted';
		}else{
		this.video.muted = true;
		this.muteButton.className = 'Esskplayer_muted';
		}
	},
	
	  rewind: function (){;
		if (this.video.paused){
		this.video.currentTime = 0;
		}else{
		this.video.pause();
		this.video.currentTime = 0;
		}
		this.getElapsed();
		this.playPauseButton.className = "esskplayer_Play";
	clearInterval(this.updateElapsed); 
	},

	getElapsed: function(){
		if (this.video.currentTime >= this.video.duration){
			this.video.pause();
			this.playPauseButton.className = "esskplayer_Play";
			clearInterval(this.updateElapsed);
		}
		//console.log("get elapsed got called for "+this.src);
		this.elapsed = Math.round(this.video.currentTime);
		
		this.showElapsed.innerHTML =  this.formatSecondsAsTime(this.elapsed) + ' /';
		var percentPlayed = (this.video.currentTime/this.video.duration) * 100;
		this.scrubPlayed.style.width = percentPlayed + '%';
	
	//	console.log("updateElapsed: " + percentPlayed);
	},

	setDuration: function(){
		if (this.video.readyState==4){
			this.duration = Math.round(this.video.duration);
			this.showDuration.innerHTML =  this.formatSecondsAsTime(this.duration);
			clearInterval(this.readyCheck);
			console.log('duration set! ' + this.video.duration);
		
		}
		//console.log("ready checking..");
	},
	
	formatSecondsAsTime: function (secs) {
		var hr  = Math.floor(secs / 3600);
		var min = Math.floor((secs - (hr * 3600))/60);
		var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

		if (hr < 10)   { hr    = "0" + hr; }
		if (min < 10) { min = "0" + min; }
		if (sec < 10)  { sec  = "0" + sec; }
		if (hr)            { hr   = "00"; }

		if(secs >= 3600){
			return hr + ':' + min + ':' + sec;
		} else {
			return min + ':' + sec;
		}
	},
}
	

