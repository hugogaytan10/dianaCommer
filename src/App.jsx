import "./App.css";
import AppProvider from "./Context/AppContext";
import { Rutas } from "./rutas/rutas";

function App() {
  return (
    <AppProvider>
      <Rutas />
    </AppProvider>
  );
}

export default App;
