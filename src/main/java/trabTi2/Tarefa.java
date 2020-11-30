package trabTi2;

import java.time.LocalTime;

public class Tarefa {

	private String nome;
	private String[] diasDaSemana;
	private LocalTime horarioInicio;
	private LocalTime horarioFim;
	
	public Tarefa(String nome, String[] diasDaSemana, LocalTime horarioInicio, LocalTime horarioFim) {
		
		this.nome = nome;
		this.diasDaSemana = diasDaSemana;
		this.horarioInicio = horarioInicio;
		this.horarioFim = horarioFim;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String[] getDiasDaSemana() {
		return diasDaSemana;
	}

	public void setDiasDaSemana(String[] diasDaSemana) {
		this.diasDaSemana = diasDaSemana;
	}

	public LocalTime getHorarioInicio() {
		return horarioInicio;
	}

	public void setHorarioInicio(LocalTime horarioInicio) {
		this.horarioInicio = horarioInicio;
	}

	public LocalTime getHorarioFim() {
		return horarioFim;
	}

	public void setHorarioFim(LocalTime horarioFim) {
		this.horarioFim = horarioFim;
	}
}
