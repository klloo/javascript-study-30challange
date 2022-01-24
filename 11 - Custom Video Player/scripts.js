const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playButton = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
// data-skip속성이 있는 요소 가져오기 
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
    // 정지면 play, 재생중이면 pause함수 실행
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateIcon() {
    const icon = video.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
}
function handleProgress() {
    const progressRate = (video.currentTime/video.duration) * 100;
    // 플렉스 아이템의 초기 크기를 지정
    progressFilled.style.flexBasis = `${progressRate}%`;
}
function handleSkip() {
    // data-skip 속성에 지정된 값만큼 skip
    const skipSec = this.dataset.skip;
    video.currentTime += parseFloat(skipSec);
}
function handleRange() {
    // video의 volume or playbackRate 속성을 현재 선택한 값으로 설정
    video[this.name] = this.value;
}
function scrub(e) {
    const pointTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = pointTime;
}

video.addEventListener('timeupdate',handleProgress);
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateIcon);
video.addEventListener('pause',updateIcon);

playButton.addEventListener('click',togglePlay);
skipButtons.forEach((button)=>button.addEventListener('click',handleSkip));
ranges.forEach((range)=>range.addEventListener('change',handleRange));
ranges.forEach((range)=>range.addEventListener('mousemove',handleRange));

progress.addEventListener('click',scrub);
let mousedown = false;
// 매개변수로 이벤트 객체 전달. 먼저 화살표 함수에서 e 객체 받아서 전달
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);