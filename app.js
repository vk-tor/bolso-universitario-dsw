const CHAVE_STORAGE = 'bolso_universitario_gastos';

const formDespesa = document.getElementById('form-despesa');
const campoDescricao = document.getElementById('campo-descricao');
const campoValor = document.getElementById('campo-valor');
const totalGastoEl = document.getElementById('total-gasto');
const contadorEl = document.getElementById('contador-itens');
const listaEl = document.getElementById('lista-despesas');
const msgVaziaEl = document.getElementById('msg-vazia');

let despesas = [];

function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// busca o que ja tava salvo no navegador
function carregarDoStorage() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (dados) {
      despesas = JSON.parse(dados);
      if (!Array.isArray(despesas)) {
        despesas = [];
      }
    }
  } catch (erro) {
    console.error('Erro ao ler dados do localStorage:', erro);
    despesas = [];
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
      const valorNum = Number(gasto.valor) || 0;
      somaTotal += valorNum;

      const li = document.createElement('li');
      li.className = 'item-despesa';

      const divInfo = document.createElement('div');
      divInfo.className = 'info-despesa';

      // usa textContent pra evitar XSS com o que o usuario digitou
      const spanNome = document.createElement('span');
      spanNome.className = 'nome-despesa';
      spanNome.textContent = gasto.descricao;

      divInfo.appendChild(spanNome);

      if (gasto.data) {
        const spanData = document.createElement('span');
        spanData.className = 'data-despesa';
        spanData.textContent = gasto.data;
        divInfo.appendChild(spanData);
      }

      const divAcoes = document.createElement('div');
      divAcoes.className = 'acoes-despesa';

      const spanValor = document.createElement('span');
      spanValor.className = 'valor-despesa';
      spanValor.textContent = formatarMoeda(valorNum);

      const btnRemover = document.createElement('button');
      btnRemover.type = 'button';
      btnRemover.className = 'btn-remover';
      btnRemover.textContent = 'Remover';
      btnRemover.addEventListener('click', () => {
        removerDespesa(gasto.id);
      });

      divAcoes.appendChild(spanValor);
      divAcoes.appendChild(btnRemover);

      li.appendChild(divInfo);
      li.appendChild(divAcoes);

      listaEl.appendChild(li);
    });
  }

  totalGastoEl.textContent = formatarMoeda(somaTotal);

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

  const hoje = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });

  despesas.push({
    id: Date.now().toString(),
    descricao: descricao,
    valor: valor,
    data: hoje
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
