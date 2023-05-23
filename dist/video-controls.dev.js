"use strict";

var vsl = document.getElementById('vsl'),
    videoControls = vsl.querySelector('.controls'),
    video = vsl.querySelector('video'),
    playBtn = videoControls.querySelector('.play'),
    videoTime = videoControls.querySelector('.time'),
    videoProgressBar = videoControls.querySelector('.progress-bar'),
    videoProgress = videoProgressBar.querySelector('.progress'),
    videoLoader = videoProgressBar.querySelector('.loader'),
    videoPreloader = vsl.querySelector('.preloader'),
    videoFullScreen = videoControls.querySelector('.screen'),
    videoThumbnail = vsl.querySelector('.thumbnail-overlay');
var drag;

function showControls(event) {
  videoControls.classList.add('active');
}

function hideControls() {
  videoControls.classList.remove('active');
}

function loader(event) {
  switch (event.type) {
    case 'waiting':
      videoPreloader.classList.add('active');
      break;

    case 'playing':
      videoPreloader.classList.remove('active');
      break;
  }
}

function setFullScreen() {
  if (!document.webkitFullscreenElement) {
    vsl.webkitRequestFullscreen();
    videoFullScreen.querySelector('i.bx').classList.remove('bx-fullscreen');
    videoFullScreen.querySelector('i.bx').classList.add('bx-exit-fullscreen');
  } else {
    document.webkitExitFullscreen();
    videoFullScreen.querySelector('i.bx').classList.remove('bx-exit-fullscreen');
    videoFullScreen.querySelector('i.bx').classList.add('bx-fullscreen');
  }
}

function playVideo() {
  video.play();
  playBtn.querySelector('i.bx').classList.remove('bx-play');
  playBtn.querySelector('i.bx').classList.add('bx-pause');
  videoThumbnail.classList.remove('active');
  videoControls.classList.remove('active');
  setInterval(function () {
    updateTimer();

    if (video.currentTime >= video.duration - 60) {
      showButton();
    }
  }, 100);
}

function pauseVideo() {
  video.pause();
  playBtn.querySelector('i.bx').classList.remove('bx-pause');
  playBtn.querySelector('i.bx').classList.add('bx-play');
  videoControls.classList.add('active');
}

function setDrag(event) {
  if (event.type == 'mousedown') {
    drag = true;
  } else {
    drag = false;
  }
}

function seeker(event) {
  var mousePos = event.clientX - (document.body.clientWidth - vsl.clientWidth) / 2,
      pctBar = mousePos / videoProgressBar.clientWidth * 100;

  if (drag || event.type == 'click') {
    video.currentTime = video.duration * pctBar / 100;
  }
}

function convertSeconds(duration) {
  if (duration != undefined) {
    duration = Math.floor(duration);
    var hr, min, sec;
    hr = duration >= 3600 ? Math.floor(duration / 3600) : '';
    min = duration >= 60 ? Math.floor(duration / 60) : '0';
    sec = duration >= 60 ? duration - min * 60 : duration;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return "".concat(hr != '' ? hr + ':' : '').concat(min >= 60 ? '00' : min, ":").concat(sec) || '00:00';
  }
}

function updateTimer() {
  var bufferEnd = video.buffered.end(video.buffered.length - 1),
      pctSeek = video.currentTime / video.duration * 100,
      start = convertSeconds(video.currentTime),
      end = convertSeconds(video.duration);
  videoLoader.style.width = bufferEnd / video.duration * 100 + '%';
  videoProgress.style.width = pctSeek + '%';
  videoTime.innerHTML = start + ' | ' + end;
}

function play() {
  if (video.played.length != 0) {
    if (video.played.start(0) == 0 && !video.paused) {
      pauseVideo();
    } else {
      playVideo();
    }
  } else {
    playVideo();
  }
}

window.addEventListener('load', updateTimer);
videoProgressBar.addEventListener('mousedown', setDrag);
videoProgressBar.addEventListener('mouseup', setDrag);
videoProgressBar.addEventListener('mousemove', seeker);
videoProgressBar.addEventListener('click', seeker);
vsl.addEventListener('mousemove', function () {
  if (video.paused) {
    showControls();
  }
});
vsl.addEventListener('mouseout', function () {
  hideControls();

  if (video.paused) {
    videoThumbnail.classList.add('active');
  }
});
videoThumbnail.addEventListener('click', play);
video.addEventListener('waiting', loader);
video.addEventListener('playing', loader);
video.addEventListener('click', play);
video.addEventListener('dblclick', setFullScreen);
videoFullScreen.addEventListener('click', setFullScreen);
playBtn.addEventListener('click', play);