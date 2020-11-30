package trabTi2;
import spark.Request;
import spark.Response;

public class TarefaDAO {

	public DAO dao;
	
	public TarefaDAO(DAO dao) {
		
		this.dao = dao;
	}
	
	public boolean addTask(Request request, Response response) {
		
		String nome = request.queryParams("nomeTarefa");
		String[] dias = request.queryParamsValues("diaDaSemana");
		String start = request.queryParams("start");
		String end = request.queryParams("end");
		
		boolean resp = false;
		
		response.header("Content-Type", "application/xml");
	    response.header("Content-Encoding", "UTF-8");
		
		if(dao.createTask(nome, dias, start, end)) {
			
			response.body("Tarefa criada com sucesso\n");
			resp = true;
		} else {
			
			response.body("Falha na adicao da tarefa\n");
		}
		
		return resp;
	}
}
