// Declaração de variáveis e selecionando elementos
const maxNumber = 3;
let attempts = 1;
let secretNumber;
let sortedNumbersList = [];

const generateRandomNumber = () => {
    const randomNumber = parseInt(Math.random() * maxNumber + 1);
    let quantityOfElementsInTheList = sortedNumbersList.length;

    if (quantityOfElementsInTheList == maxNumber) {
        sortedNumbersList = [];
    }
    if (sortedNumbersList.includes(randomNumber)) {
        return generateRandomNumber();
    } else {
        sortedNumbersList.push(randomNumber);
        console.log(sortedNumbersList);
        return randomNumber;
    }
}
secretNumber = generateRandomNumber();

const displayInitialMessage = () => {
  displayText("h1", "Jogo do número secreto");
  displayText("p", `Escolha um número entre 1 e ${maxNumber}`);
};

const displayText = (tag, text) => {
  const name = document.querySelector(`${tag}`);
  name.innerHTML = text;
  responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate: 1.2});
};

const verifyGuess = () => {
  const guess = document.querySelector("input").value;

  if (guess == secretNumber) {
    displayText("h1", "Acertou!");
    let attemptWord = attempts > 1 ? "tentativas" : "tentativa";
    let attemptsMessage = `Você descobriu o número secreto depois de ${attempts} ${attemptWord}!`;
    displayText("p", attemptsMessage);
    document.querySelector("#restart").removeAttribute("disabled");
    document.querySelector("#guess_btn").setAttribute("disabled", true);
  } else {
    if (guess > secretNumber) {
      displayText("p", "Você errou");
      displayText("p", `O número secreto é menor do que ${guess}`);
      attempts++;
    } else {
      displayText("p", "Você errou!");
      displayText("p", `O número secreto é maior do que ${guess}`);
      attempts++;
    }
    clearField();
  }
};

const clearField = () => {
  guess = document.querySelector("input");
  guess.value = "";
};

restartGame = () => {
  secretNumber = generateRandomNumber();
  displayInitialMessage();
  attempts = 1;
  clearField();
  document.querySelector("#restart").setAttribute("disabled", true);
  document.querySelector("#guess_btn").removeAttribute("disabled");
};

displayInitialMessage();