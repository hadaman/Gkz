async function loadQuiz() {
  const response = await fetch("data/quiz.json");
  const questions = await response.json();

  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    let optionsHTML = q.options.map(opt =>
      `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
    ).join("");

    div.innerHTML = `<h3>${index + 1}. ${q.question}</h3>${optionsHTML}`;
    quizContainer.appendChild(div);
  });

  document.getElementById("submit-btn").onclick = () => {
    let score = 0;
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });
    document.getElementById("result").textContent = `✅ आपका स्कोर: ${score} / ${questions.length}`;
  };
}

loadQuiz();
