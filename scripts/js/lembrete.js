// Página inicial de Login
const LOGIN_URL = "Login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

function showList() { // mostra a lista de todo
    if (todoList.length > 0) {
        const htmlTemp = ` 
        ${
            todoList.map(function (todoItem){ 
                if(todoItem.autor == usuarioCorrente.login){
                    
                    return `
                    <li class="list-group-item" style="color:black; opacity:0.8;"data-id="${todoItem.id}" data-done="${todoItem.done}">
                    <h5 class="mb-1">Tarefa: ${todoItem.nome}</h5>
                        Dia: ${todoItem.dataLem}<br>
                        Hora: ${todoItem.time}<br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" data-id="${todoItem.id}" >
                            <label class="form-check-label" for="inlineCheckbox1">Tarefa feita</label>
                        </div>
                        <p>Clique pra excluir</p>
                    </li>`;
                }
            })
        }`;
        todoOutput.innerHTML = htmlTemp;
    } else {
        todoOutput.innerHTML = 'Nenhum lembretes';
    }
}

function saveList() { // converte os dados em string e salva no local storage
    localStorage.setItem('lembretes', JSON.stringify(todoList));
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
        showList();
        saveList();
    }
    if (e.target.localName === 'input') { // e.target.dataset.done = !e.target.dataset.done === 'true';
        let query = todoList[e.target.dataset.id].id;

        for (let i = 0; i < todoList.length; i += 1) {
            if (todoList[i].id === query) { // remove 1 elemento na posição i;
                todoList[i].done = true;

                // voltando o indice no array para validar novamente a lista
                i = 0;
            }
        }
        showList();
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

function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}

onload = () => {

    verificar();
    document.getElementById('nomeUsuario').innerHTML = usuarioCorrente.login;

    const date_picker_element = document.querySelector('.date-picker');
    const selected_date_element = document.querySelector('.date-picker .selected-date');
    const dates_element = document.querySelector('.date-picker .dates');
    const mth_element = document.querySelector('.date-picker .dates .month .mth');
    const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
    const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
    const days_element = document.querySelector('.date-picker .dates .days');
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];
    const time_picker_element = document.querySelector('.time-picker');

    const hr_element = document.querySelector('.time-picker .hour .hr');
    const min_element = document.querySelector('.time-picker .minute .min');

    const hr_up = document.querySelector('.time-picker .hour .hr-up');
    const hr_down = document.querySelector('.time-picker .hour .hr-down');

    const min_up = document.querySelector('.time-picker .minute .min-up');
    const min_down = document.querySelector('.time-picker .minute .min-down');




    todoOutput = document.getElementById('tasks-output');
    if (localStorage.getItem('lembretes')) {
        todoList = JSON.parse(localStorage.getItem('lembretes'));
        showList();
    } else {
        todoList = [];
    }

    if (todoList.length === 0) {
        todoOutput.innerHTML = 'Nenhum lembretes';
    }
    /* let numTasks;
    numTasks = localStorage.getItem('numTasks');
    if (numTasks == null) {

        numTasks = 0;
        localStorage.setItem('numTasks', numTasks);
    }
*/
    document.getElementById('addTask').addEventListener('submit', onSubmit);
    todoOutput.addEventListener('click', clickList);

    function onSubmit(e) {

        const lembretes = {};
        lembretes.nome = nome.value;
        lembretes.txtResumo = txtResumo.value;
        lembretes.dataLem = dateFun();
        lembretes.time = dateTime();
        lembretes.date = new Date();
        lembretes.id = todoList.length;
        lembretes.done = false;
        lembretes.autor = usuarioCorrente.login;

        // adicionando a task na lista
        todoList.push(lembretes);

        saveList();
        showList();
        // utiliza o preventDefault para evitar do form realizar o reload da página
        e.preventDefault();
    };

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let selectedDate = date;
    let selectedDay = day;
    let selectedMonth = month;
    let selectedYear = year;

    mth_element.textContent = months[month] + ' ' + year;

    selected_date_element.textContent = formatDate(date);
    selected_date_element.dataset.value = selectedDate;

    populateDates();

    // EVENT LISTENERS
    date_picker_element.addEventListener('click', toggleDatePicker);
    next_mth_element.addEventListener('click', goToNextMonth);
    prev_mth_element.addEventListener('click', goToPrevMonth);
    //    days_element.addEventListener('click', elementPick);

    // FUNCTIONS
    let dateFun = () => {
        return selectedDay + '/' + months[selectedMonth] + '/' + selectedYear;

    }

    function toggleDatePicker(e) {

        if (!checkEventPathForClass(e.path, 'dates')) {
            dates_element.classList.toggle('active');

        }
    }

    function goToNextMonth(e) {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function goToPrevMonth(e) {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function populateDates(e) {
        days_element.innerHTML = '';
        let amount_days = 31;

        if (month == 1) {
            amount_days = 28;
        }

        for (let i = 0; i < amount_days; i++) {
            const day_element = document.createElement('div');
            day_element.classList.add('day');
            day_element.textContent = i + 1;

            if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
                day_element.classList.add('selected');
            }

            day_element.addEventListener('click', function () {
                selectedDate = new Date(year + '-' + (
                    month + 1
                ) + '-' + (
                    i + 1
                ));
                selectedDay = (i + 1);
                selectedMonth = month;
                selectedYear = year;

                selected_date_element.textContent = formatDate(selectedDate);
                selected_date_element.dataset.value = selectedDate;

                populateDates();
            });

            days_element.appendChild(day_element);
        }
    }

    // HELPER FUNCTIONS
    function checkEventPathForClass(path, selector) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains(selector)) {
                return true;
            }
        }

        return false;
    }

    function formatDate(d) {
        let day = d.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        let month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        let year = d.getFullYear();

        return day + ' / ' + month + ' / ' + year;

    }
    // time
    let d = new Date();

    let hour = d.getHours();
    let minute = d.getMinutes();
    setTime();

    // EVENT LISTENERS
    hr_up.addEventListener('click', hour_up);
    hr_down.addEventListener('click', hour_down);

    min_up.addEventListener('click', minute_up);
    min_down.addEventListener('click', minute_down);

    hr_element.addEventListener('change', hour_change);
    min_element.addEventListener('change', minute_change);

    function hour_change(e) {
        if (e.target.value > 23) {
            e.target.value = 23;
        } else if (e.target.value < 0) {
            e.target.value = '00';
        }

        if (e.target.value == "") {
            e.target.value = formatTime(hour);
        }

        hour = e.target.value;
    }

    function minute_change(e) {
        if (e.target.value > 59) {
            e.target.value = 59;
        } else if (e.target.value < 0) {
            e.target.value = '00';
        }

        if (e.target.value == "") {
            e.target.value = formatTime(minute);
        }

        minute = e.target.value;
    }

    function hour_up() {
        hour++;
        if (hour > 23) {
            hour = 0;
        }
        setTime();
    }
    let dateTime = () => {
        return hour + ':' + minute;

    }

    function hour_down() {

        hour--;
        if (hour < 0) {
            hour = 23;
        }
        setTime();
    }

    function minute_up() {
        minute++;
        if (minute > 59) {
            minute = 0;
            hour++;
        }
        setTime();
    }

    function minute_down() {
        minute--;
        if (minute < 0) {
            minute = 59;
            hour--;
        }
        setTime();
    }

    function setTime() {
        hr_element.value = formatTime(hour);
        min_element.value = formatTime(minute);
        time_picker_element.dataset.time = formatTime(hour) + ':' + formatTime(minute);
    }

    function formatTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

};