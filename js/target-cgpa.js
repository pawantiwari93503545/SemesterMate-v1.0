/* ==================================
   SEMESTERMATE V3
   TARGET CGPA CALCULATOR PRO
================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeTargetCGPA
);

/* ==================================
   CREATE UI
================================== */

function initializeTargetCGPA() {

    const container =
        document.getElementById(
            "targetCGPAHub"
        );

    if (!container) return;

    container.innerHTML = `

    <div class="tool-card">

        <h3>
            🎯 Target CGPA Calculator
        </h3>

        <br>

        <input
        type="number"
        step="0.01"
        min="0"
        max="10"
        id="currentCGPA"
        placeholder="Current CGPA">

        <input
        type="number"
        min="1"
        max="8"
        id="completedSemesters"
        placeholder="Completed Semesters">

        <input
        type="number"
        step="0.01"
        min="0"
        max="10"
        id="targetCGPA"
        placeholder="Target CGPA">

        <input
        type="number"
        min="1"
        max="8"
        id="totalSemesters"
        placeholder="Total Semesters">

        <button
        onclick="calculateTargetCGPA()">

        Calculate Required SGPA

        </button>

        <button
        class="primary-btn"
        onclick="loadTargetCGPADemo()">

        Load Demo Data

        </button>

        <div id="targetCGPAResult"></div>

    </div>

    `;

}

/* ==================================
   MAIN CALCULATOR
================================== */

function calculateTargetCGPA() {

    const currentCGPA =
        parseFloat(
            document.getElementById(
                "currentCGPA"
            ).value
        );

    const completedSemesters =
        parseInt(
            document.getElementById(
                "completedSemesters"
            ).value
        );

    const targetCGPA =
        parseFloat(
            document.getElementById(
                "targetCGPA"
            ).value
        );

    const totalSemesters =
        parseInt(
            document.getElementById(
                "totalSemesters"
            ).value
        );

    const result =
        document.getElementById(
            "targetCGPAResult"
        );

    /* ==========================
       VALIDATION
    ========================== */

    if (
        isNaN(currentCGPA) ||
        isNaN(completedSemesters) ||
        isNaN(targetCGPA) ||
        isNaN(totalSemesters)
    ) {

        result.innerHTML = `

        <div class="result-box">

        ❌ Please fill all fields.

        </div>

        `;

        return;
    }

    if (
        completedSemesters >=
        totalSemesters
    ) {

        result.innerHTML = `

        <div class="result-box">

        ❌ Completed semesters
        must be less than total semesters.

        </div>

        `;

        return;
    }

    /* ==========================
       CALCULATION
    ========================== */

    const remainingSemesters =
        totalSemesters -
        completedSemesters;

    const currentGradePoints =
        currentCGPA *
        completedSemesters;

    const targetGradePoints =
        targetCGPA *
        totalSemesters;

    const gradePointsNeeded =
        targetGradePoints -
        currentGradePoints;

    const requiredAverageSGPA =
        gradePointsNeeded /
        remainingSemesters;

    /* ==========================
       STATUS
    ========================== */

    let status = "";
    let color = "";

    if (requiredAverageSGPA <= 8) {

        status =
        "✅ Easily Achievable";

        color = "#10b981";

    }

    else if (
        requiredAverageSGPA <= 9
    ) {

        status =
        "⚡ Challenging but Realistic";

        color = "#f59e0b";

    }

    else if (
        requiredAverageSGPA <= 10
    ) {

        status =
        "🔥 Very Difficult";

        color = "#ef4444";

    }

    else {

        status =
        "❌ Practically Impossible";

        color = "#dc2626";

    }

    /* ==========================
       PROGRESS
    ========================== */

    const progress =
        (currentCGPA / 10) * 100;

    /* ==========================
       RESULT UI
    ========================== */

    result.innerHTML = `

    <div class="result-box fade-in">

        <h3>

        🎯 Target CGPA Report

        </h3>

        <br>

        <div class="progress-container">

            <div
            class="progress-bar"
            style="
            width:${progress}%;
            background:${color};
            ">
            </div>

        </div>

        <p>

        Current CGPA:
        <strong>

        ${currentCGPA.toFixed(2)}

        </strong>

        </p>

        <p>

        Target CGPA:
        <strong>

        ${targetCGPA.toFixed(2)}

        </strong>

        </p>

        <p>

        Remaining Semesters:
        <strong>

        ${remainingSemesters}

        </strong>

        </p>

        <hr
        style="
        margin:15px 0;
        ">

        <p>

        Required Average SGPA:

        <strong>

        ${requiredAverageSGPA.toFixed(2)}

        </strong>

        </p>

        <p>

        Status:

        <span
        style="
        color:${color};
        font-weight:600;
        ">

        ${status}

        </span>

        </p>

    </div>

    `;

}

/* ==================================
   DEMO DATA
================================== */

function loadTargetCGPADemo() {

    document.getElementById(
        "currentCGPA"
    ).value = 7.50;

    document.getElementById(
        "completedSemesters"
    ).value = 4;

    document.getElementById(
        "targetCGPA"
    ).value = 8.50;

    document.getElementById(
        "totalSemesters"
    ).value = 8;

    calculateTargetCGPA();

}

/* ==================================
   ENTER KEY SUPPORT
================================== */

document.addEventListener(
    "keypress",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            const active =
                document.activeElement;

            if (
                active &&
                (
                    active.id === "currentCGPA" ||
                    active.id === "completedSemesters" ||
                    active.id === "targetCGPA" ||
                    active.id === "totalSemesters"
                )
            ) {

                calculateTargetCGPA();

            }

        }

    }
);