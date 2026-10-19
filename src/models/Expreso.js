const Producto = require('./Producto');

class Expreso extends Producto {
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

module.exports = Expreso;