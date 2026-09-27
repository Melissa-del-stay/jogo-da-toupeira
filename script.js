const buracos = document.querySelectorAll(".buraco");
const botaoComecar = document.getElementById("botaoComecar");
const pontosElemento = document.getElementById("pontos");
const recordeElemento = document.getElementById("recorde");
const tempoElemento = document.getElementById("tempo");
const vidasElemento = document.getElementById("vidas");
const mensagem = document.getElementById("mensagem");

let pontos = 0;
let recorde = 0;
let tempo = 90;
let vidas = 3;
let jogoAtivo = false;

let intervaloToupeira;
let intervaloTempo;

function atualizarVidas() {
    vidasElemento.textContent = "❤️".repeat(vidas);
}

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
    tempo = 90;
    vidas = 3;
    jogoAtivo = true;

    pontosElemento.textContent = pontos;
    tempoElemento.textContent = tempo;
    atualizarVidas();

    mensagem.textContent = "";

    clearInterval(intervaloToupeira);
    clearInterval(intervaloTempo);

    mostrarToupeira();

    // A toupeira muda de lugar a cada 1,5 segundo
    intervaloToupeira = setInterval(mostrarToupeira, 1500);

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

    // Verifica se a pontuação atual é maior que o recorde
    if (pontos > recorde) {
        recorde = pontos;
        recordeElemento.textContent = recorde;
    }

    mensagem.textContent = "Fim de jogo! Pontuação: " + pontos;
}

// Botão começar
botaoComecar.addEventListener("click", iniciarJogo);

// Clique nos buracos
buracos.forEach((buraco) => {
    buraco.addEventListener("click", function () {

        if (!jogoAtivo) {
            return;
        }

        // Se o buraco não tiver uma toupeira, perde uma vida
        if (!buraco.querySelector(".toupeira")) {

            vidas--;

            atualizarVidas();

            mensagem.textContent = "Você clicou no buraco vazio!";

            // Quando chegar a zero vidas
            if (vidas <= 0) {

                finalizarJogo();

                mensagem.textContent =
                    "Fim de jogo! Você perdeu todas as vidas. Pontuação: " + pontos;
            }
        }
    });
});