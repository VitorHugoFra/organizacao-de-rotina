const LOGIN_URL = "Login.html";


let todoList;
let todoListLembrete;
let todoOutput;
let todoOutputLembrete;
var usuarioCorrente = {};

var week = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
]

function formatDate(date) { // formata a data para o formato DD/MM/YYYY
    const time = new Date(date);
    return `${
        time.getDate()
    }/${
        time.getMonth()
    }/${
        time.getFullYear()
    }`;
}

function saveList() { // converte os dados em string e salva no local storage
    localStorage.setItem('resumo', JSON.stringify(todoList));
}

function saveListRemember() { // converte os dados em string e salva no local storage
    localStorage.setItem('lembretes', JSON.stringify(todoListLembrete));
}

function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}

function showResumo() { // mostra a lista de todo
    if (todoList.length > 0) {
        const htmlTemp = ` 
       
        
       ${
            todoList.map(function (todoItem) {
                if (todoItem.autor == usuarioCorrente.login) {
                    return `<li class="list-group-item" style="color:black; opacity:0.8;"data-id="${
                        todoItem.id
                    }" data-done="${
                        todoItem.done
                    }">
                    Resumo: ${
                        todoItem.nome
                    }
                    <br>
                    Descrição: ${
                        todoItem.descricao
                    }
                    <br>
                    Input: ${
                        todoItem.input
                    }
                    <p>Clique pra excluir</p>
                    </li><br>`;
                }
            })
        }`;
        todoOutput.innerHTML = htmlTemp;
    } else {
        todoOutput.innerHTML = 'Nenhum resumo cadastrada';
    }
}

function showList() { // mostra a lista de todo
    if (todoListLembrete.length > 0) {
        const htmlTemp = ` 
        ${
            todoListLembrete.map(function (todoItem) {
                if (todoItem.autor == usuarioCorrente.login) {

                    return `
                    <li class="list-group-item" style="color:black; opacity:0.8;"data-id="${
                        todoItem.id
                    }" data-done="${
                        todoItem.done
                    }">
                    <h5 class="mb-1">Tarefa: ${
                        todoItem.nome
                    }</h5>
                        Dia: ${
                        todoItem.dataLem
                    }<br>
                        Hora: ${
                        todoItem.time
                    }<br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" data-id="${
                        todoItem.id
                    }" >
                            <label class="form-check-label" for="inlineCheckbox1">Tarefa feita</label>
                        </div>
                        <p>Clique pra excluir</p>
                    </li><br>`;
                }
            })
        }`;
        todoOutputLembrete.innerHTML = htmlTemp;
    } else {
        todoOutputLembrete.innerHTML = 'Nenhum lembretes';
    }
}


function clickList(e) {
    if (e.target.localName === 'li') { // e.target.dataset.done = !e.target.dataset.done === 'true';
        let query = todoList[e.target.dataset.id].id;

        for (let i = 0; i < todoList.length; i += 1) {
            if (todoList[i].id === query) { // remove 1 elemento na posição i;
                todoList.splice(i, 1);
                // voltando o indice no array para validar novamente a lista
                i = 0;
            } else {
                todoList[i].id = i;
            }
        }
        showResumo();
        saveList();
    }

}
let verificar = () => {
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }
    if (!usuarioCorrente.login) {
        window.location.href = LOGIN_URL;
    }
}
let initResume = () => {
    todoOutput = document.getElementById('tasks-output');
    if (localStorage.getItem('resumo')) {
        todoList = JSON.parse(localStorage.getItem('resumo'));
        showResumo();
    } else {
        todoList = [];
    }

    if (todoList.length === 0) {
        todoOutput.innerHTML = 'Nenhum resumo cadastrado';
    }
}
let initRemember = () => {
    todoOutputLembrete = document.getElementById('tasks-output-Lembrete');
    if (localStorage.getItem('lembretes')) {
        todoListLembrete = JSON.parse(localStorage.getItem('lembretes'));

        showList();

    } else {
        todoListLembrete = [];
    }

    if (todoListLembrete.length === 0) {
        todoOutputLembrete.innerHTML = 'Nenhum lembretes';
    }
}


