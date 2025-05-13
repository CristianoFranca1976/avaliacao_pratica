const form = document.getElementById("evaluationForm");
const submitButton = document.getElementById("submitButton");
const mensagem = document.getElementById("mensagem");
const cursosRespostas = {};

const perguntasCurso = {
  patrulhamento: [
    "Conhece cada função de p1, p2, p3 ou p4?",
    "Conhece o conceito de patrulhamento?",
    "Não interferiu no trabalho de outros policiais?"
  ],
  abordagem: [
    "Sabe quando é uma abordagem de rotina e quando é suspeita?",
    "Ele(a) pediu e olhou o ID e o veículo(Documento) do cidadão?",
    "Ele(a) conhece o método da caixa do sexo oposto?"
  ],
  acompanhamento: [
    "Ele(a) sabe iniciar um acompanhamento?",
    "No decorrer do acompanhamento ele(a)?",
    "Ele(a) sabe quando aplicar o codigo 3 e 5?"
  ],
  modulacao: [
    "Ele(a) conhece o codigo Q?",
    "Como modulou?",
    "Respeitou na rádio?"
  ],
  prisional: [
    "Ele(a) leu a lei de miranda?",
    "Ele(a) fez todo o procedimento na sua frente?",
    "Sabe usar o email na prisao?"
  ],
  conduta: [
    "Manteve postura profissional?",
    "Evita discussões desnecessárias?",
    "Mostrou respeito aos colegas e superiores?"
  ]
};

