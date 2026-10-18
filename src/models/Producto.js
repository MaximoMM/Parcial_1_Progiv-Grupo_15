class Producto {
    constructor(id, nombre, precioBase) {
        if (this.constructor === Producto) {
            throw new Error("No se puede instanciar la clase abstracta Producto.");
        }
        this.id = id;
        this.nombre = nombre;
        this.precioBase = precioBase;
    }

    calcularPrecio() {
        throw new Error("Método calcularPrecio() debe ser implementado.");
    }
}

module.exports = Producto;