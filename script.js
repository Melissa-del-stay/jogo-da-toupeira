const buracos = document.querySelectorAll(".buraco");
const botaoComecar = document.getElementById("botaoComecar");
const pontosElemento = document.getElementById("pontos");
const recordeElemento = document.getElementById("recorde");
const tempoElemento = document.getElementById("tempo");
const vidasElemento = document.getElementById("vidas");
const mensagem = document.getElementById("mensagem");

let pontos = 0;

// Carrega o recorde salvo no navegador
let recorde = Number(localStorage.getItem("recordeCoelho")) || 0;

let tempo = 90;
let vidas = 3;
let jogoAtivo = false;

let intervaloToupeira;
let intervaloTempo;

// Mostra o recorde salvo quando a página abre
recordeElemento.textContent = recorde;

function atualizarVidas() {
    vidasElemento.textContent = "❤️".repeat(vidas);
}

function mostrarToupeira() {

    buracos.forEach((buraco) => {
        buraco.innerHTML = "";
    });

    const numeroAleatorio = Math.floor(
        Math.random() * buracos.length
    );

    const buracoEscolhido = buracos[numeroAleatorio];

    const toupeira = document.createElement("div");

    toupeira.classList.add("toupeira");

    toupeira.addEventListener("click", function (evento) {

        evento.stopPropagation();

        if (!jogoAtivo) {
            return;
        }

        // Aumenta a pontuação
        pontos++;

        pontosElemento.textContent = pontos;

        // Troca para a imagem do coelho acertado
        toupeira.classList.add("acertado");

        // Impede clicar várias vezes no mesmo coelho
        toupeira.style.pointerEvents = "none";

        // Depois de 300 milissegundos aparece outro coelho
        setTimeout(() => {

            if (jogoAtivo) {
                mostrarToupeira();
            }

        }, 300);
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

    // O coelho muda de lugar a cada 1,5 segundo
    intervaloToupeira = setInterval(
        mostrarToupeira,
        1500
    );

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

    // Verifica se fez novo recorde
    let novoRecorde = false;

    if (pontos > recorde) {

        recorde = pontos;

        // Salva o novo recorde no navegador
        localStorage.setItem("recordeCoelho", recorde);

        // Atualiza o recorde na tela
        recordeElemento.textContent = recorde;

        novoRecorde = true;
    }

    if (novoRecorde) {

        mensagem.innerHTML =
            "🎉 <strong>Fim de jogo!</strong><br>" +
            "🏆 Novo recorde!<br>" +
            "⭐ Pontuação: " + pontos;

    } else {

        mensagem.innerHTML =
            "🎮 <strong>Fim de jogo!</strong><br>" +
            "⭐ Pontuação: " + pontos;
    }
}

// Botão começar
botaoComecar.addEventListener(
    "click",
    iniciarJogo
);

// Clique nos buracos
buracos.forEach((buraco) => {

    buraco.addEventListener("click", function () {

        if (!jogoAtivo) {
            return;
        }

        // Se o buraco estiver vazio, perde uma vida
        if (!buraco.querySelector(".toupeira")) {

            vidas--;

            atualizarVidas();

            mensagem.textContent =
                "Você clicou no buraco vazio!";

            if (vidas <= 0) {

                finalizarJogo();
            }
        }
    });
});