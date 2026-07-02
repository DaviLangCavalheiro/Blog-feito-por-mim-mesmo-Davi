// === 1. CONTADOR DE VISITAS RETRÔ ===
// Gera um número aleatório de visitas baseado no horário atual apenas para simular o painel girando antigo
function inicializarContador() {
    const elementoContador = document.getElementById('contador-visitas');
    // Pega um número base ou cria um
    let visitas = localStorage.getItem('visitasSimuladas');
    
    if (!visitas) {
        visitas = Math.floor(Math.random() * 5000) + 1200; // Começa com um número alto pra parecer popular!
    }
    
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('visitasSimuladas', visitas);
    
    // Formata com zeros à esquerda (ex: 004321)
    elementoContador.textContent = String(visitas).padStart(6, '0');
}

// === 2. SISTEMA DE CURTIDAS ===
const btnCurtir = document.getElementById('btn-curtir');
const totalCurtidasTxt = document.getElementById('total-curtidas');
let curtidas = 12; // Valor inicial na tela

btnCurtir.addEventListener('click', () => {
    curtidas++;
    totalCurtidasTxt.textContent = curtidas;
    btnCurtir.disabled = true; // Só deixa curtir uma vez por sessão igual antigamente
    btnCurtir.textContent = "✅ Obrigado pelo voto!";
});

// === 3. LIVRO DE VISITAS (COMENTÁRIOS) ===
const formComentario = document.getElementById('form-comentario');
const listaComentarios = document.getElementById('lista-comentarios');

// Carregar comentários já existentes salvos no navegador
function carregarComentarios() {
    const salvos = JSON.parse(localStorage.getItem('meusComentarios')) || [];
    salvos.forEach(comentario => {
        adicionarNaTela(comentario.nome, comentario.texto);
    });
}

// Função auxiliar para colocar a estrutura HTML do comentário na caixinha
function adicionarNaTela(nome, texto) {
    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comentario-item');
    novoComentario.innerHTML = `<strong>${nome}:</strong> ${texto}`;
    // Adiciona no topo da lista para ficar visível na hora
    listaComentarios.insertBefore(novoComentario, listaComentarios.firstChild);
}

// Evento de envio do formulário de comentário
formComentario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede a página de recarregar sumindo com tudo
    
    const nomeInput = document.getElementById('nome-usuario').value;
    const textoInput = document.getElementById('texto-comentario').value;
    
    // Adiciona na tela imediatamente
    adicionarNaTela(nomeInput, textoInput);
    
    // Salva no localStorage para não sumir ao dar F5
    const salvos = JSON.parse(localStorage.getItem('meusComentarios')) || [];
    salvos.push({ nome: nomeInput, texto: textoInput });
    localStorage.setItem('meusComentarios', JSON.stringify(salvos));
    
    // Limpa os campos do formulário para o próximo escrever
    formComentario.reset();
});

// Executa as funções assim que a página abre
inicializarContador();
carregarComentarios();