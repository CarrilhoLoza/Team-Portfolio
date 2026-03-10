const fragmentos = [
  { url: "components/projetos.html", idAlvo: "projetos-container" },
  { url: "components/habilidades.html", idAlvo: "habilidades-container" },
  { url: "components/equipe.html", idAlvo: "equipe-container" },
  { url: "components/contato.html", idAlvo: "contato-container" },
  { url: "components/modais.html", idAlvo: "modais-container" },
];

async function carregarFragmento(url, idAlvo) {
  const alvo = document.getElementById(idAlvo);

  if (!alvo) return;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Falha ao carregar ${url}`);
    }

    alvo.innerHTML = await resposta.text();
  } catch (erro) {
    console.error(erro);
    alvo.innerHTML = `<p class="text-center text-danger py-5">Erro ao carregar o conteudo de ${url}.</p>`;
  }
}

async function initPage() {
  await Promise.all(
    fragmentos.map((fragmento) =>
      carregarFragmento(fragmento.url, fragmento.idAlvo),
    ),
  );

  if (window.AOS) {
    AOS.init();
  }
}

document.addEventListener("DOMContentLoaded", initPage);
