import "./App.css";
import AppProvider from "./Context/AppContext";
import { Rutas } from "./rutas/rutas";
import { GoogleOAuthProvider } from '@react-oauth/google';
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
    <GoogleOAuthProvider clientId="976511984237-e0tpe248r6f9hn9vkk70k940fmb8rmc3.apps.googleusercontent.com">
      <AppProvider>
        <Rutas />
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
