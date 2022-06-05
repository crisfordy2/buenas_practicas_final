import React from "react";
import { firebase } from "../firebase";

const Formulario = () => {
  const [lista, setLista] = React.useState([]);
  const [nombre, setNombre] = React.useState("");
  const [color, setColor] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");

  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("cats").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setLista(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const guardarDatos = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !color.trim() || !descripcion.trim()) {
      setError("There are empty fields");
      return;
    }
    try {
      const db = firebase.firestore();
      const newCat = {
        nombre,
        color,
        descripcion,
      };
      await db.collection("cats").add(newCat);
    } catch (error) {
      setError(error);
      console.log(error);
    }

    setModoEdicion(false);
    setNombre("");
    setColor("");
    setDescripcion("");
    setError(null);
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("cats").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const auxEditar = (item) => {
    setModoEdicion(true);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !color.trim() || !descripcion.trim()) {
      setError("There are empty fields");
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection("cats").doc(id).update({
        nombre,
        color,
        descripcion,
      });
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setNombre("");
    setColor("");
    setDescripcion("");
    setModoEdicion(false);
    setError(null);
  };

  const cancelar = () => {
    setNombre("");
    setColor("");
    setDescripcion("");
    setModoEdicion(false);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <h1 className="text-center mx-2 animate__animated animate__backInDown">
          Cats
        </h1>
        <img src="../../gato.png" alt="carro" width={60} />
      </div>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center animate__animated animate__wobble">
            List of cats
          </h4>
          <ul className="list-group">
            {lista.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">
                  {item.nombre} - {item.color} - {item.descripcion}
                </span>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => eliminar(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => auxEditar(item)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Edit Cat" : "Add a new Cat"}
          </h4>
          <form onSubmit={modoEdicion ? editar : guardarDatos}>
            {error ? <span className="alert alert-danger">{error}</span> : null}
            <input
              className="form-control mb-2 "
              type="text"
              placeholder="Enter a name"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />

            <input
              className="form-control mb-2"
              type="text"
              placeholder="Enter a color "
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />

            <input
              className="form-control mb-2"
              type="text"
              placeholder="Generate ramdon description"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            />

            {!modoEdicion ? (
              <button className="btn btn-primary btn-block" type="submit">
                Add
              </button>
            ) : (
              <>
                <button className="btn btn-warning btn-block" type="submit">
                  Edit
                </button>
                <button
                  className="btn btn-dark btn-block mx-2"
                  onClick={() => cancelar()}
                >
                  Cancel
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
