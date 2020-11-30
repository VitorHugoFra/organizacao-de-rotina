package trabTi2;
import spark.Request;
import spark.Response;

public class LoginDAO {

	public DAO dao;
	
	public LoginDAO(DAO dao) {
		
		this.dao = dao; 
	}
	
	public boolean logar(Request request, Response response) {
		
		String login = request.queryParams("username");
		String senha = request.queryParams("password");
		boolean resp = false;
		
		int idUs = dao.searchUser(login, senha); 
		
		response.header("Content-Type", "application/xml");
	    response.header("Content-Encoding", "UTF-8");
		
		if(idUs != -1) {
			
			resp = true;
			response.body("Login do usuario " + idUs + " realizado com sucesso\n");
		} else {
			
			response.body("Falha no login\n");
		}
		
		return resp;
	}
	
	public boolean cadastrar(Request request, Response response) {
		
		String login = request.queryParams("txt_login");
		String senha = request.queryParams("txt_senha");
		String email = request.queryParams("txt_email");
		
		boolean resp = false;
		
		response.header("Content-Type", "application/xml");
	    response.header("Content-Encoding", "UTF-8");
		
		if(dao.createUser(login, senha, email)) {
			
			response.body("Usuario cadastrado com sucesso\n");
			resp = true;
		} else {
			
			response.body("Falha no cadastro\n");
		}
		
		return resp;
	} 
}
