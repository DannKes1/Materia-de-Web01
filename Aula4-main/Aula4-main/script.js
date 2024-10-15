const tarefas = {
    lista: [],

    entradaTarefa: document.getElementById('entradaTarefa'),
    botaoAdicionar: document.getElementById('botaoAdicionar'),
    listaTarefas: document.getElementById('listaTarefas'),

    // Função para adicionar uma nova tarefa
    adicionarTarefa: () => {
            const textoTarefa = tarefas.entradaTarefa.value.trim();
            if (textoTarefa !== '') {
                    // Criar um objeto de tarefa
                    const tarefa = {
                            texto: textoTarefa,
                            concluida: false
                    };
                    // Adicionar ao array de tarefas
                    tarefas.lista.push(tarefa);
                    // Atualizar a exibição das tarefas
                    tarefas.exibirTarefas();
                    // Limpar o campo de entrada
                    tarefas.entradaTarefa.value = '';
                    tarefas.entradaTarefa.focus();
            }
    },

    // Função para exibir as tarefas na lista
    exibirTarefas: () => {
            // Limpar a lista antes de exibir
            tarefas.listaTarefas.innerHTML = '';
            // Iterar sobre o array de tarefas
            tarefas.lista.forEach((tarefa, indice) => {
                    const itemTarefa = document.createElement('li');
                    const texto = document.createElement('span');
                    texto.textContent = tarefa.texto;

                    if (tarefa.concluida) {
                            itemTarefa.classList.add('completed');
                    }

                    // Evento de clique para marcar como concluída
                    texto.addEventListener('click', () => {
                            tarefas.marcarConcluida(indice);
                    });

                    // Botão para remover a tarefa
                    const botaoRemover = document.createElement('button');
                    botaoRemover.textContent = '✖';
                    botaoRemover.addEventListener('click', () => {
                            tarefas.removerTarefa(indice);
                    });

                    itemTarefa.appendChild(texto);
                    itemTarefa.appendChild(botaoRemover);
                    tarefas.listaTarefas.appendChild(itemTarefa);
            });
    },

    // Função para marcar uma tarefa como concluída
    marcarConcluida: (indice) => {
            tarefas.lista[indice].concluida = !tarefas.lista[indice].concluida;
            tarefas.exibirTarefas();
    },

    // Função para remover uma tarefa
    removerTarefa: (indice) => {
            tarefas.lista.splice(indice, 1);
            tarefas.exibirTarefas();
    },

    // Método de inicialização
    init: () => {
            // Adicionar evento de clique ao botão
            tarefas.botaoAdicionar.addEventListener('click', tarefas.adicionarTarefa);

            // Adicionar evento de tecla "Enter" no campo de entrada
            tarefas.entradaTarefa.addEventListener('keyup', (evento) => {
                    if (evento.key === 'Enter') {
                            tarefas.adicionarTarefa();
                    }
            });
    }
};

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    tarefas.init();
});