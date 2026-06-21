/* ==================================
   SEMESTERMATE V3
   COUNTDOWN PRO
================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeCountdown
);

/* ==================================
   GLOBAL
================================== */

let countdownInterval = null;

/* ==================================
   UI
================================== */

function initializeCountdown() {

    const container =
        document.getElementById(
            "countdownHub"
        );

    if (!container) return;

    container.innerHTML = `

    <div class="tool-card">

        <h3>
            ⏳ Countdown Manager
        </h3>

        <br>

        <input
        type="text"
        id="eventName"
        placeholder="Event Name (Exam, Holiday, etc.)">

        <input
        type="datetime-local"
        id="eventDate">

        <button
        onclick="addCountdown()">

        Add Countdown

        </button>

        <button
        class="primary-btn"
        onclick="loadCountdownDemo()">

        Load Demo Events

        </button>

        <br><br>

        <div
        id="countdownCards">

        </div>

    </div>

    `;

    loadSavedCountdowns();

}

/* ==================================
   ADD EVENT
================================== */

function addCountdown() {

    const eventName =
        document.getElementById(
            "eventName"
        ).value.trim();

    const eventDate =
        document.getElementById(
            "eventDate"
        ).value;

    if (
        !eventName ||
        !eventDate
    ) {

        alert(
            "Please fill all fields."
        );

        return;
    }

    const countdowns =
        getCountdowns();

    countdowns.push({

        id: Date.now(),

        name: eventName,

        date: eventDate

    });

    saveCountdowns(
        countdowns
    );

    renderCountdowns();

    document.getElementById(
        "eventName"
    ).value = "";

}

/* ==================================
   STORAGE
================================== */

function getCountdowns() {

    return JSON.parse(

        localStorage.getItem(
            "semestermate-countdowns"
        )

    ) || [];

}

function saveCountdowns(data) {

    localStorage.setItem(

        "semestermate-countdowns",

        JSON.stringify(data)

    );

}

function loadSavedCountdowns() {

    renderCountdowns();

    startCountdownUpdater();

}

/* ==================================
   RENDER
================================== */

function renderCountdowns() {

    const container =
        document.getElementById(
            "countdownCards"
        );

    if (!container) return;

    const countdowns =
        getCountdowns();

    if (
        countdowns.length === 0
    ) {

        container.innerHTML = `

        <div class="result-box">

        No countdowns added yet.

        </div>

        `;

        return;
    }

    let html = "";

    countdowns.forEach(event => {

        html += `

        <div
        class="result-box"
        style="
        margin-bottom:15px;
        ">

            <h4>

            📅 ${event.name}

            </h4>

            <div
            id="countdown-${event.id}">

            Loading...

            </div>

            <br>

            <button
            onclick="deleteCountdown(${event.id})">

            Delete

            </button>

        </div>

        `;

    });

    container.innerHTML = html;

    updateCountdowns();

}

/* ==================================
   DELETE
================================== */

function deleteCountdown(id) {

    const countdowns =
        getCountdowns();

    const updated =
        countdowns.filter(

            item =>
            item.id !== id

        );

    saveCountdowns(
        updated
    );

    renderCountdowns();

}

/* ==================================
   LIVE UPDATE
================================== */

function startCountdownUpdater() {

    if (
        countdownInterval
    ) {

        clearInterval(
            countdownInterval
        );

    }

    countdownInterval =
        setInterval(

            updateCountdowns,

            1000

        );

}

function updateCountdowns() {

    const countdowns =
        getCountdowns();

    countdowns.forEach(event => {

        const target =
            new Date(
                event.date
            ).getTime();

        const now =
            Date.now();

        const difference =
            target - now;

        const element =
            document.getElementById(

                `countdown-${event.id}`

            );

        if (!element) return;

        if (
            difference <= 0
        ) {

            element.innerHTML =

            `🎉 Event Started!`;

            return;
        }

        const days =
            Math.floor(

                difference /
                (1000 * 60 * 60 * 24)

            );

        const hours =
            Math.floor(

                (difference %
                (1000 * 60 * 60 * 24))

                /

                (1000 * 60 * 60)

            );

        const minutes =
            Math.floor(

                (difference %
                (1000 * 60 * 60))

                /

                (1000 * 60)

            );

        const seconds =
            Math.floor(

                (difference %
                (1000 * 60))

                /

                1000

            );

        element.innerHTML = `

        <strong>

        ${days}

        </strong> Days

        <br>

        <strong>

        ${hours}

        </strong> Hours

        <br>

        <strong>

        ${minutes}

        </strong> Minutes

        <br>

        <strong>

        ${seconds}

        </strong> Seconds

        `;

    });

}

/* ==================================
   DEMO EVENTS
================================== */

function loadCountdownDemo() {

    const demo = [

        {

            id:1,

            name:"Semester Exam",

            date:
            "2026-12-15T09:00"

        },

        {

            id:2,

            name:"Winter Break",

            date:
            "2026-12-25T00:00"

        },

        {

            id:3,

            name:"New Year",

            date:
            "2027-01-01T00:00"

        }

    ];

    saveCountdowns(
        demo
    );

    renderCountdowns();

}