function clickListLembrete(e) {


    if (e.target.localName === 'li') { // e.target.dataset.done = !e.target.dataset.done === 'true';
        let query = todoListLembrete[e.target.dataset.id].id;

        for (let i = 0; i < todoListLembrete.length; i += 1) {
            if (todoListLembrete[i].id === query) { // remove 1 elemento na posição i;
                todoListLembrete.splice(i, 1);
                // voltando o indice no array para validar novamente a lista
                i = 0;
            } else {
                todoListLembrete[i].id = i;
            }
        }
        showList();
        saveListRemember();
    }
    if (e.target.localName === 'input') { // e.target.dataset.done = !e.target.dataset.done === 'true';
        let query = todoListLembrete[e.target.dataset.id].id;

        for (let i = 0; i < todoList.length; i += 1) {
            if (todoListLembrete[i].id === query) { // remove 1 elemento na posição i;
                todoListLembrete[i].done = true;

                // voltando o indice no array para validar novamente a lista
                i = 0;
            }
        }
        showList();
        saveListRemember();

    }
}
let initTask = () => {
    let aux = `<div class="alert alert-danger" role="alert" style="width: 100%; margin-bottom: 0px;">
    Sem hora marcada. Adicione acima!
  </div>`;
    document.getElementById('sunday').innerHTML = aux;
    document.getElementById('monday').innerHTML = aux;
    document.getElementById('tuesday').innerHTML = aux;
    document.getElementById('wednesday').innerHTML = aux;
    document.getElementById('thursday').innerHTML = aux;
    document.getElementById('friday').innerHTML = aux;
    document.getElementById('saturday').innerHTML = aux;
}
onload = () => {
    verificar();


    document.getElementById('nomeUsuario').innerHTML = usuarioCorrente.login;

    initResume();
    initRemember();
    initTask();
    todoOutput.addEventListener('click', clickList);
    todoOutputLembrete.addEventListener('click', clickListLembrete);

    let numTasks = localStorage.getItem('numTasks');

    if (numTasks != null) {

        let c = 0;
        while (c < numTasks) {


            let task = JSON.parse(localStorage.getItem('task' + c));
            if (task != null) {

                let tarefa = `<li class="list-group-item">${
                    task.start
                } - ${
                    task.end
                } | ${
                    task.nome
                } <a href="#" onclick="localStorage.removeItem('task${c}'); location.reload();">- Remover tarefa</a></li>`;
                let d = 0;

                while (d < task.days.length) {

                    switch (task.days[d]) {

                        case 'domingo':

                            if (week[0]) {
                                document.getElementById('sunday').innerHTML += tarefa;
                            } else {
                                week[0] = true;
                                document.getElementById('sunday').innerHTML = tarefa;
                            }
                            break;
                        case 'segunda':
                            if (week[1]) {
                                document.getElementById('monday').innerHTML += tarefa;
                            } else {
                                week[1] = true;
                                document.getElementById('monday').innerHTML = tarefa;
                            }
                            break;
                        case 'terca':
                            if (week[2]) {
                                document.getElementById('tuesday').innerHTML += tarefa;
                            } else {
                                week[2] = true;
                                document.getElementById('tuesday').innerHTML = tarefa;
                            }

                            break;
                        case 'quarta':
                            if (week[3]) {
                                document.getElementById('wednesday').innerHTML += tarefa;
                            } else {
                                week[3] = true;
                                document.getElementById('wednesday').innerHTML = tarefa;
                            }
                            break;
                        case 'quinta':
                            if (week[4]) {
                                document.getElementById('thursday').innerHTML += tarefa;
                            } else {
                                week[4] = true;
                                document.getElementById('thursday').innerHTML = tarefa;
                            }
                            break;
                        case 'sexta':
                            if (week[5]) {
                                document.getElementById('friday').innerHTML += tarefa;
                            } else {
                                week[5] = true;
                                document.getElementById('friday').innerHTML = tarefa;
                            }
                            break;
                        case 'sabado':
                            if (week[6]) {
                                document.getElementById('saturday').innerHTML += tarefa;
                            } else {
                                week[6] = true;
                                document.getElementById('saturday').innerHTML = tarefa;
                            }
                            break;
                    }

                    d++;
                }
            }
            c++;
        }
    }
}