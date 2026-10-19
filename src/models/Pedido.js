class Pedido {
    constructor(id, items, estado = "pendiente") {
        this.id = id;
        this.items = items; 
        this.estado = estado;
    }

    
    calcularTotal(productosMap) {
        let total = 0;
        for (const item of this.items) {
            const producto = productosMap.get(item.productoId);
            if (producto) {
                total += producto.calcularPrecio() * item.cantidad;
            }
        }
        return total;
    }
}

module.exports = Pedido;