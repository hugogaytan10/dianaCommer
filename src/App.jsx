import "./App.css";
import AppProvider from "./Context/AppContext";
import { Rutas } from "./rutas/rutas";
window.addEventListener("scroll", function () {
  let elements = document.getElementsByClassName("scroll-content");
  let screenSize = window.innerHeight;

  for (const item of elements) {
    let element = item;

    if (element.getBoundingClientRect().top < screenSize - 50) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  }
});
function App() {
  return (
    <AppProvider>
      <Rutas />
    </AppProvider>
  );
}

export default App;
