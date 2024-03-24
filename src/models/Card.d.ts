export type Card = {
    Id?: number;
    Titulo: string;
    Descripcion: string;
    PrecioAquisicion: number;
    PrecioVenta: number;
    Descuento: number;
    Estado: string;
    Stock: number;
    URLImagen: string;
    ImagenesCarrusel: string[];
    ListaTallas: string[];
}