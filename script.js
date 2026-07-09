// === 1. CONTADOR DE VISITAS PERSISTENTE ===
function inicializarContador() {
    const elementoContador = document.getElementById('contador-visitas');
    let visitas = localStorage.getItem('visitasSimuladas');
    
    if (!visitas) {
        visitas = Math.floor(Math.random() * 2000) + 500; 
    }
    
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('visitasSimuladas', visitas);
    
    elementoContador.textContent = String(visitas).padStart(6, '0');
}

// === 2. SISTEMA DE CURTIDAS PERSISTENTE ===
const btnCurtir = document.getElementById('btn-curtir');
const totalCurtidasTxt = document.getElementById('total-curtidas');

let curtidas = parseInt(localStorage.getItem('totalCurtidas')) || 12;
totalCurtidasTxt.textContent = curtidas;

if (localStorage.getItem('jaCurtiu') === 'true') {
    bloquearBotao();
}

btnCurtir.addEventListener('click', () => {
    curtidas++;
    totalCurtidasTxt.textContent = curtidas;
    
    localStorage.setItem('totalCurtidas', curtidas);
    localStorage.setItem('jaCurtiu', 'true');
    
    bloquearBotao();
});

function bloquearBotao() {
    btnCurtir.disabled = true;
    btnCurtir.textContent = "✓ Curtido";
}

// Inicializa as funções
inicializarContador();