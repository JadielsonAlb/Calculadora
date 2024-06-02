'use strict';

// Selecionando o elemento de display e os botões numéricos e de operação
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // Seleciona todos os elementos cujo id contém 'tecla'
const operadores = document.querySelectorAll('[id*=operador]'); // Seleciona todos os elementos cujo id contém 'operador'

// Variáveis para controlar o estado do cálculo

let novoNumero = true; // Indica se um novo número deve ser inserido
let operador; // Armazena o operador selecionado
let numeroAnterior; // Armazena o número anterior para cálculos

// Função que verifica se uma operação está pendente
const operacaoPendente = () => operador !== undefined;

// Função para calcular o resultado da operação pendente
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.')); // Converte o texto do display em um número
        novoNumero = true; // Define que um novo número será inserido após o cálculo
        const resultado = eval(`${numeroAnterior} ${operador} ${numeroAtual}`); // Realiza o cálculo
        atualizarDisplay(resultado); // Atualiza o display com o resultado
    }
}

// Função para atualizar o display com um texto
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR'); // Define o texto do display como o resultado
        novoNumero = false; // Define que não é mais um novo número
    } else {
        display.textContent += texto.toLocaleString('BR'); // Adiciona texto ao display
    }
}

// Função para selecionar um operador
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular(); // Calcula a operação pendente, se houver
        novoNumero = true; // Define que um novo número será inserido
        operador = evento.target.textContent; // Obtém o operador selecionado
        numeroAnterior = parseFloat(display.textContent.replace(',', '.')); // Armazena o número anterior para cálculos
    }
}

// Função para ativar a operação de igual
const ativarIgual = () => {
    calcular(); // Calcula a operação pendente
    operador = undefined; // Limpa o operador
}

// Função para inserir um número no display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

// Adiciona eventos de clique para os botões numéricos e de operação
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

// Adiciona evento de clique para o botão de igual
document.getElementById('igual').addEventListener('click', ativarIgual);

// Funções para limpar o display e o cálculo
const limparDisplay = () => display.textContent = '';
const limparCalculo = () => {
    limparDisplay(); // Limpa o display
    operador = undefined; // Limpa o operador
    novoNumero = true; // Define que é um novo número
    numeroAnterior = undefined; // Limpa o número anterior
}

// Adiciona eventos de clique para os botões de limpar display e limpar cálculo
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

// Função para remover o último número do display
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

// Função para inverter o sinal do número no display
const inverterSinal = () => {
    novoNumero = true; // Define que é um novo número
    atualizarDisplay(display.textContent * -1); // Inverte o sinal do número e atualiza o display
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

// Funções auxiliares para verificar se já existe um decimal no display e se há algum valor no display
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

// Função para inserir um decimal no display
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(','); // Adiciona um decimal se já houver algum valor no display
        } else {
            atualizarDisplay('0,'); // Adiciona '0,' se o display estiver vazio
        }
    }
}

// Adiciona evento de clique para o botão decimal
document.getElementById('decimal').addEventListener('click', inserirDecimal);

// Mapeamento de teclas para os botões correspondentes
const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    'Enter': 'igual',
    '=': 'igual',
    'Backspace': 'backspace',
    'C': 'LimparDisplay ',
    'Espace': 'LimparCalculo',
    ',': 'decimal'
}

// Função para mapear as teclas pressionadas aos botões correspondentes
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) {
        document.getElementById(mapaTeclado[tecla]).click(); // Simula o clique no botão correspondente à tecla pressionada
    }
}

// Adiciona evento de escuta para o pressionamento de teclas
document.addEventListener('keydown', mapearTeclado);
