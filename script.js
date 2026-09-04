const scenarios = [

    {
        sender: "security@paytm-support.example",
        subject: "Urgent Account Verification",
        message:
            "Your account will be suspended within 24 hours. " +
            "Click the link below to verify your identity immediately.",
        answer: "phishing",
        explanation:
            "This is phishing because it creates urgency and asks " +
            "the user to verify their account through a suspicious link."
    },

    {
        sender: "hr@example.com",
        subject: "Monthly Team Meeting",
        message:
            "Hello team. The monthly meeting will take place tomorrow " +
            "at 10 AM. Please check the official company portal for details.",
        answer: "safe",
        explanation:
            "This message does not ask for sensitive information " +
            "and directs employees to the official company portal."
    },

    {
        sender: "account-alert@example-security.test",
        subject: "Your Password Is Expiring",
        message:
            "Your password will expire in 10 minutes. " +
            "Confirm your password immediately to prevent account loss.",
        answer: "phishing",
        explanation:
            "The message uses extreme urgency and requests sensitive " +
            "information. These are common phishing indicators."
    },

    {
        sender: "winner@random-mail.example",
        subject: "Congratulations! You Won!",
        message:
            "Congratulations! You have won a free smartphone. " +
            "Click the link to claim your prize.",
        answer: "phishing",
        explanation:
            "Unexpected prizes and suspicious links are common signs " +
            "of phishing scams."
    },

    {
        sender: "library@example.edu",
        subject: "Library Hours Update",
        message:
            "Dear students, the library will close at 6 PM today " +
            "because of scheduled maintenance.",
        answer: "safe",
        explanation:
            "This is a normal informational message and does not " +
            "request passwords, payments, or sensitive information."
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;


function loadQuestion() {

    const scenario = scenarios[currentQuestion];

    document.getElementById("sender").textContent =
        scenario.sender;

    document.getElementById("subject").textContent =
        scenario.subject;

    document.getElementById("message").textContent =
        scenario.message;

    document.getElementById("question-number").textContent =
        currentQuestion + 1;

    document.getElementById("total-questions").textContent =
        scenarios.length;

    document.getElementById("result").innerHTML = "";

    document.getElementById("result").className = "";

    document.getElementById("next-btn").style.display = "none";

    answered = false;
}


function checkAnswer(userAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const scenario = scenarios[currentQuestion];

    const result = document.getElementById("result");

    if (userAnswer === scenario.answer) {

        score++;

        result.className = "correct";

        result.innerHTML =
            "✅ Correct!<br><br>" +
            scenario.explanation;

    } else {

        result.className = "incorrect";

        result.innerHTML =
            "❌ Incorrect.<br><br>" +
            scenario.explanation;
    }

    document.getElementById("next-btn").style.display =
        "block";
}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < scenarios.length) {

        loadQuestion();

    } else {

        showFinalScore();
    }
}


function showFinalScore() {

    const percentage =
        Math.round((score / scenarios.length) * 100);

    let message;

    if (percentage >= 80) {

        message =
            "Excellent! You have strong phishing awareness.";

    } else if (percentage >= 50) {

        message =
            "Good job! Keep improving your phishing detection skills.";

    } else {

        message =
            "Keep practicing. Learn the common signs of phishing.";

    }

    document.querySelector(".container").innerHTML = `

        <h1>🎉 Simulation Complete</h1>

        <div class="score">

            <h2>Your Score</h2>

            <p>
                ${score} / ${scenarios.length}
            </p>

            <p>
                ${percentage}%
            </p>

            <p>
                ${message}
            </p>

        </div>

        <button
            class="next-btn"
            onclick="location.reload()">
            🔄 Try Again
        </button>

    `;
}


loadQuestion();