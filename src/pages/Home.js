import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    },[])

    const getAllUsers = async () => {
        await axios.get('http://127.0.0.1:8000/api/users')
        .then((response)=>{
          setUsers(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const deleteUser = async (id) => {
        await axios.delete('http://127.0.0.1:8000/api/users/ '+id)
        .then((response)=>{
            getAllUsers()
        }).catch((error)=>{
            console.log(error)
        })
    }   

    return ( 
        <div className="container">
            <div className="d-flex align-items-center" style={{ height: '100vh' }}>
                <div style={{ width: '100%' }}>
                    <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card text-bg-light mb-3" style={{ width: '35rem' }}>
  <div className="card-header d-grid gap-2"><h5>LISTADO DE USUARIOS</h5> 
  <Link to="/register" className="btn btn-primary border-0">Agregar nuevo</Link>
    </div>
  <div className="card-body">
    <table className="table text-center">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Correo</th>
      <th scope="col">Teléfono</th>
        <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  
        {
            users.map((user, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Eliminar</button>
                        </td>
                    </tr>
                )
            })
        }
    
  </tbody>
</table>
  </div>
</div>
                        </div>
                        </div>
                </div>

                </div>

        </div>
    );
}
export default Home;