import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  card: {
    backgroundColor: '#ffffff',
    border: "1pt solid #e5e7eb",
    margin: 5,
    borderRadius: 5,
    padding: 5,
    width: "30%",
    height: 180,
    boxSizing: "border-box",
  },
  image: {
    height: 100,
    width: "100%",
  },
  title: {
    fontSize: 14,
    marginTop: 5,
  },
  conteinerTallas: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  talla: {
    fontSize: 8,
    marginTop: 5,
    border: "0.7pt solid #e5e7eb",
    borderRadius: 10,
    padding: 4,
    textAlign: "center",
    width: 20, // Tamaño fijo o ajustable
  },
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
                  <Text key={index} style={styles.talla}>{talla.Talla}</Text>
                ))
              }
              </View>
            </View>
          ))}
      </Page>
    </Document>
  );
};
