/* ==================================
   SEMESTERMATE V3
   POMODORO PRO
================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializePomodoro
);

/* ==================================
   GLOBAL VARIABLES
================================== */

let timerInterval = null;

let timeRemaining = 25 * 60;

let currentMode = "25-5";

let sessionCount = 0;

let isRunning = false;

/* ==================================
   CREATE UI
================================== */

function initializePomodoro() {

    const container =
        document.getElementById(
            "pomodoroHub"
        );

    if (!container) return;

    container.innerHTML = `

    <div class="tool-card">

        <h3>
            🍅 Pomodoro Pro
        </h3>

        <br>

        <div class="pomodoro-modes">

            <button
            onclick="setPomodoroMode('25-5')">

            25 / 5

            </button>

            <button
            onclick="setPomodoroMode('50-10')">

            50 / 10

            </button>

            <button
            onclick="setPomodoroMode('90-20')">

            90 / 20

            </button>

        </div>

        <br>

        <div class="timer-wrapper">

            <div
            id="timerDisplay"
            class="timer-display">

            25:00

            </div>

        </div>

        <br>

        <div class="quick-actions">

            <button
            onclick="startPomodoro()">

            ▶ Start

            </button>

            <button
            onclick="pausePomodoro()">

            ⏸ Pause

            </button>

            <button
            onclick="resetPomodoro()">

            🔄 Reset

            </button>

        </div>

        <br>

        <div
        id="sessionCounter">

        Sessions Completed:
        <strong>0</strong>

        </div>

        <br>

        <div
        id="pomodoroStatus">

        Ready to Focus 🚀

        </div>

    </div>

    `;

    requestNotificationPermission();

    updatePomodoroDisplay();

}

/* ==================================
   MODES
================================== */

function setPomodoroMode(mode) {

    currentMode = mode;

    switch(mode) {

        case "25-5":

            timeRemaining =
                25 * 60;

            break;

        case "50-10":

            timeRemaining =
                50 * 60;

            break;

        case "90-20":

            timeRemaining =
                90 * 60;

            break;

    }

    pausePomodoro();

    updatePomodoroDisplay();

    updateStatus(
        `Mode Selected: ${mode}`
    );

}

/* ==================================
   START TIMER
================================== */

function startPomodoro() {

    if (isRunning) return;

    isRunning = true;

    updateStatus(
        "Focus Session Running 🔥"
    );

    timerInterval =
        setInterval(() => {

            if (
                timeRemaining <= 0
            ) {

                completeSession();

                return;

            }

            timeRemaining--;

            updatePomodoroDisplay();

        }, 1000);

}

/* ==================================
   PAUSE TIMER
================================== */

function pausePomodoro() {

    clearInterval(
        timerInterval
    );

    timerInterval = null;

    isRunning = false;

    updateStatus(
        "Paused ⏸"
    );

}

/* ==================================
   RESET TIMER
================================== */

function resetPomodoro() {

    pausePomodoro();

    switch(currentMode) {

        case "25-5":

            timeRemaining =
                25 * 60;

            break;

        case "50-10":

            timeRemaining =
                50 * 60;

            break;

        case "90-20":

            timeRemaining =
                90 * 60;

            break;

    }

    updatePomodoroDisplay();

    updateStatus(
        "Reset 🔄"
    );

}

/* ==================================
   DISPLAY
================================== */

function updatePomodoroDisplay() {

    const display =
        document.getElementById(
            "timerDisplay"
        );

    if (!display) return;

    const minutes =
        Math.floor(
            timeRemaining / 60
        );

    const seconds =
        timeRemaining % 60;

    display.innerText =

        `${String(minutes)
            .padStart(2,"0")}:${String(seconds)
            .padStart(2,"0")}`;

}

/* ==================================
   SESSION COMPLETE
================================== */

function completeSession() {

    pausePomodoro();

    sessionCount++;

    updateSessionCounter();

    playAlarm();

    showNotification();

    updateStatus(
        "Session Completed 🎉"
    );

}

/* ==================================
   SESSION COUNTER
================================== */

function updateSessionCounter() {

    const counter =
        document.getElementById(
            "sessionCounter"
        );

    if (!counter) return;

    counter.innerHTML =

    `Sessions Completed:
    <strong>

    ${sessionCount}

    </strong>`;

}

/* ==================================
   STATUS
================================== */

function updateStatus(text) {

    const status =
        document.getElementById(
            "pomodoroStatus"
        );

    if (!status) return;

    status.innerText = text;

}

/* ==================================
   SOUND
================================== */

function playAlarm() {

    try {

        const audio =
        new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        );

        audio.play();

    }

    catch(error) {

        console.log(
            "Alarm unavailable"
        );

    }

}

/* ==================================
   NOTIFICATIONS
================================== */

function requestNotificationPermission() {

    if (
        "Notification"
        in window
    ) {

        Notification.requestPermission();

    }

}

function showNotification() {

    if (
        Notification.permission
        === "granted"
    ) {

        new Notification(

            "🍅 Pomodoro Complete",

            {

                body:
                "Great job! Time for a short break."

            }

        );

    }

}

/* ==================================
   DEMO
================================== */

function loadPomodoroDemo() {

    setPomodoroMode(
        "25-5"
    );

    updateStatus(
        "Demo Mode Loaded"
    );

}