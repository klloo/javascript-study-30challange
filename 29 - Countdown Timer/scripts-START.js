const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const customForm = document.customForm;

let countDown;

function timer(seconds) {
  clearInterval(countDown);

  const now = Date.now();
  const be = now + seconds * 1000;

  displayTimer(seconds);
  displayEndtime(be);

  countDown = setInterval(()=>{
    const remainSeconds = Math.round((be - Date.now())/1000);
    if(remainSeconds < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimer(remainSeconds);
  }, 1000);
}

function displayTimer(seconds) {
  const min = Math.floor(seconds/60);
  const sec = String(seconds%60).padStart(2,0);
  const timeText = `${min} : ${sec}`;
  timerDisplay.textContent = timeText;
  document.title = timeText;
}

function displayEndtime(timestamp) {
  const endDatetime = new Date(timestamp);
  const hour = endDatetime.getHours();
  const min = String(endDatetime.getMinutes()).padStart(2,0);
  endTime.textContent = `${hour} : ${min}`;
}

function setTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener('click',setTimer);
});

customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const seconds = parseInt(this.minutes.value) * 60;
  timer(seconds);
  this.reset();
});