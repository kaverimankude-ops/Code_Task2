
const questions = [
  {
    question: "You receive an email saying your bank account will be blocked in 10 minutes unless you click a link. What should you do?",
    options: [
      "Click the link immediately",
      "Reply with your banking password",
      "Open the official banking app and verify the alert",
      "Forward the email to friends"
    ],
    answer: 2,
    explanation: "Urgency is a common phishing tactic. Verify the message through your bank's official app or a trusted contact channel."
  },
  {
    question: "Which is a warning sign of a phishing email?",
    options: [
      "An unexpected urgent request for sensitive information",
      "A message you expected from a verified contact",
      "A notification you confirm in the official app",
      "A document you requested from a colleague"
    ],
    answer: 0,
    explanation: "Unexpected urgent requests for passwords, payment, or personal data should be treated with suspicion."
  },
  {
    question: "What does HTTPS in a website address guarantee?",
    options: [
      "The website belongs to a real bank",
      "The website cannot be used for phishing",
      "Every payment on the website is safe",
      "The connection is encrypted, but the site may still be fraudulent"
    ],
    answer: 3,
    explanation: "HTTPS protects data in transit, but criminals can also use HTTPS on fake websites. Verify the domain."
  },
  {
    question: "What is spear phishing?",
    options: [
      "A computer hardware failure",
      "A targeted phishing attack aimed at a specific person or organization",
      "A method of backing up files",
      "A type of antivirus software"
    ],
    answer: 1,
    explanation: "Spear phishing uses personalized information to make a fraudulent message more convincing."
  },
  {
    question: "You receive a text message with an unexpected parcel-delivery link asking for a small fee. What is safest?",
    options: [
      "Pay immediately",
      "Enter your card details to check the delivery",
      "Verify the delivery through the courier's official website or app",
      "Send your OTP to the sender"
    ],
    answer: 2,
    explanation: "Unexpected delivery-fee messages can be smishing attacks. Check directly with the courier using a trusted channel."
  },
  {
    question: "What is social engineering in cybersecurity?",
    options: [
      "Manipulating people into revealing information or taking unsafe actions",
      "Updating a computer operating system",
      "Creating a strong password",
      "Encrypting a file"
    ],
    answer: 0,
    explanation: "Social engineering exploits human trust, fear, urgency, or curiosity to manipulate victims."
  },
  {
    question: "A caller claiming to be IT support asks you to reveal your OTP. What should you do?",
    options: [
      "Share it if they know your name",
      "Read it out if they sound professional",
      "Send it by email instead",
      "Do not share it and verify the request independently"
    ],
    answer: 3,
    explanation: "Never disclose authentication codes to an unverified caller. Contact your IT team using official details."
  },
  {
    question: "Which is the strongest way to protect an account against password theft?",
    options: [
      "Use the same password on every site",
      "Use unique passwords and enable MFA or passkeys",
      "Save your password in a public document",
      "Share your password only with friends"
    ],
    answer: 1,
    explanation: "Unique passwords reduce reuse risks, while MFA or passkeys add protection against account compromise."
  },
  {
    question: "You accidentally entered your password on a suspicious website. What should you do first?",
    options: [
      "Wait to see whether anything happens",
      "Delete the browser history only",
      "Change the compromised password using a trusted device and report the incident",
      "Click the link again to check"
    ],
    answer: 2,
    explanation: "Change the exposed password immediately, change it anywhere else it was reused, and notify the relevant organization."
  },
  {
    question: "Which website address should you trust when signing in to a service?",
    options: [
      "A link from an unexpected prize email",
      "A domain that imitates the official brand name",
      "A shortened URL from an unknown sender",
      "The verified official address reached independently"
    ],
    answer: 3,
    explanation: "Reach the service through a known official address or trusted app rather than unexpected links."
  }
];

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCount = document.getElementById("questionCount");
const scoreLabel = document.getElementById("scoreLabel");
const progressBar = document.getElementById("progressBar");
const questionTitle = document.getElementById("question");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;
let selected = false;
let userAnswers = [];

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selected = false;
  userAnswers = [];

  home.classList.add("hidden");
  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  selected = false;

  const q = questions[currentQuestion];

  questionCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  scoreLabel.textContent = `Score: ${score}`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionTitle.textContent = q.question;
  optionsBox.replaceChildren();
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    optionsBox.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (selected) return;
  selected = true;

  const q = questions[currentQuestion];
  const buttons = optionsBox.querySelectorAll(".option-btn");
  const isCorrect = index === q.answer;

  if (isCorrect) score++;

  userAnswers.push({
    chosen: index,
    correct: q.answer
  });

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.answer) {
      button.classList.add("correct");
    } else if (i === index) {
      button.classList.add("wrong");
    }
  });

  scoreLabel.textContent = `Score: ${score}`;

  const heading = document.createElement("strong");
  heading.textContent = isCorrect
    ? "✓ Correct answer!"
    : "✗ Not quite!";

  const explanation = document.createElement("p");
  explanation.textContent = q.explanation;

  feedback.replaceChildren(heading, explanation);
  feedback.classList.remove("hidden");

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "View Results →"
      : "Next Question →";

  nextBtn.classList.remove("hidden");
}

function showResults() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  document.getElementById("finalScore").textContent =
    `${score}/${total}`;

  document.getElementById("percentage").textContent =
    `You scored ${percentage}%`;

  let title = "Keep Learning!";
  let message = "Review the explanations and try the quiz again.";

  if (percentage === 100) {
    title = "Excellent Work!";
    message = "You answered every question correctly!";
  } else if (percentage >= 70) {
    title = "Great Job!";
    message = "You have a good understanding of phishing awareness.";
  }

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMessage").textContent = message;

  const review = document.getElementById("review");
  review.replaceChildren();

  questions.forEach((q, index) => {
    const item = document.createElement("div");
    item.className = "review-item";

    const heading = document.createElement("strong");
    heading.textContent =
      `${index + 1}. ${userAnswers[index].chosen === q.answer ? "✓" : "✗"} ${q.question}`;

    const explanation = document.createElement("p");
    explanation.textContent =
      `Correct answer: ${q.options[q.answer]}. ${q.explanation}`;

    item.append(heading, explanation);
    review.appendChild(item);
  });

  progressBar.style.width = "100%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

nextBtn.addEventListener("click", () => {
  if (!selected) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
