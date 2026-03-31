import React, { useState, useEffect } from "react";
import api from "./api.jsx";


function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  //creamos una variable para mostrar errores al usuario
  const [error, setError] = useState("");
    //Usamos useEffect para cargar las tareas y crear usuario
  useEffect(() => {
    const load = async () => {
      try {
        //pedimos a la api que cree el user
        await api.createUser();
        //esperamos las tareas y las almacenamos en data
        const data = await api.getTasks();
        //una vez tenemos las tareas de la api actualizamos la variable
        setTasks(data);
        //manejamos errores con catch
      } catch (err) {
        console.log("Error cargando las tareas:", err.message);
        setError("Error cargando tareas,intentelo mas tarde");
      }
    };
    load();
  }, []);

  const handleAddTask = async () => {
    // si hay alguna tarea en el input se ejecuta
    if (!inputValue) return;
    try {
      //enviamos el valor a la api
      const newTasks = await api.addTask(inputValue);
      //actualizamos la lista con la tarea nueva
      setTasks(newTasks);
      // devolvemos al input su valor original 
      // para poder repetir el proceso
      setInputValue("");
    } catch {
      setError("Error al añadir tarea");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const newTasks = await api.deleteTask(id);
      setTasks(newTasks);
    } catch {
      setError("Error al eliminar tarea");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await api.deleteAllTasks();
      setTasks([]);
    } catch {
      setError("Error al limpiar tareas");
    }
  };
      //Interfaz grafica
  return (
   <div className="container-fluid vh-100 d-flex align-items-center ">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card p-4"  style={{
    backgroundColor: "rgba(0,0,0,0.6)", // gris oscuro semi-transparente
    color: "white",                     // texto visible sobre fondo oscuro
    borderRadius: "10px",
    backdropFilter: "blur(5px)",       // efecto blur opcional
  }}>
        <h1 className=" customTittle text-center mb-4 fw-bold text-white">
          TASK LIST
        </h1>

        {error && <p className="text-danger">{error}</p>}

        <div className="input-group mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="form-control"
            placeholder="Añadir tarea..."
          />
          <button
            className="btn btn-primary"
            onClick={handleAddTask}
            disabled={!inputValue}
          >
            Agregar
          </button>
        </div>

        <ul className="list-group mb-3">
                    {/* si la lista esta vacia*/}
          {tasks.length === 0 && <li className="list-group-item">No hay tareas</li>}
                    {/* Mapeamos tasks */}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task.label}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTask(task.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
          {/* Cuando haya elementos en la lista se muestra el boton*/}
        {tasks.length > 0 && (
          <button className="btn btn-warning w-100" onClick={handleDeleteAll}>
            Limpiar todo
          </button>
        )}
        </div>
        </div>
      </div>
      </div>
   
  );
}

export default TaskList;