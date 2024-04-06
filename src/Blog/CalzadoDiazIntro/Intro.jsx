import React from "react";
import { SectionBlog } from "../SectionBlog";
import { Carrusel } from "../../Home/Carrusel/Carrusel";
export const Intro = () => {
  return (
    <main className="w-3/4 m-auto">
      <SectionBlog
        title={"Calzado Diaz Moroleón, Guanajuato"}
        text={
          "Calzado Diaz es una empresa que se dedica a la venta de zapatos de todo tipo. Cuenta con una amplia variedad de modelos y tallas. Además, ofrece un excelente servicio al cliente y precios competitivos. En este blog, te contaremos todo lo que necesitas saber sobre Calzado Diaz y sus productos."
        }
      />
      <Carrusel />
      <SectionBlog
        title={"Confort Sin Comprometer Estilo"}
        text={
          "Entendemos que el confort es clave. Por eso, nuestros zapatos no solo se ven bien, sino que se sienten bien. Con tecnología innovadora en amortiguación y materiales de primera, aseguramos que tus pasos sean tan cómodos como estilizados."
        }
      />
      <SectionBlog
        title={"Visita Virtual a Nuestra Tienda"}
        text={
          "Nuestra plataforma online te permite navegar por nuestra amplia gama de productos, ofreciendo una experiencia de compra personalizada. Cada zapato viene con una descripción detallada y recomendaciones de estilismo, acercando la esencia de Moroleón a cada clic."
        }
      />
      <SectionBlog
        title={""}
        text={
          "No hay necesidad de buscar lejos para encontrar zapatos que prometen elevar tu vestuario. Nuestra tienda en línea ofrece lo mejor de Moroleón a tus pies. Invitamos a locales y visitantes a descubrir la magia detrás de cada par y a caminar con nosotros hacia un futuro de moda innovadora y sostenible."
        }
      />
    </main>
  );
};
