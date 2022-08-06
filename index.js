let data = {};
let setup = {};
let random = {};
let click = 0;
const setupDiv = document.getElementById("jocke-setup");
const primaryDiv = document.getElementById("primary-div");
const punchlineDiv = document.createElement("h2");
const randomButton = document.getElementById("random-button");

main();
randomButton.addEventListener("click", generatePunchline);

async function main() {
  await getJockes();
  getRandomJoke();
}

function createButtonSubject(subject) {
  const button = document.createElement("button");
  button.setAttribute("id", subject);
  button.innerHTML = subject;
  primaryDiv.appendChild(button);
}

function generatePunchline() {
  randomButton.innerHTML = "Tell me the answer";
  switch (click) {
    case 0:
      punchlineDiv.setAttribute("id", "jocke-punchline");
      punchlineDiv.innerHTML = data[random].punchline;
      primaryDiv.appendChild(punchlineDiv);
      randomButton.innerHTML = "Next";
      click++;
      break;

    case 1:
      punchlineDiv.remove();
      getRandomJoke();
      break;
  }
}

function generateSetup(subject) {
  if (!subject) {
    random = Math.floor(Math.random() * data.length);
    setup = data[random].setup;
  }
}

function getRandomJoke() {
  generateSetup();
  setupDiv.innerHTML = setup;
  click = 0;
}

async function getJockes() {
  let obj;
  const res = await fetch("http://localhost:3001/all");
  obj = await res.json();
  data = obj;
}
