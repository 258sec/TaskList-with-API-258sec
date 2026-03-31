import "./App.css";
import TaskList from "./TaskList.jsx";



function App() {
  return (
    <div
      style={{
        backgroundImage: `url("/fondo.jpeg")`, // desde /public
        backgroundSize: "cover",       // cubre toda la pantalla
        backgroundPosition: "center",  // centrada
        backgroundRepeat: "no-repeat", // no se repite
        height: "100vh",               // altura de la ventana
        width: "100%",
        display: "flex",               // para centrar contenido
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TaskList />
    </div>
  );
}

export default App;