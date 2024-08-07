import React, { useRef } from "react";

export const Caliz = () => {
  const formRef = useRef(null); // Create a ref for the form

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyW7znJY5fMHnvpRO5gY89oy9zgsmo2UiGgfJNSPv1InRzsbdTr/exec";

  const submit = async (e) => {
    e.preventDefault();
    const form = formRef.current; // Get the form element
    if (form) {
      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => console.log("Success!", response))
        .catch((error) => console.error("Error!", error.message));
    }
  }

  return (
    <div>
      <form name="submit-form" onSubmit={submit} ref={formRef}> {/* Attach the ref */}
        <input name="nombre" type="text" placeholder="Nombre" required />
        <input name="apellido" type="text" placeholder="Apellido" required />
        <input name="direccion" type="text" placeholder="Direccion" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
