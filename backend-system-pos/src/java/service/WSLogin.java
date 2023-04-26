package service;

import dao.DaoLogin;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.xml.ws.Holder;
import model.ModelVendedor;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSLogin")
public class WSLogin {
    
    private DaoLogin loginDao;

@WebMethod(operationName = "validarCredenciales")
public boolean validarCredenciales(@WebParam(name = "email") String email,
        @WebParam(name = "password") String password, 
        @WebParam(name = "user") Holder<List<ModelVendedor>> vendedor) {
    boolean resultado = false;
    try {
        loginDao = new DaoLogin();
        resultado = loginDao.validarCredenciales(email, password, vendedor);
        loginDao.close();
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    return resultado;
}

}
