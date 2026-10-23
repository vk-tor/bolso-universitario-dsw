const formDespesa = document.getElementById('form-despesa');
const campoDescricao = document.getElementById('campo-descricao');
const campoValor = document.getElementById('campo-valor');
const totalGastoEl = document.getElementById('total-gasto');
const listaEl = document.getElementById('lista-despesas');

let despesas = [];

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

  campoDescricao.value = '';
  campoValor.value = '';
  campoDescricao.focus();
}

formDespesa.addEventListener('submit', adicionarDespesa);
