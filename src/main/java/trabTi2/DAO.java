package trabTi2;

import java.sql.*;

public class DAO {

	private Connection conexao;
	private int idConectado;
	
	public DAO() {
		conexao = null;
	}
	
	/*private static Connection getConnection() throws URISyntaxException, SQLException {
		
	    URI dbUri = new URI(System.getenv("postgres://lanagnzasxekvr:a44d0d1a7ba3001c25da8bb68d41d43a09377aa94235b6a92bc9eef6a1c75145@ec2-3-216-92-193.compute-1.amazonaws.com:5432/demfa0qoa42b0l"));

	    String username = dbUri.getUserInfo().split(":")[0];
	    String password = dbUri.getUserInfo().split(":")[1];
	    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

	    return DriverManager.getConnection(dbUrl, username, password);
	}*/
	
	public boolean conectar() {
		        
		String driverName = "org.postgresql.Driver";                    
		String serverName = "ec2-3-216-92-193.compute-1.amazonaws.com";
		String mydatabase = "demfa0qoa42b0l";
		int porta = 5432;
		String url = "jdbc:postgresql://" + serverName + ":" + porta +"/" + mydatabase;
		String username = "lanagnzasxekvr";
		String password = "a44d0d1a7ba3001c25da8bb68d41d43a09377aa94235b6a92bc9eef6a1c75145";
		boolean status = false;
		
		try {
			
			Class.forName(driverName);
			conexao = DriverManager.getConnection(url, username, password);
			status = (conexao == null);
		} catch (ClassNotFoundException e) {
			System.err.println("Conexao nao efetuada com o postgres -- " + e.getMessage());
		} catch (SQLException e) {
			
			System.err.println("Conexao nao efetuada com o postgres -- " + e.getMessage());
		}

		return status;
	}
	
	public boolean close() {
		boolean status = false;
		
		try {
			conexao.close();
			status = true;
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		return status;
	}
	
	public int searchUser(String login, String senha) {
		
		int resp = -1;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT id_usuario, login, senha FROM usuario WHERE login = " + login + "AND senha = " + senha);		
	        if(rs.next()){
	            	             
	        	resp = rs.getInt("id_usuario");
	        } 
	        st.close();
		} catch (Exception e) {}
		
		this.idConectado = resp;
		return resp;
	}
	
	public boolean createUser(String login, String senha, String email) {
		
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO USUARIO (nome, senha, email) "
					       + "VALUES ('"+login+ "', '" + senha + "', '"  
					       + email + "');");
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	public boolean createTask(String nome, String[] dias, String start, String end) {
		
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO TAREFA (nome, dias_da_semana, horario_inicio, horario_fim, id_usuario) "
					       + "VALUES ('"+nome+ ", '" + dias + "', '"  
					       + start + ", '" + end + "', '" + this.idConectado + "');");
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
}
