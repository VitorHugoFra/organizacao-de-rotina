var pomodoro = {
    started: false,
    resume: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    init: function () {
        var self = this;
        this.minutesDom = document.querySelector("#minutes");
        this.secondsDom = document.querySelector("#seconds");
        this.fillerDom = document.querySelector("#filler");
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector("#work").onclick = function () {
            self.startWork.apply(self);
        };
        document.querySelector("#shortBreak").onclick = function () {
            self.startShortBreak.apply(self);
        };
        document.querySelector("#longBreak").onclick = function () {
            self.startLongBreak.apply(self);
        };
        document.querySelector("#stop").onclick = function () {
            self.stopTimer.apply(self);
        };
    },
    resetVariables: function (mins, secs, started, resume) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.resume = resume;

        this.fillerIncrement = 200 / (this.minutes * 60);
        this.fillerHeight = 0;
    },
    startWork: function () {

        this.resetVariables(25, 0, true, true); // 25
    },
    startShortBreak: function () {
        this.resetVariables(5, 0, true, false);
    },
    startLongBreak: function () {
        this.resetVariables(15, 0, true, false);
    },
    stopTimer: function () {
        this.resetVariables(25, 0, false, false);
        this.updateDom();
    },
    toDoubleDigit: function (num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },
    updateDom: function () {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + "px";
    },
    intervalCallback: function () {
        if (!this.started)
            return false;



        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },
    Resumo: function () {

        var popup = document.getElementById('popup')
        popup.classList.toggle('active')
    },

    timerComplete: function () {
        var audio = new Audio("assets/audio/ding.mp3");
        audio.addEventListener("canplaythrough", function () {
            audio.play();
        });
        if (this.resume) {
            this.Resumo();
        }
        this.started = false;
        this.fillerHeight = 0;
    }


};
// Página inicial de Login
const LOGIN_URL = "Login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

let todoList;
let todoOutput;

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

function showList() { // mostra a lista de todo
    if (todoList.length > 0) {
        const htmlTemp = `<ul>
            ${
            todoList.map(todoItem => `<li data-id="${
                todoItem.id
            }" data-done="${
                todoItem.done
            }">${
                todoItem.descricao
            } - ${
                formatDate(todoItem.date)
            }</li>`)
        }
            </ul><button>Limpar tarefas realizadas</button>`;
        todoOutput.innerHTML = htmlTemp;
    } else {
        todoOutput.innerHTML = 'Nenhuma tarefa cadastrada';
    }
}

function saveList() { // converte os dados em string e salva no local storage
    localStorage.setItem('resumo', JSON.stringify(todoList));
}

function clearList() { // varre a lista a procura de tarefas realizadas
    for (let i = 0; i < todoList.length; i += 1) {
        if (todoList[i].done === 'true') { // remove 1 elemento na posição i;
            todoList.splice(i, 1);
            // voltando o indice no array para validar novamente a lista
            i = 0;
        } else {
            todoList[i].id = i;
        }
    }
    // showList();
    saveList();
}

function clickList(e) { // somente fazer algo quando clicar em um item li
    if (e.target.localName === 'li') {
        e.target.dataset.done = !e.target.dataset.done === 'true';
        todoList[e.target.dataset.id].done = e.target.dataset.done;
        saveList();
    } else if (e.target.localName === 'button') {
        clearList();
    }
}


function onSubmit(e) {
    const task = {};

    // pego o valor cadastrado no primeiro input do meu form
    task.nome = nome.value;
    task.input = inputGroupFile01.value;
    task.descricao = txtResumo.value;
    task.date = new Date();
    task.id = todoList.length;
    task.autor = usuarioCorrente.login;
    // adicionando a task na lista
    todoList.push(task);
    saveList();
    // showList();

    var popup = document.getElementById('popup')
    popup.classList.toggle('active')
    // utiliza o preventDefault para evitar do form realizar o reload da página
    e.preventDefault();
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

function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}
window.addEventListener('load', () => {
    verificar();
    pomodoro.init();
    document.getElementById('nomeUsuario').innerHTML = usuarioCorrente.login;
    // guarda em uma variável o elemento tasks-output
    todoOutput = document.getElementById('tasks-output');
    if (localStorage.getItem('resumo')) {
        todoList = JSON.parse(localStorage.getItem('resumo'));
        // showList();
    } else {
        todoList = [];
    }

    if (todoList.length === 0) { // todoOutput.innerHTML = 'Nenhuma tarefa cadastrada';
    }
    // adiciona o listener para o evento submit, utilizei form para usar o required do input HTML
    document.getElementById('myform').addEventListener('submit', onSubmit);
    // todoOutput.addEventListener('click', clickList);
});