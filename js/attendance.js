/* ==================================
   SEMESTERMATE V3
   ATTENDANCE PREDICTOR PRO
================================== */

function attendancePredictor() {

    const total =
        parseInt(
            document.getElementById(
                "totalClasses"
            ).value
        );

    const attended =
        parseInt(
            document.getElementById(
                "attendedClasses"
            ).value
        );

    const result =
        document.getElementById(
            "attendanceResult"
        );

    /* ==========================
       VALIDATION
    ========================== */

    if (
        isNaN(total) ||
        isNaN(attended) ||
        total <= 0 ||
        attended < 0 ||
        attended > total
    ) {

        result.innerHTML = `

        <div class="result-box">

            ❌ Please enter valid values.

        </div>

        `;

        return;
    }

    /* ==========================
       CURRENT ATTENDANCE
    ========================== */

    const attendance =
        (attended / total) * 100;

    /* ==========================
       TARGET CALCULATIONS
    ========================== */

    const need70 =
        calculateClassesNeeded(
            attended,
            total,
            70
        );

    const need75 =
        calculateClassesNeeded(
            attended,
            total,
            75
        );

    const need80 =
        calculateClassesNeeded(
            attended,
            total,
            80
        );

    const need85 =
        calculateClassesNeeded(
            attended,
            total,
            85
        );

    const need90 =
        calculateClassesNeeded(
            attended,
            total,
            90
        );

    /* ==========================
       CAN MISS
    ========================== */

    const canMiss =
        calculateCanMiss(
            attended,
            total
        );

    /* ==========================
       STATUS
    ========================== */

    let status = "";
    let statusColor = "";

    if (attendance >= 85) {

        status = "Excellent";
        statusColor = "#10b981";

    } else if (attendance >= 75) {

        status = "Safe";
        statusColor = "#3b82f6";

    } else {

        status = "Shortage Risk";
        statusColor = "#ef4444";

    }

    /* ==========================
       RENDER RESULT
    ========================== */

    result.innerHTML = `

    <div class="result-box fade-in">

        <h3>
            📊 Attendance Report
        </h3>

        <br>

        <div class="progress-container">

            <div
            class="progress-bar"
            style="
            width:${attendance}%;
            background:${statusColor};
            ">
            </div>

        </div>

        <p>

            <strong>
            Current Attendance:
            </strong>

            ${attendance.toFixed(2)}%

        </p>

        <p>

            <strong>
            Status:
            </strong>

            <span
            style="
            color:${statusColor};
            font-weight:600;
            ">

            ${status}

            </span>

        </p>

        <hr
        style="
        margin:15px 0;
        ">

        <h4>
            🎯 Target Attendance
        </h4>

        <br>

        <p>
        70% → ${need70} Classes
        </p>

        <p>
        75% → ${need75} Classes
        </p>

        <p>
        80% → ${need80} Classes
        </p>

        <p>
        85% → ${need85} Classes
        </p>

        <p>
        90% → ${need90} Classes
        </p>

        <hr
        style="
        margin:15px 0;
        ">

        <p>

        😎
        <strong>

        Classes You Can Miss:

        </strong>

        ${canMiss}

        </p>

    </div>

    `;

}

/* ==================================
   TARGET ATTENDANCE CALCULATOR
================================== */

function calculateClassesNeeded(
    attended,
    total,
    target
) {

    if (
        (attended / total) * 100 >= target
    ) {
        return 0;
    }

    let classes = 0;

    while (
        (
            (attended + classes) /
            (total + classes)
        ) * 100 < target
    ) {

        classes++;

    }

    return classes;

}

/* ==================================
   CLASSES YOU CAN MISS
================================== */

function calculateCanMiss(
    attended,
    total
) {

    let missed = 0;

    while (
        (
            attended /
            (total + missed + 1)
        ) * 100 >= 75
    ) {

        missed++;

    }

    return missed;

}

/* ==================================
   QUICK FILL DEMO DATA
================================== */

function loadAttendanceDemo() {

    document.getElementById(
        "totalClasses"
    ).value = 120;

    document.getElementById(
        "attendedClasses"
    ).value = 92;

    attendancePredictor();

}

/* ==================================
   ENTER KEY SUPPORT
================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const totalInput =
            document.getElementById(
                "totalClasses"
            );

        const attendedInput =
            document.getElementById(
                "attendedClasses"
            );

        if (
            totalInput &&
            attendedInput
        ) {

            [totalInput, attendedInput]
            .forEach(input => {

                input.addEventListener(
                    "keypress",
                    (event) => {

                        if (
                            event.key === "Enter"
                        ) {

                            attendancePredictor();

                        }

                    }
                );

            });

        }

    }
);