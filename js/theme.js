/* ==================================
   SEMESTERMATE V3
   THEME + SIDEBAR MANAGER
================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    initializeSidebar();

});

/* ==================================
   THEME SYSTEM
================================== */

function initializeTheme() {

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("semestermate-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    }

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );

    }

}

function toggleTheme() {

    document.body.classList.toggle("dark");

    const themeToggle =
        document.getElementById("themeToggle");

    if (
        document.body.classList.contains("dark")
    ) {

        localStorage.setItem(
            "semestermate-theme",
            "dark"
        );

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    } else {

        localStorage.setItem(
            "semestermate-theme",
            "light"
        );

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    }

}

/* ==================================
   MOBILE SIDEBAR
================================== */

function initializeSidebar() {

    const mobileMenuButton =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".sidebar-overlay");

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("active");

                if (overlay) {
                    overlay.classList.toggle("active");
                }

            }
        );

    }

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }

}

function closeSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".sidebar-overlay");

    if (sidebar) {
        sidebar.classList.remove("active");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

}

/* ==================================
   AUTO CLOSE ON MOBILE
================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        closeSidebar();

    }

});

/* ==================================
   HELPER FUNCTIONS
================================== */

function showSuccess(message) {

    console.log(
        "✅ SemesterMate:",
        message
    );

}

function showError(message) {

    console.error(
        "❌ SemesterMate:",
        message
    );

}

/* ==================================
   APP STARTUP LOG
================================== */

console.log(
    "🎓 SemesterMate v3 Loaded Successfully"
);