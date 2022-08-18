import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";


function Register() {

    // Declaracion de constantes
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // Validacion de los campos
    const [validation, setValidation] = useState([]);

    // Navegacion
    const navigate = useNavigate();

    // Funcion para crear el usuario

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        // Peticion para crear el usuario

        await axios.post('http://127.0.0.1:8000/api/register', formData)
        .then(()=>{
            navigate('/');
        }).catch((error)=>{
           setValidation(error.response.data.errors);
        })
    }

    return ( 
        <div className="container">
            <div className="d-flex align-items-center" style={{ height: '100vh' }}>
                <div style={{ width: '100%' }}>
                    <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card text-bg-light mb-3" style={{ width: '28rem' }}>
  <div className="card-header bg-primary text-white">
    <h4>CREAR CUENTA</h4>
  </div>
  <div className="card-body">
    <form onSubmit={createUser}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        {
            validation.name && (<small className="text-danger">{validation.name[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {
            validation.email && (<small className="text-danger">{validation.email[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <label htmlFor="phone" className="form-label">Teléfono</label>
        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {
            validation.phone && (<small className="text-danger">{validation.phone[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {
            validation.password && (<small className="text-danger">{validation.password[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <label htmlFor="password_confirmation" className="form-label">Repetir Contraseña</label>
        <input type="password" className="form-control" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        {
            validation.password_confirmation && (<small className="text-danger">{validation.password_confirmation[0]}</small>)
        }
        </div>
        <div className="mb-3">
        <button className="btn btn-success" type="Submit">Registrarse</button>
        </div>
        <div className="mb-3 d-flex justify-content-between">
            <p className="">¿Tienes una cuenta? </p>
        <Link to="/" className="text-muted">Inicia sesión</Link>
        </div>
       
        </form>
  </div>
</div>
                        </div>
                        </div>
                </div>

                </div>

        </div>
    );
}
export default Register;