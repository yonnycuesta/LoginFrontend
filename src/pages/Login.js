import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     // Validacion de los campos
     const [validation, setValidation] = useState([]);
     // Navegacion
     const navigate = useNavigate();
 
     // Funcion para crear el usuario
     const loginUser = async (e) => {
         e.preventDefault();
 
         const formData = new FormData();
 
         formData.append('email', email);
         formData.append('password', password);
 
         // Peticion para crear el usuario
 
         await axios.post('http://127.0.0.1:8000/api/login', formData)
         .then((response)=>{
             console.log(response.data);
             localStorage.setItem('token', response.data.token);
             navigate('/home');
         }).catch((error)=>{
            setValidation(error.response.data.errors);
         })
     }

    return ( 
        <div className="container">
        <div className="d-flex align-items-center" style={{ height: '100vh' }}>
            <div style={{ width: '100%' }}>
                <div className="row justify-content-center">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <div className="card text-bg-light mb-3" style={{ width: '20rem' }}>
<div className="card-header bg-primary text-white"><h5>INICIAR SESIÓN</h5></div>
<div className="card-body">
        <form onSubmit={loginUser}>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {
            validation.email && (<small className="text-danger">{validation.email[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {
            validation.password && (<small className="text-danger">{validation.password[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <button className="btn btn-success" type="Submit">Iniciar sesión</button>
        </div>
        <div className="mb-3 d-flex justify-content-between">
            <p>¿No tienes una cuenta? </p>
        <Link to="/register" className="text-muted">Crear cuenta</Link>
        </div>
        </form>
</div>
</div>
                    </div>
                    <div className="col-md-4"></div>
                    </div>
            </div>

            </div>

    </div>
    );
}
export default Login;