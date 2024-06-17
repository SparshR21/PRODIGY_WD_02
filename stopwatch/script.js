let timer;
let isRunning = false;
let isStopped = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 1;

function updateTime() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  const display = document.querySelector('.display');
  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStop() {
  if (!isRunning && !isStopped) {
    timer = setInterval(updateTime, 1000);
    document.getElementById('startStop').textContent = 'Stop';
    isRunning = true;
  } else if (isRunning && !isStopped) {
    clearInterval(timer);
    document.getElementById('startStop').textContent = 'Resume';
    isRunning = false;
  } else if (!isRunning && isStopped) {
    timer = setInterval(updateTime, 1000);
    document.getElementById('startStop').textContent = 'Stop';
    isRunning = true;
    isStopped = false;
  }
}

function stop() {
  clearInterval(timer);
  document.getElementById('startStop').textContent = 'Resume';
  isRunning = false;
  isStopped = true;
}

function lap() {
  if (isRunning && !isStopped) {
    const lapsList = document.querySelector('.laps');
    const lapTime = document.querySelector('.display').textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCount++;
  }
}

function reset() {
  clearInterval(timer);
  document.querySelector('.display').textContent = '00:00:00';
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCount = 1;
  isRunning = false;
  isStopped = false;
  document.getElementById('startStop').textContent = 'Start';
  document.querySelector('.laps').innerHTML = '';
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('lap').addEventListener('click', lap);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);
