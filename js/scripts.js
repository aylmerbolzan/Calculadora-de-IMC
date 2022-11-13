// TABELA DE IMC
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "-",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "-",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade Grave",
    obesity: "III",
  },
];

// SELEÇÃO DOS ELEMENTOS

//  - Tabela de IMC que aparecerá no resultado
const imcTable = document.querySelector("#imc-table");

//  - Inputs que o usuário está passando
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");

//  - Clique dos botões "Calcular" e "Limpar"
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

//  - Chama container de calculo e container de resultado
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

//  - Seleciona campos para preencher com o resultado
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

//  - Seleciona botão de voltar
const backBtn = document.querySelector("#back-btn");

// FUNÇÕES

//  - Cria dinamicamente a tabela baseada nos dados
function createTable(data) {
  data.forEach((item) => {
    //  -- Cria a div para receber os elementos
    const div = document.createElement("div");
    div.classList.add("table-data");

    //  -- Busca os itens e insere os parágrafos dentro da div
    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    //  -- Inclui os itens buscados dentro da div criada
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

//  - Evento de limpeza do formulário que será chamado pelo clique no botão
function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

//  - Validador de caracteres permitidos
function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

//   - Calcula os inputs preenchidos pelo usuário na fórmula do IMC
function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1);

  return imc;
}

//   - Onde tem a class "hide" é removido e onde não tem é inserido
function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// INICIALIZAÇÃO
createTable(data);

// EVENTOS

//  - Verifica se houve alteração nos elementos para executar a validação
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);
    e.target.value = updatedValue;
  });
});

//  - Calcula os inputs preenchidos ao comando do clique
calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //   -- Converte inputs em números e substitui "," por "."
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  //   -- Se os elementos não estiverem preenchidos, não segue
  if (!weight || !height) return;

  const imc = calcImc(weight, height);

  //   -- Se o resultado não estiver dentro da faixa de IMCs, não segue
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });
  if (!info) return;

  //   -- Caso passe nas validações, insere os textos de "imc" e "info"

  imcNumber.innerHTML = imc;
  imcInfo.innerHTML = info;

  //    -- Insere a class para alterar o visual
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade Grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

//  - Limpa os inputs preenchidos ao comando do clique
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

//  - Botão de voltar insere o "hide" e limpa os campos do form

backBtn.addEventListener("click", () => {
  cleanInputs();
  showOrHideResults();
});
