//Function para verificar de há texto...
function textoValido(texto) {
	if (texto == null || texto == "" || texto.lenght < 1) {
		return false;
	} else {
		return true;
	}
}

//Function para mostrar error...
function mostrarError() {
	var html = "";
	html = '<div class="alert alert-danger" role="alert"> Escreva a tarefa</div>';

	document.getElementById('error').innerHTML = html;
}

//Function for clear this error
function limparError() {
	document.getElementById("error").innerHTML = "";
}

//Function for create to lembrete...
function createRecordatorio() {
	var conteudoTextArea = document.getElementById("texto").value;
	if (!textoValido(conteudoTextArea)) {
		mostrarError();
		return;
	}
	limparError();


	var referencia = new Date();
	var id = referencia.getTime();
	var data = referencia.toLocaleString();
	var texto = conteudoTextArea;

	var recordatorio = {
		"id": id,
		"data": data,
		"texto": texto
	};

	comprovarRecordatorio(recordatorio);

}

function recordatorioValido(recordatorioExistente) {
	if (recordatorioExistente == null || recordatorioExistente == "" || typeof recordatorioExistente == "undefined" || recordatorioExistente == "undefined") {
		return false
	} else {
		return true
	}
}

function comprovarRecordatorio(recordatorio) {
	var recordatorioExistente = localStorage.getItem("recordatorios");
	if (!recordatorioValido(recordatorioExistente)) {
		var recordatorios = [];
		recordatorios.push(recordatorio);
		salvarRecordatorio(recordatorios);
	} else {
		var recordatorioRecuperado = JSON.parse(recordatorioExistente);
		recordatorioRecuperado.push(recordatorio);
		salvarRecordatorio(recordatorioRecuperado);
	}
	mostrarRecordatorio();
}

function salvarRecordatorio(recordatorios) {
	var recordatoriosJSON = JSON.stringify(recordatorios);
	localStorage.setItem("recordatorios", recordatoriosJSON);
}

function formatarRecordatorio(recordatorio) {
	var html = "";
	html = '<div class="recordatorio" id=' + recordatorio.id + '>';
	html += '<div class = "row">';
	html += '<div class="col-6 text-left">'
	html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + recordatorio.data + '</small>';
	html += '</div>';
	html += '<div class="col-6 text-right">';
	html += '<small><i class="fa fa-window-close" aria-hidden="true"></i></small>';
	html += '</div>';
	html += '<br>';
	html += '<div class="row">';
	html += '<div class="col-12">';
	html += +recordatorio.texto;
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<br>';
	return html;
}

function mostrarRecordatorio() {

	var html = "";
	var recordatorioExistente = localStorage.getItem("recordatorios");
	if (!recordatorioValido(recordatorioExistente)) {
		html = "Não existem tarefas";
		document.getElementById("recordatorios").innerHTML = html;

	} else {

		var recordatorioRecuperado = JSON.parse(localStorage.getItem("recordatorios"));
		alert(recordatorioRecuperado.lenght);
		for (var i = 0; i < 2; i++) {
			html += formatarRecordatorio(recordatorioRecuperado[i]);
		}
		document.getElementById("recordatorios").innerHTML = html;
	}
}


//comprovar se está tudo ok...
document.addEventListener('DOMContentLoaded', function () {
	//mostrarError();

	//Chamamos a function createRecordatorio
	document.getElementById("buttomSave").onclick = createRecordatorio;
});