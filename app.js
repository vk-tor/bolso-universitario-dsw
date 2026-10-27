const CHAVE_STORAGE = 'bolso_universitario_gastos';

const formDespesa = document.getElementById('form-despesa');
const campoDescricao = document.getElementById('campo-descricao');
const campoValor = document.getElementById('campo-valor');
const totalGastoEl = document.getElementById('total-gasto');
const contadorEl = document.getElementById('contador-itens');
const msgVaziaEl = document.getElementById('msg-vazia');
const listaEl = document.getElementById('lista-despesas');

let despesas = [];

// busca o que ja tava salvo no navegador
function carregarDoStorage() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  if (dados) {
    despesas = JSON.parse(dados);
  }
}

function salvarNoStorage() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(despesas));
}

// recria a lista na tela e recalcula o total
function atualizarTela() {
  listaEl.textContent = '';

  let somaTotal = 0;

  if (despesas.length === 0) {
    msgVaziaEl.style.display = 'block';
  } else {
    msgVaziaEl.style.display = 'none';

    despesas.forEach((gasto) => {
    somaTotal += gasto.valor;

    const li = document.createElement('li');
    li.className = 'item-despesa';

    // usa textContent pra evitar XSS com o que o usuario digitou
    const spanNome = document.createElement('span');
    spanNome.className = 'nome-despesa';
    spanNome.textContent = gasto.descricao;

    const divAcoes = document.createElement('div');
    divAcoes.className = 'acoes-despesa';

    const spanValor = document.createElement('span');
    spanValor.className = 'valor-despesa';
    spanValor.textContent = 'R$ ' + gasto.valor.toFixed(2).replace('.', ',');

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', () => {
      removerDespesa(gasto.id);
    });

    divAcoes.appendChild(spanValor);
    divAcoes.appendChild(btnRemover);

    li.appendChild(spanNome);
    li.appendChild(divAcoes);

      listaEl.appendChild(li);

    });
  }

  totalGastoEl.textContent = 'R$ ' + somaTotal.toFixed(2).replace('.', ',');

  const qtd = despesas.length;
  contadorEl.textContent = qtd === 1 ? '1 despesa registrada' : `${qtd} despesas registradas`;
}

function adicionarDespesa(evento) {
  evento.preventDefault();

  const descricao = campoDescricao.value.trim();
  const valor = parseFloat(campoValor.value);

  if (!descricao || isNaN(valor) || valor <= 0) {
    return;
  }

  despesas.push({
    id: Date.now().toString(),
    descricao: descricao,
    valor: valor
  });

  salvarNoStorage();
  atualizarTela();

  campoDescricao.value = '';
  campoValor.value = '';
  campoDescricao.focus();
}

function removerDespesa(id) {
  despesas = despesas.filter((item) => item.id !== id);
  salvarNoStorage();
  atualizarTela();
}

formDespesa.addEventListener('submit', adicionarDespesa);

// inicializa carregando os dados salvos
carregarDoStorage();
atualizarTela();
