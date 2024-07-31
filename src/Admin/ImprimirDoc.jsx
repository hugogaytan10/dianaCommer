import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Define estilos usando StyleSheet de react-pdf
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: '#fff',
    border: "1px solid #e5e7eb",
    margin: "5px",
    borderRadius: "5px",
    //flexBasis: "100%", // Ajusta según el diseño deseado
    padding: 5,
    width: "30%",
  },
  image: {
    height: "200px",
    width: "100%",
  },
  title: {
    fontSize: 14,
    marginTop: 5,
  },
  conteinerTallas:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  talla:{
    fontSize: 12,
    marginTop: 5,
    border: "1px solid #e5e7eb",
    borderRadius: "100px",
    padding: 10,
  }
});

// Componente que renderiza el PDF
export const ImprimirDoc = ({ productos }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {productos !== undefined &&
          productos.map((producto, index) => (
            <View style={styles.card} key={index}>
              <Image style={styles.image} src={producto.URLImagen} />
              <Text style={styles.title}>{producto.Titulo}</Text>
              <View style={styles.conteinerTallas}>
              {
                //mostrar las tallas
                producto.ListaTallas.map((talla, index) => (
                  <Text key={index} style={styles.talla}>{talla}</Text>
                ))
              }
              </View>
            </View>
          ))}
      </Page>
    </Document>
  );
};
