//almacenamos la url generica en una variable que podremos reutilizar
const url = "https://playground.4geeks.com/todo";
// igual con el usuario
const myUser = "258sec";

const api = {
  // Crear usuario
  createUser: async () => {
    try {
      const res = await fetch(url + "/users/" + myUser, {
        method: "POST",
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" }
      });
      return res;
    } catch (err) {
      console.log("Error al crear usuario:", err);
      throw err;
    }
  },

  //  Obtener tareas
  getTasks: async () => {
    try {
      const res = await fetch(url + "/users/" + myUser);
      if (!res.ok) throw new Error("Error al obtener tareas");
      const data = await res.json();
      return data.todos;
    } catch (err) {
      console.log("Error al obtener tareas:", err);
      throw err;
    }
  },

  // Añadir tarea
  addTask: async (task) => {
    try {
      const res = await fetch(url + "/todos/" + myUser, {
        method: "POST",
        body: JSON.stringify({ label: task, is_done: false }),
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("Error al añadir tarea");
      return await api.getTasks();
    } catch (err) {
      console.log("Error al añadir tarea:", err);
      throw err;
    }
  },

  // Eliminar tarea
  deleteTask: async (id) => {
    try {
      const res = await fetch(url + "/todos/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar tarea");
      return await api.getTasks();
    } catch (err) {
      console.log("Error al eliminar tarea:", err);
      throw err;
    }
  },

  // Eliminar todas las tareas
  deleteAllTasks: async () => {
    try {
      await fetch(url + "/users/" + myUser, { method: "DELETE" });
      await fetch(url + "/users/" + myUser, {
        method: "POST",
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" }
      });
      return [];
    } catch (err) {
      console.log("Error al limpiar tareas:", err);
      throw err;
    }
  }
};

export default api;