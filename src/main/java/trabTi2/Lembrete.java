package trabTi2;

import java.time.*;

public class Lembrete {

	private String nome;
	private LocalDate data;
	private LocalTime hora;
	
	public Lembrete() {
		
		nome = "";
		data = LocalDate.now();
		hora = LocalTime.now();
	}
	
	public Lembrete(String nome, LocalDate dia, LocalTime hora) {
		
		this.nome = nome;
		this.data = dia;
		this.hora = hora;
	}
}
