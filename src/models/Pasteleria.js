const Producto = require('./Producto');

class Pasteleria extends Producto {
    constructor(id, nombre, precioBase) {
        super(id, nombre, precioBase);
    }

    calcularPrecio() {
        return this.precioBase;
    }
}

module.exports = Pasteleria;