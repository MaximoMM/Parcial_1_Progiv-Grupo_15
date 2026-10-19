import Producto from './Producto.js';

export class Expreso extends Producto {
    constructor(id, nombre, precioBase, tamanio, gramosCafe, variedad, precioPorGrama) {
        super(id, nombre, precioBase);
        this.tamanio = tamanio;
        this.gramosCafe = gramosCafe;
        this.variedad = variedad;
        this.precioPorGrama = precioPorGrama;
    }
    calcularPrecio() {
        const costoCafe = this.gramosCafe * this.precioPorGrama;
        return this.precioBase + costoCafe;
    }
}

export default Expreso;