// Comentários por curso > pergunta > resposta
const comentariosCurso = {
  patrulhamento: [
    {
      Sim: "Ele(a) sabe e eu testei em cada posição. P1: conduzia devagar e seguia a orientação de P2. Com o P2, modulou e orientou a patrulha. Não se esquece do P3 e P4",
      Não: "Ele(a) precisa praticar mais e ver o vídeo novamente. Se necessário, refaça o teste teórico."
    },
    {
      Sim: "P1: Presta atenção na estrada, dirigindo no lado certo da rua, com o veículo travado e garantindo a segurança dos ocupantes através do uso do cinto de segurança. P2: Módula, observa, orienta e sabe reconhecer o tipo de ocorrencia",
      Não: "Ele(a) precisa praticar mais e ver o vídeo novamente. Se necessário, refaça o teste teórico."
    },
    {
      Sim: "Manteve a sua posição e não atrapalhou o outro no veículo. (Ex: Estava no P1 e nao modulou).",
      Não: "Modula, marca no mapa as ocorrências ou algo que não faz parte da sua posição na aeronave. (Ex: P2: não estar atento ou não saber o que está a fazendo.)"
    }
  ],
  abordagem: [
    {
      Sim: "Rotina: Arma na mão, sem apontar, sem revistar; Suspeita: Apontar, relatar o motivo e algemar dizendo: \"Para minha  e para a sua segurança, você está sendo algemado!\", P1, P3 e P4 protegeram o P2",
      Não: "Ele(a) não entendeu o procedimento, terá que assistir o vídeo novamente e se necessário refazer a prova teórica."
    },
    {
      Sim: "Ele(a) pediu o ID ou documento do veículo, se tivesse um, e se fosse suspeito, ele fazia perguntas como: De onde está vindo?, Onde eu consegui isso?, Onde você trabalha?",
      Não: "Ela(a) não falou, sem noção de abordar, assistir o vídeo novamente. terá que assistir o vídeo novamente e se necessário refazer a prova teórica."
    },
    {
      Sim: "P 2: Módulou 3 vezes e ofereceu o método da e caixa, se ela negasse, acrescentaria ocultacao de prova. (Você pode algemá-la se ela for suspeita e pode agarrá-la se ela resistir.)",
      Não: "Revistou ou nem sabe como proceder nessa situação. Se necessário, refaça o teste teórico. Ou assitir o video novamente."
    }
  ],
  acompanhamento: [
    {
      Sim: "P2 deu sinal de parada, P1 ativou o giroflex, P2 modulou o tempo todo e P3 e P4 auxiliaram, ele sabe a posição primária, secundária e terceira em um acompanhamento.Sim - Acompanhamento P1: Controle do veículo mantido.",
      Não: "Ele(a) precisa praticar mais e ver o vídeo novamente. Se necessário, refaça o teste teórico."
    },
    {
      Sim: "P1: manteve o controle, não abusou da força. P2: Relatou o tempo do acompanhamento e fez modulação(QTH) com o (QRA), P3 e P4 auxiliaram.",
      Não: "Ele(a) precisa praticar mais e ver o vídeo novamente. Se necessário, refaça o teste teórico."
    },
    {
      Sim: "Após 3 minutos, o código 3 é iniciado e, se estiver armado, ele começa com o código 5. (Se você ainda não consegue atirar, aproxime-se delicadamente da traseira do veículo dele, apenas tente danificar o veículo).",
      Não: "Totalmente perdido ou sem experiência. Se necessário, refaça o teste teórico."
    }
  ],
  modulacao: [
    {
      Sim: "Ele(a) conhece o código Q e sabe como aplicá-lo, ele sabe que é o código Q, e usado na rádio, mas não quando me comunico com o cidadão.",
      Não: "Não sabe ou tem dificuldade. Se necessário, refaça o teste teórico."
    },
    {
      Sim: "Tenho experiência ou entende do procedimento, mesmo com algumas dificuldades foi bem.",
      Não: "Precisa melhorar ou é muita difículdade. Refaça o teste teórico.(Recomendação) "
    },
    {
      Sim: "Não cortou ninguém, não usou nomes feios ou gírias.",
      Não: "Nenhuma conduta na modulação. Se necessário, refaça o teste teórico."
    }
  ],
  prisional: [
    {
      Sim: "Leu corretamente ou tem alguma dificuldade. Precisa melhorar, mande prática mais. ",
      Não: "Não sabe ou tem dificuldade. Se necessário, refaça o teste teórico."
    },
    {
      Sim: "Tirou foto do corpo joelho pra cima e mochila e com máscara. Apreendeu os itens ilegais, manteve a conduta, esperou 10 minutos pelo advogado e utilizou a calculadora criminal.",
      Não: "Ele(a) fez mas fez errado. refaça o teste teórico."
    },
    {
      Sim: "Ele(a) postou uma foto do corpo com o ID e a mochila, mesmo vazia, preencheu todos os campos corretamente e também enviou uma copia para a Polícia Geral..",
      Não: "Dados faltando ou incorretos. Se necessário, refaça o teste teórico."
    }
  ],
  conduta: [
    {
      Sim: "Manteve a postura em todas situações",
      Não: "Falta de respeito, precisa de orientação psicológica."
    },
    {
      Sim: "Ele(a) não se deixou levar pela provocação do cidadão. Manteve sua conduta.",
      Não: "Se irrita facil, problemático."
    },
    {
      Sim: "Na frente do policial, mantendo o respeito e a postura, sem armas em punho, sem atirar dentro da delegacia, sem andar na grama com o VTR.",
      Não: "Sempre inquieto na delegacia, dirigindo e testando carros sem permissão, completamente fora da linha."
    }
  ]
};

const comentarioGenerico = {
  "Já Tem": "Já possui esse curso. Ótimo!"
};

function abrirModal(curso) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalTitulo").innerText = curso.charAt(0).toUpperCase() + curso.slice(1);
  document.getElementById("modalForm").dataset.curso = curso;

  const perguntas = perguntasCurso[curso];
  document.querySelectorAll("#modalForm .pergunta label").forEach((label, index) => {
    label.textContent = `${index + 1}. ${perguntas[index]}`;
  });

  document.querySelectorAll("#modalForm select").forEach(s => s.value = "");
  document.getElementById("comentarioResposta").style.display = "none";
}

function fecharModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

function fecharComentario() {
  document.getElementById("comentarioResposta").style.display = "none";
}

document.querySelectorAll("#modalForm select").forEach((select, index) => {
  select.addEventListener("change", (e) => {
    const valor = e.target.value;
    const curso = document.getElementById("modalForm").dataset.curso;

    let comentario = comentarioGenerico[valor] || "";
    if (valor === "Sim" || valor === "Não") {
      const cursoComentarios = comentariosCurso[curso];
      if (cursoComentarios && cursoComentarios[index] && cursoComentarios[index][valor]) {
        comentario = cursoComentarios[index][valor];
      }
    }

    document.getElementById("comentarioTexto").textContent = comentario;
    document.getElementById("comentarioResposta").style.display = "block";
  });
});

document.getElementById("modalForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const curso = e.target.dataset.curso;
  const respostas = [...e.target.querySelectorAll("select")].map(s => s.value);

  if (respostas.includes("")) {
    alert("Responda todas as perguntas.");
    return;
  }

  cursosRespostas[curso] = respostas;
  fecharModal();
  validarFormulario();
});

function validarFormulario() {
  mensagem.textContent = "";

  const camposObrigatorios = [
    "qraTestado",
    "idTestado",
    "comentario",
    "instrutorNome",
    "instrutorId"
  ];

  let valido = true;

  camposObrigatorios.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo.value || (id.includes("Id") && /\D/.test(campo.value))) {
      valido = false;
    }
  });

  const cursos = Object.keys(perguntasCurso);
  cursos.forEach(curso => {
    if (!cursosRespostas[curso] || cursosRespostas[curso].length !== 3) {
      valido = false;
    }
  });

  submitButton.className = valido ? "verde" : "amarelo";
  return valido;
}

form.addEventListener("input", validarFormulario);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validarFormulario()) {
    submitButton.className = "vermelho";
    mensagem.textContent = "Preencha todos os campos corretamente e avalie todos os cursos.";

    setTimeout(() => {
      submitButton.className = "amarelo";
      mensagem.textContent = "";
    }, 3000);
    return;
  }

  const cursos = {};
  const listaCursos = Object.keys(perguntasCurso);
  let aprovadoGeral = true;

  listaCursos.forEach(curso => {
    const respostas = cursosRespostas[curso];
    const reprovado = respostas.includes("Não");
    cursos[curso.charAt(0).toUpperCase() + curso.slice(1)] = reprovado ? "Reprovado" : "Aprovado";
    if (reprovado) aprovadoGeral = false;
  });

  const dados = {
    qraTestado: document.getElementById("qraTestado").value,
    idTestado: document.getElementById("idTestado").value,
    instrutorNome: document.getElementById("instrutorNome").value,
    instrutorId: document.getElementById("instrutorId").value,
    cursos: cursos
  };

  const payload = {
    content: `**Resultado da Avaliação**
Testado: ${dados.qraTestado} | ID: ${dados.idTestado}
Instrutor: ${dados.instrutorNome} | ID: ${dados.instrutorId}
Cursos:
${Object.entries(dados.cursos).map(([curso, status]) => `- ${curso}: ${status}`).join("\n")}
`
  };

  try {
    await fetch("https://discord.com/api/webhooks/1371905111395401848/rdeF6R9k8PbuPAgMLIxVf8b62M15aPL809uAwFksFPWmWFWkTMveG7C7-9jCXh2NywE2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    mensagem.textContent = "Enviado com sucesso!";
    mensagem.style.color = "green";
    form.reset();
    Object.keys(cursosRespostas).forEach(c => delete cursosRespostas[c]);
    submitButton.className = "amarelo";
  } catch (err) {
    mensagem.textContent = "Erro ao enviar para o Discord.";
    mensagem.style.color = "red";
  }
});
