import React from "react";

export const Caliz = () => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyW7znJY5fMHnvpRO5gY89oy9zgsmo2UiGgfJNSPv1InRzsbdTr/exec";
  const form = document.forms["submit-form"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => console.log("Success!", response))
      .catch((error) => console.error("Error!", error.message));
  });
  return (
    <div>
      <form name="submit-form">
        <input name="nombre" type="text" placeholder="Nombre" required />
        <input name="apellido" type="text" placeholder="Apellido" required />
        <input name="direccion" type="text" placeholder="Direccion" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
