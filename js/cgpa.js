/* ==================================
   SEMESTERMATE V3
   CGPA CALCULATOR PRO
================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeCGPAFields
);

/* ==================================
   CREATE 8 SEMESTER INPUTS
================================== */

function initializeCGPAFields() {

    const container =
        document.getElementById(
            "cgpaInputs"
        );

    if (!container) return;

    let html = "";

    for (let i = 1; i <= 8; i++) {

        html += `

        <input
        type="number"
        step="0.01"
        min="0"
        max="10"
        id="sgpa${i}"
        placeholder="Semester ${i} SGPA">

        `;

    }

    container.innerHTML = html;

}

/* ==================================
   MAIN CGPA CALCULATOR
================================== */

function calculateCGPA() {

    const sgpas = [];

    for (let i = 1; i <= 8; i++) {

        const value =
            parseFloat(
                document.getElementById(
                    `sgpa${i}`
                ).value
            );

        if (!isNaN(value)) {

            sgpas.push(value);

        }

    }

    const result =
        document.getElementById(
            "cgpaResult"
        );

    if (sgpas.length === 0) {

        result.innerHTML = `

        <div class="result-box">

            ❌ Enter at least one SGPA.

        </div>

        `;

        return;
    }

    const total =
        sgpas.reduce(
            (sum, sgpa) =>
            sum + sgpa,
            0
        );

    const cgpa =
        total / sgpas.length;

    const percentage =
        calculatePercentage(cgpa);

    const grade =
        calculateGrade(cgpa);

    const distinction =
        checkDistinction(cgpa);

    const performanceColor =
        getPerformanceColor(cgpa);

    result.innerHTML = `

    <div class="result-box fade-in">

        <h3>
            🎓 CGPA Report
        </h3>

        <br>

        <div class="progress-container">

            <div
            class="progress-bar"
            style="
            width:${cgpa * 10}%;
            background:${performanceColor};
            ">
            </div>

        </div>

        <p>

            <strong>
            CGPA:
            </strong>

            ${cgpa.toFixed(2)}

        </p>

        <p>

            <strong>
            Percentage:
            </strong>

            ${percentage.toFixed(2)}%

        </p>

        <p>

            <strong>
            Grade:
            </strong>

            ${grade}

        </p>

        <p>

            <strong>
            Academic Status:
            </strong>

            ${distinction}

        </p>

    </div>

    `;

}

/* ==================================
   CGPA TO PERCENTAGE
================================== */

function calculatePercentage(cgpa) {

    return (cgpa - 0.75) * 10;

}

/* ==================================
   GRADE SYSTEM
================================== */

function calculateGrade(cgpa) {

    if (cgpa >= 9.0) {

        return "A+";

    }

    if (cgpa >= 8.0) {

        return "A";

    }

    if (cgpa >= 7.0) {

        return "B+";

    }

    if (cgpa >= 6.0) {

        return "B";

    }

    if (cgpa >= 5.0) {

        return "C";

    }

    return "D";

}

/* ==================================
   DISTINCTION CHECK
================================== */

function checkDistinction(cgpa) {

    if (cgpa >= 8.5) {

        return "🏆 Distinction";

    }

    if (cgpa >= 7.0) {

        return "✅ First Division";

    }

    if (cgpa >= 6.0) {

        return "📘 Second Division";

    }

    return "⚠ Needs Improvement";

}

/* ==================================
   PERFORMANCE COLORS
================================== */

function getPerformanceColor(cgpa) {

    if (cgpa >= 8.5) {

        return "#10b981";

    }

    if (cgpa >= 7.0) {

        return "#3b82f6";

    }

    if (cgpa >= 6.0) {

        return "#f59e0b";

    }

    return "#ef4444";

}

/* ==================================
   DEMO DATA
================================== */

function loadCGPADemo() {

    const demoData = [

        8.2,
        8.5,
        8.0,
        8.4,
        8.6,
        8.3,
        8.7,
        8.5

    ];

    for (let i = 1; i <= 8; i++) {

        const field =
            document.getElementById(
                `sgpa${i}`
            );

        if (field) {

            field.value =
                demoData[i - 1];

        }

    }

    calculateCGPA();

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
                active.id &&
                active.id.startsWith(
                    "sgpa"
                )
            ) {

                calculateCGPA();

            }

        }

    }
);