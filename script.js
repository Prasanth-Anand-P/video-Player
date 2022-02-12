//----------------------------REQUIRED VARIABLES------------------------------------

const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const toggle=player.querySelector('.toggle')
const skippers = player.querySelectorAll('[data-skip]');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');

//-------------------REQUIRED FUNCTIONS----------------------------------------------------

function playPause(){
	if(video.paused){
		video.play();
	}
	else{
		video.pause();
	}
}

function updateButton() {
  const icon=this.paused?'►':'❚ ❚';
  toggle.textContent=icon;
}

function skip(){
	video.currentTime+=parseFloat(this.dataset.skip);
}


function timeLine(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//----------------------------DOMs---------------------------------------


video.addEventListener('click',playPause);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate',timeLine);

toggle.addEventListener('click',playPause);

skippers.forEach(btn=>btn.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);