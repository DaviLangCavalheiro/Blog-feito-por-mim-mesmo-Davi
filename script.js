// Seleciona o botão de alternar tema usando o ID
const botaoTema = document.getElementById('botao-tema');

// Adiciona um evento de clique ao botão
botaoTema.addEventListener('click', () => {
    // Liga/desliga a classe 'modo-escuro' no body da página
    document.body.classList.toggle('modo-escuro');
});
