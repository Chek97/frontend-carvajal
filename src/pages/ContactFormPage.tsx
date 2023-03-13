import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export const ContactFormPage = () => {

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    age: "",
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const { name, lastName, email, phone, role, address, age } = form;

  const onHandleChange = (e: ChangeEvent) => {
    setForm({
      ...form,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    });
  }

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if(id){
        await axios.put(`http://localhost:4000/contacts/${id}`,
          JSON.stringify({ ...form, age: +form.age, phone: +form.phone }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success("Contacto actualizado con exito" , {
          duration: 4000,
          position: "top-center"
        });
      }else{
        await axios.post('http://localhost:4000/contacts',
          JSON.stringify({ ...form, age: +form.age, phone: +form.phone }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success("Contacto creado con exito" , {
          duration: 4000,
          position: "top-center"
        });
      }
    } catch (error) {
      toast.error("Ha ocurrido un error" , {
        duration: 4000,
        position: "top-center"
      });
    }
  }

  useEffect(() => {
    const getContactData = async (id: string) => {
      try {
        const response = await axios.get(`http://localhost:4000/contacts/${id}`);
        setForm(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    if (id) getContactData(id);
    setLoading(false);
  }, []);

  return (
    <div className="main-container">
      <header>
        <h1>{id  ? "Actualizar Contacto" : "Registrar Contacto" }</h1>
      </header>
      {
        loading ? (
          <div className="loader">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <form className="login-container" onSubmit={onHandleSubmit}>
            <div className="input-group input-container">
              <input
                type="text"
                className="form-control"
                placeholder="nombres"
                onChange={onHandleChange}
                name="name"
                value={name}
              />
            </div>
            <div className="input-group input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Apellidos"
                onChange={onHandleChange}
                name="lastName"
                value={lastName}
              />
            </div>
            <div className="input-group input-container">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electronico"
                onChange={onHandleChange}
                name="email"
                value={email}
              />
            </div>
            <div className="input-group input-container">
              <input
                type="number"
                className="form-control"
                placeholder="celular"
                onChange={onHandleChange}
                name="phone"
                value={phone}
              />
            </div>
            <div className="input-group input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Rol que ocupa"
                onChange={onHandleChange}
                name="role"
                value={role}
              />
            </div>
            <div className="input-group input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Direccion"
                onChange={onHandleChange}
                name="address"
                value={address}
              />
            </div>
            <div className="input-group input-container">
              <input
                type="number"
                className="form-control"
                placeholder="Edad"
                onChange={onHandleChange}
                name="age"
                value={age}
              />
            </div>
            <div className="input-container">
              <button type="submit" className="btn btn-block btn-login btn-lg">{id ? "Actualizar" : "Registrar"}</button>
            </div>
          </form>
        )
      }
      <Toaster />
    </div>
  )
}
