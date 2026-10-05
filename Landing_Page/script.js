// MENU MOBILE
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    const aberto = siteNav.classList.toggle('aberto');
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    menuToggle.innerHTML = aberto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        siteNav.classList.remove('aberto');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// NAVEGAÇÃO ATIVA
const secoes = document.querySelectorAll('.observada');

const observadorSecoes = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove('ativo'));
            const linkAtivo = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (linkAtivo) linkAtivo.classList.add('ativo');
        }
    });
}, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
});

secoes.forEach((secao) => observadorSecoes.observe(secao));

// VOLTAR AO TOPO
const voltarTopo = document.getElementById('voltarTopo');

window.addEventListener('scroll', () => {
    voltarTopo.classList.toggle('visivel', window.scrollY > 450);
});

voltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// BUSCA DE PROJETOS
const buscaProjetos = document.getElementById('buscaProjetos');
const projetos = document.querySelectorAll('.projeto-item');
const semResultados = document.getElementById('semResultados');

buscaProjetos.addEventListener('input', () => {
    const termo = buscaProjetos.value.trim().toLowerCase();
    let encontrados = 0;

    projetos.forEach((projeto) => {
        const texto = projeto.innerText.toLowerCase();
        const corresponde = texto.includes(termo);
        projeto.classList.toggle('oculto', !corresponde);
        if (corresponde) encontrados++;
    });

    semResultados.classList.toggle('visivel', encontrados === 0);
});

// MODAL DE PROJETOS
const modal = document.getElementById('modalProjetos');
const modalFechar = document.getElementById('modalFechar');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const modalPeriodo = document.getElementById('modalPeriodo');
const botoesProjeto = document.querySelectorAll('.projeto-botao');

function abrirModal(projeto) {
    modalTitulo.textContent = projeto.dataset.projeto;
    modalDescricao.textContent = projeto.dataset.descricao;
    modalPeriodo.textContent = projeto.dataset.periodo;
    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-aberto');
    modalFechar.focus();
}

function fecharModal() {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-aberto');
}

botoesProjeto.forEach((botao) => {
    botao.addEventListener('click', () => abrirModal(botao.closest('.projeto')));
});

modalFechar.addEventListener('click', fecharModal);
modal.addEventListener('click', (evento) => {
    if (evento.target.hasAttribute('data-fechar-modal')) fecharModal();
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal.classList.contains('aberto')) fecharModal();
});

// FORMULÁRIO DE CONTATO
const formContato = document.getElementById('formContato');
const statusFormulario = document.getElementById('statusFormulario');

formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
        statusFormulario.textContent = 'Preencha todos os campos.';
        statusFormulario.classList.add('visivel');
        return;
    }

    const assunto = encodeURIComponent(`Contato pelo currículo - ${nome}`);
    const corpo = encodeURIComponent(
        `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
    );

    statusFormulario.textContent = 'Abrindo seu aplicativo de e-mail...';
    statusFormulario.classList.add('visivel');

    window.location.href = `mailto:anthonyagarrone@gmail.com?subject=${assunto}&body=${corpo}`;
});

// MODO CLARO / ESCURO
const botaoTema = document.getElementById('botaoTema');
const iconeTema = document.getElementById('iconeTema');

function atualizarTema() {
    const temaClaro = document.body.classList.contains('tema-claro');

    iconeTema.className = temaClaro
        ? 'fa-solid fa-moon'
        : 'fa-solid fa-sun';

    botaoTema.setAttribute(
        'aria-label',
        temaClaro ? 'Ativar modo escuro' : 'Ativar modo claro'
    );

    botaoTema.setAttribute('title', temaClaro ? 'Modo escuro' : 'Modo claro');
}

const temaSalvo = localStorage.getItem('tema-curriculo');
if (temaSalvo === 'claro') {
    document.body.classList.add('tema-claro');
}

atualizarTema();

botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('tema-claro');

    const temaAtual = document.body.classList.contains('tema-claro')
        ? 'claro'
        : 'escuro';

    localStorage.setItem('tema-curriculo', temaAtual);
    atualizarTema();
});
