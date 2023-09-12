class Pedido{
    constructor(cliente, mesa, descricao){
        this.id = this.gerarId();
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
    }

  gerarId(){
    return Math.floor(Math.random() * 1000);
  }
}

class PedidoService{
    constructor(){
        this.pedidos = [];
    }

    adcionarPedido(parametro){
        this.pedidos.push(parametro);
    }

    listarPedidos(){
        return this.pedidos;
    }

    listarPedidossPorId(parametro) {
        return this.pedidos.find((pedido) => pedido.id == parametro);
      }

    atualizarPedido(id, cliente, mesa, descricao){
        const pedido = this.listarPedidosPorId(id);

        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;

        return pedido;
    }

    deletarPedido(parametro){
        return (this.pedidos = this.pedidos.filter(
            (pedido) => pedido.id != parametro
        ));
    }
}

const pedidoService = new PedidoService();

function criarPedido(){
    const cliente = document.getElementById("cliente").value;
    const mesa = document.getElementById("mesa").value;
    const descricao = document.getElementById("descricao").value;

    const novoPedido = new Pedido(cliente, mesa, descricao);

    pedidoService.adcionarPedido(novoPedido);

    listarPedidos();
    limparInputs();
    inputEmBranco();
   // console.log(pedidoService.pedidos);
}

function listarPedidos(){
    const pedidos = pedidoService.listarPedidos();

   const elementoLista = document.getElementById("listarPedidos");
   elementoLista.innerHTML = "";

    let content = "";

    pedidos.forEach((pedido) => {
        content = `
        <div id="card-detalhe">
        <p>ID:${pedido.id}</p>
        <p>Cliente:${pedido.cliente}</p>
        <p>Mesa:${pedido.mesa}</p>
        <p>Descrição:${pedido.descricao}</p>
        <button onclick="atualizarPedido(${pedido.id})">Editar</button>
        <button onclick="deletarPedido(${pedido.id})">Deletar</button>
        </div>
        `;
    });

    elementoLista.innerHTML = content;
    //document.getElementById("listarPedidos").innerHTML = content;
}

let aux = null;

/*function atualizarPedido(id){
    const pedido = pedidoService.listarPedidosPorId(id);

    document.getElementById("cliente").value = pedido.nome;
    document.getElementById("mesa").value = pedido.mesa;
    document.getElementById("descricao").value = pedido.descricao;

  document.getElementById("botaoCadastrar").classList.add("hidden");
  document.getElementById("botaoEditar").classList.remove("hidden");
}*/

function editarPedido(){
    const cliente = document.getElementById("cliente").value;
    const mesa = document.getElementById("mesa").value;
    const descricao = document.getElementById("descricao").value;

    pedidoService.atualizarPedido(aux, cliente, mesa, descricao);

    listarPedidos();

    document.getElementById("botaoCadastrar").classList.remove("hidden");
    document.getElementById("botaoEditar").classList.add("hidden");
  
    limparInputs();
  
    aux = null;
}

function atualizarPedido(id) {
    const pedido = pedidoService.listarPedidossPorId(id);
  
    document.getElementById("cliente").value = pedido.cliente;
    document.getElementById("mesa").value = pedido.mesa;
    document.getElementById("descricao").value = pedido.descricao;
  
    document.getElementById("botaoCadastrar").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");
  
    aux = id;
  }

function limparInputs(){
    document.getElementById("cliente").value = "";
    document.getElementById("mesa").value = "";
    document.getElementById("descricao").value = "";
}

function inputEmBranco(){
    if(document.getElementById("cliente", "mesa", "descricao").value = ""){
        return false
}
}

function deletarPedido(id){
    pedidoService.deletarPedido(id)

    listarPedidos();
}