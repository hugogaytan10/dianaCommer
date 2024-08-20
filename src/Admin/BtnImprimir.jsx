import React from 'react'
import { G, PDFDownloadLink } from '@react-pdf/renderer';
import { ImprimirDoc } from './ImprimirDoc';

export const BtnImprimir = (props) => {
    const {productos,} = props;
    const date = new Date();
    const fecha = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    //console.log(productos)
  return (
        <PDFDownloadLink document={<ImprimirDoc productos={productos}/>} fileName={`Catalogo tennis - ${fecha}`} className='btn bg-white border-2 border-gray-500 text-gray-500'>
            {({ blob, url, loading, error }) =>
                loading ? 'Cargando documento...' : 'Descargar PDF'
            }
        </PDFDownloadLink>
  )
}
