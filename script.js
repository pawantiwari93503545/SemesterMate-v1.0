/* =========================
   SEMESTERMATE SCRIPT.JS
========================= */

/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        }
    });
}

/* =========================
   ATTENDANCE PREDICTOR
========================= */

function classesNeededForTarget(attended, total, targetPercent) {

    let x = 0;

    while (((attended + x) / (total + x)) * 100 < targetPercent) {
        x++;
    }

    return x;
}

function attendancePredictor() {

    const total = parseInt(
        document.getElementById("totalClasses").value
    );

    const attended = parseInt(
        document.getElementById("attendedClasses").value
    );

    const result = document.getElementById("attendanceResult");

    if (
        isNaN(total) ||
        isNaN(attended) ||
        total <= 0 ||
        attended < 0 ||
        attended > total
    ) {
        result.innerHTML =
            "❌ Please enter valid values.";
        return;
    }

    const attendance =
        (attended / total) * 100;

    let canMiss = 0;

    while (
        (attended / (total + canMiss + 1)) * 100 >= 75
    ) {
        canMiss++;
    }

    const need70 =
        classesNeededForTarget(attended, total, 70);

    const need75 =
        classesNeededForTarget(attended, total, 75);

    const need80 =
        classesNeededForTarget(attended, total, 80);

    const need85 =
        classesNeededForTarget(attended, total, 85);

    result.innerHTML = `
        <h3>📊 Attendance Report</h3>

        <p><strong>Current Attendance:</strong>
        ${attendance.toFixed(2)}%</p>

        <p><strong>Classes Needed for 70%:</strong>
        ${need70}</p>

        <p><strong>Classes Needed for 75%:</strong>
        ${need75}</p>

        <p><strong>Classes Needed for 80%:</strong>
        ${need80}</p>

        <p><strong>Classes Needed for 85%:</strong>
        ${need85}</p>

        <p><strong>Classes You Can Miss:</strong>
        ${canMiss}</p>
    `;
}

/* =========================
   CGPA CALCULATOR
========================= */

function calculateCGPA() {

    const sgpas = [];

    for (let i = 1; i <= 4; i++) {

        const value =
            parseFloat(
                document.getElementById(`sgpa${i}`).value
            );

        if (!isNaN(value)) {
            sgpas.push(value);
        }
    }

    const result =
        document.getElementById("cgpaResult");

    if (sgpas.length === 0) {

        result.innerHTML =
            "❌ Enter at least one SGPA.";
        return;
    }

    const total =
        sgpas.reduce((a, b) => a + b, 0);

    const cgpa =
        total / sgpas.length;

    const percentage =
        (cgpa - 0.75) * 10;

    let grade = "C";

    if (cgpa >= 9) {
        grade = "A+";
    } else if (cgpa >= 8) {
        grade = "A";
    } else if (cgpa >= 7) {
        grade = "B";
    }

    result.innerHTML = `
        <h3>🎓 CGPA Report</h3>

        <p><strong>CGPA:</strong>
        ${cgpa.toFixed(2)}</p>

        <p><strong>Percentage:</strong>
        ${percentage.toFixed(2)}%</p>

        <p><strong>Grade:</strong>
        ${grade}</p>
    `;
}

/* =========================
   PERCENTAGE CALCULATOR
========================= */

function calculatePercentage() {

    const obtained =
        parseFloat(
            document.getElementById("obtainedMarks").value
        );

    const total =
        parseFloat(
            document.getElementById("totalMarks").value
        );

    const result =
        document.getElementById("percentageResult");

    if (
        isNaN(obtained) ||
        isNaN(total) ||
        total <= 0
    ) {
        result.innerHTML =
            "❌ Enter valid marks.";
        return;
    }

    const percentage =
        (obtained / total) * 100;

    result.innerHTML = `
        <h3>📈 Percentage Result</h3>

        <p><strong>Percentage:</strong>
        ${percentage.toFixed(2)}%</p>
    `;
}

/* =========================
   TARGET CGPA CALCULATOR
========================= */

function targetCGPA() {

    const current =
        parseFloat(
            document.getElementById("currentCGPA").value
        );

    const target =
        parseFloat(
            document.getElementById("targetCGPA").value
        );

    const remaining =
        parseInt(
            document.getElementById("remainingSems").value
        );

    const result =
        document.getElementById("targetResult");

    if (
        isNaN(current) ||
        isNaN(target) ||
        isNaN(remaining) ||
        remaining <= 0
    ) {
        result.innerHTML =
            "❌ Enter valid values.";
        return;
    }

    const requiredSGPA =
        target + (target - current);

    result.innerHTML = `
        <h3>🎯 Target CGPA Report</h3>

        <p>
        Required Average SGPA:
        <strong>${requiredSGPA.toFixed(2)}</strong>
        </p>
    `;
}

/* =========================
   POMODORO TIMER
========================= */

let timeLeft = 25 * 60;
let timerInterval = null;

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {

    if (timerInterval) return;

    timerInterval = setInterval(() => {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            alert("🍅 Pomodoro Session Completed!");

            return;
        }

        timeLeft--;
        updateTimerDisplay();

    }, 1000);
}

function pauseTimer() {

    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();
}

updateTimerDisplay();

/* =========================
   SEMESTER COUNTDOWN
========================= */

function calculateCountdown() {

    const dateValue =
        document.getElementById("examDate").value;

    const result =
        document.getElementById("countdownResult");

    if (!dateValue) {

        result.innerHTML =
            "❌ Please select a date.";

        return;
    }

    const examDate =
        new Date(dateValue);

    const today =
        new Date();

    const difference =
        examDate - today;

    const days =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

    if (days < 0) {

        result.innerHTML =
            "⚠️ Selected date has already passed.";

        return;
    }

    result.innerHTML = `
        <h3>📅 Countdown</h3>

        <p>
        Days Remaining:
        <strong>${days}</strong>
        </p>
    `;
}