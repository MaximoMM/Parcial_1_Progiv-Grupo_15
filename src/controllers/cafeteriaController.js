import { productos, pedidos } from '../data/data.js';
import Pedido from '../models/Pedido.js';

const getProductosMap = () => new Map(productos.map(p => [p.id, p]));

export const getProductos = (req, res) => {
    res.status(200).json(productos);
};

export const getProductoById = (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(producto);
};

export const crearPedido = (req, res) => {
    const { items } = req.body;
    const nuevoId = pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1;
    
    const nuevoPedido = new Pedido(nuevoId, items, 'pendiente');
    const total = nuevoPedido.calcularTotal(getProductosMap());
    
    pedidos.push(nuevoPedido);
    
    res.status(201).json({
        id: nuevoPedido.id,
        items: nuevoPedido.items,
        estado: nuevoPedido.estado,
        total: total
    });
};

export const getPedidos = (req, res) => {
    res.status(200).json(pedidos);
};

export const getPedidoById = (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.status(200).json(pedido);
};

export const getFacturacion = (req, res) => {
    const productosMap = getProductosMap();
    const totalFacturacion = pedidos.reduce((acc, pedido) => {
        return acc + pedido.calcularTotal(productosMap);
    }, 0);
    res.status(200).json({ facturacionTotal: totalFacturacion });
};

export const getProductoMasVendido = (req, res) => {
    const ventas = {};
    
    pedidos.forEach(pedido => {
        pedido.items.forEach(item => {
            ventas[item.productoId] = (ventas[item.productoId] || 0) + item.cantidad;
        });
    });

    let idMasVendido = null;
    let maxVentas = 0;

    for (const [idStr, cantidad] of Object.entries(ventas)) {
        if (cantidad > maxVentas) {
            maxVentas = cantidad;
            idMasVendido = parseInt(idStr);
        }
    }

    if (!idMasVendido) return res.status(404).json({ error: 'No hay ventas' });

    const productoElegido = productos.find(p => p.id === idMasVendido);
    res.status(200).json({
        producto: productoElegido,
        cantidadVendida: maxVentas
    });
};