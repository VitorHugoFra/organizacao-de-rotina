package trabTi2;
import static spark.Spark.*;

public class BackEndOGR {
	
	private static DAO dao = new DAO();
	private static LoginDAO loginDao;
	private static TarefaDAO tarefaDao;

	public static void main(String[] args) {
		
		port(6789);
		staticFiles.location("/public");
		
		loginDao = new LoginDAO(dao);
		tarefaDao = new TarefaDAO(dao);
		
		dao.conectar();
		
		//Requisicoes de cadastro e login
		get("/login", (request, response) -> loginDao.logar(request, response));
		get("/cadastro", (request, response) -> loginDao.cadastrar(request, response));
		
		//Requisicoes das tarefas
		get("/addTarefa", (request, response) -> tarefaDao.addTask(request, response));
	}
}
