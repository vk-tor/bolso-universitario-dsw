const formDespesa = document.getElementById('form-despesa');
const campoDescricao = document.getElementById('campo-descricao');
const campoValor = document.getElementById('campo-valor');
const totalGastoEl = document.getElementById('total-gasto');
const listaEl = document.getElementById('lista-despesas');

let despesas = [];

// recria a lista na tela e recalcula o total
function atualizarTela() {
  listaEl.textContent = '';

  let somaTotal = 0;

  despesas.forEach((gasto) => {
    somaTotal += gasto.valor;

    const li = document.createElement('li');
    li.className = 'item-despesa';

    // usa textContent pra evitar XSS com o que o usuario digitou
    const spanNome = document.createElement('span');
    spanNome.className = 'nome-despesa';
    spanNome.textContent = gasto.descricao;

    const spanValor = document.createElement('span');
    spanValor.className = 'valor-despesa';
    spanValor.textContent = 'R$ ' + gasto.valor.toFixed(2).replace('.', ',');

    li.appendChild(spanNome);
    li.appendChild(spanValor);

    listaEl.appendChild(li);
  });

  totalGastoEl.textContent = 'R$ ' + somaTotal.toFixed(2).replace('.', ',');
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

  atualizarTela();

  campoDescricao.value = '';
  campoValor.value = '';
  campoDescricao.focus();
}

formDespesa.addEventListener('submit', adicionarDespesa);
