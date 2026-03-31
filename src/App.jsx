import "./App.css";
import TaskList from "./TaskList.jsx";



function App() {
  return (
    <div
      style={{
        backgroundImage: `url("/fondo.jpeg")`, 
        
        backgroundSize: "cover",      
        backgroundPosition: "center",  
        backgroundRepeat: "no-repeat", 
        height: "100vh",             
        width: "100%",
        display: "flex",               
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TaskList />
    </div>
  );
}

export default App;