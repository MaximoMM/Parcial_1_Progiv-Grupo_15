import Producto from './Producto.js';

export class Pasteleria extends Producto {
    constructor(id, nombre, precioBase) {
        super(id, nombre, precioBase);
    }
    calcularPrecio() {
        return this.precioBase;
    }
}

export default Pasteleria;