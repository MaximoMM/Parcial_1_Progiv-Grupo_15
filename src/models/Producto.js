class Producto {
    constructor(id, nombre, precioBase) {
        if (this.constructor === Producto) {
            throw new Error("No se puede instanciar la clase abstracta Producto directamente.");
        }
        this.id = id;
        this.nombre = nombre;
        this.precioBase = precioBase;
    }

    
    calcularPrecio() {
        throw new Error("El método calcularPrecio() debe ser implementado por la subclase.");
    }
}

module.exports = Producto;