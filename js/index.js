const escolhaDoAluno = document.getElementById('selecao-aluno');
const escolhaDaQuantidadeNota = document.getElementById('quantidade-notas');
const resultadoAluno = document.querySelector('.resultado-aluno');
const resultadoInput = document.querySelector('.resultado-input');
const finalizarBtn = document.querySelector('.finalizar-btn');
const resultadoMedia = document.querySelector('.resultado-media');
const resultadoSemestre = document.querySelector('.resultado-semestre');

let eventoRegistradoAluno = false;
let eventoRegistradoNota = false;

function criarInputs(numeroInputs) {
  resultadoInput.innerHTML = '';
  for (let nota = 0; nota < numeroInputs; nota++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = `Nota ${nota + 1}`;
    input.addEventListener('input', calculaMedia);
    resultadoInput.appendChild(input);
  }
}

function calculaMedia() {
  const inputs = resultadoInput.querySelectorAll('input');
  let soma = 0;
  let contador = 0;

  inputs.forEach(input => {
    if (input.value !== '') {
      soma += parseFloat(input.value);
      contador++;
    }
  });

  if (contador > 1) {
    const media = soma / contador;
    resultadoMedia.innerHTML = `<strong>Média das notas:</strong> ${media.toFixed(
      1
    )}`;
    if (media >= 7) {
      resultadoSemestre.innerHTML = `Aluno <strong>aprovado</strong>`;
    } else {
      resultadoSemestre.innerHTML = `Aluno <strong>reprovado</strong>`;
    }
  } else {
    resultadoMedia.innerHTML = '';
    resultadoSemestre.innerHTML = ``;
  }
}

function registrandoNota() {
  escolhaDaQuantidadeNota.addEventListener('change', function () {
    let valorDaEscolhaNota = escolhaDaQuantidadeNota.value;

    if (valorDaEscolhaNota === 'selecione') {
      resultadoInput.innerHTML = '';
      resultadoMedia.innerHTML = '';
    } else if (valorDaEscolhaNota === '2') {
      criarInputs(2);
    } else if (valorDaEscolhaNota === '3') {
      resultadoInput.innerHTML = '';
      criarInputs(3);
    } else {
      criarInputs(4);
    }
  });
  eventoRegistradoNota = true;
}

function registrandoAluno() {
  escolhaDoAluno.addEventListener('change', function () {
    let valorDaEscolhaAluno = escolhaDoAluno.value;

    if (valorDaEscolhaAluno === 'selecione') {
      resultadoAluno.innerHTML = '';
      resultadoInput.innerHTML = '';
      resultadoMedia.innerHTML = '';
      eventoRegistradoNota = false;
      escolhaDaQuantidadeNota.value = 'selecione';
    } else {
      resultadoAluno.innerHTML = `<strong>Aluno selecionado:</strong> ${valorDaEscolhaAluno}`;
      if (!eventoRegistradoNota) {
        registrandoNota();
      }
    }
  });
  eventoRegistradoAluno = true;
}

if (!eventoRegistradoAluno) {
  registrandoAluno();
  calculaMedia();
}

finalizarBtn.addEventListener('click', () => {
  if (
    escolhaDoAluno.value == `selecione` ||
    escolhaDaQuantidadeNota.value == `selecione`
  ) {
    resultadoInput.innerHTML = ``;
    resultadoMedia.innerHTML = ``;
    resultadoAluno.innerHTML = ``;
    resultadoAluno.innerHTML = `<strong>Preencha todos os campos.</strong>`;
    escolhaDoAluno.value = `selecione`;
    escolhaDaQuantidadeNota.value = `selecione`;
  } else {
    resultadoAluno.innerHTML = `<strong>Lançamento realizado com sucesso</strong>`;
    resultadoInput.innerHTML = ``;
    resultadoMedia.innerHTML = ``;
    resultadoSemestre.innerHTML = ``;
  }
});
