/* ==================================
   SEMESTERMATE V3
   PERCENTAGE HUB
================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializePercentageHub
);

/* ==================================
   CREATE UI
================================== */

function initializePercentageHub() {

    const container =
        document.getElementById(
            "percentageHub"
        );

    if (!container) return;

    container.innerHTML = `

    <div class="tool-card">

        <h3>
            📈 Percentage Hub
        </h3>

        <br>

        <div class="tab-buttons">

            <button
            onclick="showPercentageTab('marks')">

            Marks → %

            </button>

            <button
            onclick="showPercentageTab('cgpa')">

            CGPA → %

            </button>

            <button
            onclick="showPercentageTab('percentage')">

            % → CGPA

            </button>

        </div>

        <br>

        <div id="percentageTabContent"></div>

        <div id="percentageResult"></div>

    </div>

    `;

    showPercentageTab("marks");

}

/* ==================================
   TAB SYSTEM
================================== */

function showPercentageTab(type) {

    const content =
        document.getElementById(
            "percentageTabContent"
        );

    if (!content) return;

    /* =======================
       MARKS TO PERCENTAGE
    ======================= */

    if (type === "marks") {

        content.innerHTML = `

        <input
        type="number"
        id="obtainedMarks"
        placeholder="Obtained Marks">

        <input
        type="number"
        id="totalMarks"
        placeholder="Total Marks">

        <button
        onclick="marksToPercentage()">

        Calculate Percentage

        </button>

        `;

    }

    /* =======================
       CGPA TO PERCENTAGE
    ======================= */

    if (type === "cgpa") {

        content.innerHTML = `

        <input
        type="number"
        step="0.01"
        id="cgpaInput"
        placeholder="Enter CGPA">

        <button
        onclick="cgpaToPercentage()">

        Convert

        </button>

        `;

    }

    /* =======================
       PERCENTAGE TO CGPA
    ======================= */

    if (type === "percentage") {

        content.innerHTML = `

        <input
        type="number"
        step="0.01"
        id="percentageInput"
        placeholder="Enter Percentage">

        <button
        onclick="percentageToCGPA()">

        Convert

        </button>

        `;

    }

}

/* ==================================
   MARKS -> PERCENTAGE
================================== */

function marksToPercentage() {

    const obtained =
        parseFloat(
            document.getElementById(
                "obtainedMarks"
            ).value
        );

    const total =
        parseFloat(
            document.getElementById(
                "totalMarks"
            ).value
        );

    const result =
        document.getElementById(
            "percentageResult"
        );

    if (
        isNaN(obtained) ||
        isNaN(total) ||
        total <= 0 ||
        obtained > total
    ) {

        result.innerHTML = `

        <div class="result-box">

        ❌ Enter valid marks.

        </div>

        `;

        return;
    }

    const percentage =
        (obtained / total) * 100;

    result.innerHTML = `

    <div class="result-box fade-in">

        <h3>
            📊 Result
        </h3>

        <br>

        <p>

        Obtained Marks:
        <strong>${obtained}</strong>

        </p>

        <p>

        Total Marks:
        <strong>${total}</strong>

        </p>

        <p>

        Percentage:
        <strong>

        ${percentage.toFixed(2)}%

        </strong>

        </p>

    </div>

    `;

}

/* ==================================
   CGPA -> PERCENTAGE
================================== */

function cgpaToPercentage() {

    const cgpa =
        parseFloat(
            document.getElementById(
                "cgpaInput"
            ).value
        );

    const result =
        document.getElementById(
            "percentageResult"
        );

    if (
        isNaN(cgpa) ||
        cgpa < 0 ||
        cgpa > 10
    ) {

        result.innerHTML = `

        <div class="result-box">

        ❌ Enter valid CGPA.

        </div>

        `;

        return;
    }

    const percentage =
        (cgpa - 0.75) * 10;

    result.innerHTML = `

    <div class="result-box fade-in">

        <h3>

        🎓 CGPA Conversion

        </h3>

        <br>

        <p>

        CGPA:
        <strong>${cgpa}</strong>

        </p>

        <p>

        Percentage:
        <strong>

        ${percentage.toFixed(2)}%

        </strong>

        </p>

    </div>

    `;

}

/* ==================================
   PERCENTAGE -> CGPA
================================== */

function percentageToCGPA() {

    const percentage =
        parseFloat(
            document.getElementById(
                "percentageInput"
            ).value
        );

    const result =
        document.getElementById(
            "percentageResult"
        );

    if (
        isNaN(percentage) ||
        percentage < 0 ||
        percentage > 100
    ) {

        result.innerHTML = `

        <div class="result-box">

        ❌ Enter valid percentage.

        </div>

        `;

        return;
    }

    const cgpa =
        (percentage / 10) + 0.75;

    result.innerHTML = `

    <div class="result-box fade-in">

        <h3>

        📈 Percentage Conversion

        </h3>

        <br>

        <p>

        Percentage:
        <strong>

        ${percentage}%

        </strong>

        </p>

        <p>

        Equivalent CGPA:
        <strong>

        ${cgpa.toFixed(2)}

        </strong>

        </p>

    </div>

    `;

}

/* ==================================
   DEMO DATA
================================== */

function loadPercentageDemo() {

    showPercentageTab("marks");

    setTimeout(() => {

        document.getElementById(
            "obtainedMarks"
        ).value = 450;

        document.getElementById(
            "totalMarks"
        ).value = 600;

        marksToPercentage();

    }, 100);

}