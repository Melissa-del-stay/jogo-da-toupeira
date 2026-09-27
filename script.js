const buracos = document.querySelectorAll(".buraco");
const botaoComecar = document.getElementById("botaoComecar");
const pontosElemento = document.getElementById("pontos");
const tempoElemento = document.getElementById("tempo");
const mensagem = document.getElementById("mensagem");

let pontos = 0;
let tempo = 30;
let jogoAtivo = false;
let intervaloToupeira;
let intervaloTempo;

function mostrarToupeira() {
    buracos.forEach((buraco) => {
        buraco.innerHTML = "";
    });

    const numeroAleatorio = Math.floor(Math.random() * buracos.length);
    const buracoEscolhido = buracos[numeroAleatorio];

    const toupeira = document.createElement("div");
    toupeira.classList.add("toupeira");

    toupeira.addEventListener("click", function (evento) {
        evento.stopPropagation();

        if (!jogoAtivo) {
            return;
        }

        pontos++;
        pontosElemento.textContent = pontos;

        mostrarToupeira();
    });

    buracoEscolhido.appendChild(toupeira);
}

function iniciarJogo() {
    pontos = 0;
    tempo = 30;
    jogoAtivo = true;

    pontosElemento.textContent = pontos;
    tempoElemento.textContent = tempo;
    mensagem.textContent = "";

    clearInterval(intervaloToupeira);
    clearInterval(intervaloTempo);

    mostrarToupeira();

    intervaloToupeira = setInterval(mostrarToupeira, 1000);

    intervaloTempo = setInterval(() => {
        tempo--;
        tempoElemento.textContent = tempo;

        if (tempo <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

function finalizarJogo() {
    jogoAtivo = false;

    clearInterval(intervaloToupeira);
    clearInterval(intervaloTempo);

    buracos.forEach((buraco) => {
        buraco.innerHTML = "";
    });

    mensagem.textContent = "Fim de jogo! Pontuação: " + pontos;
}

botaoComecar.addEventListener("click", iniciarJogo);

buracos.forEach((buraco) => {
    buraco.addEventListener("click", function () {
        if (jogoAtivo && !buraco.querySelector(".toupeira")) {
            mensagem.textContent = "Você clicou no buraco vazio!";
        }
    });
});