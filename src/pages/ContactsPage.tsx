import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { IContact } from "../interfaces/IContact";
import toast, { Toaster } from 'react-hot-toast';

export const ContactsPage = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const onHandleDelete = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number)  => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/contacts/${id}`);
      toast.success("Contacto eliminado con exito" , {
        duration: 4000,
        position: "top-center"
      });
    } catch (error) {
      toast.error("Ha ocurrido un error" , {
        duration: 4000,
        position: "top-center"
      });
    }
  }

  useEffect(() => {
      const getContacts = async () => {
        try {
          const response = await axios.get("http://localhost:4000/contacts");
          setContacts(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      getContacts();
    }, [contacts]);

  return (
    <div className="main-container">
      <header>
        <h1>Lista Contactos</h1>
      </header>
      <div className="list">
        <div className="mb-3">
          <Link to="/create" className="btn btn-login">Nuevo Contacto <i className="fa fa-plus" aria-hidden="true"></i></Link>
        </div>
        {
          loading ? (
            <div className="loader">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table table-hover">
              <thead className="table-head">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Direccion</th>
                  <th>Posicion</th>
                  <th>Edad</th>
                  <th>Telefono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  contacts.map((contact: IContact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.address}</td>
                      <td>{contact.role}</td>
                      <td>{contact.age}</td>
                      <td>{contact.phone}</td>
                      <td colSpan={2} className="d-flex">
                        <Link to={`/create/${contact.id}`} className="btn btn-success mr-3"><i className="fas fa-edit"></i></Link>
                        <button className="btn btn-danger" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onHandleDelete(e, contact.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
      <Toaster />
    </div>
  )
}

