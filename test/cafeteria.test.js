import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";

import { Expreso } from "../models/Expreso.js";
import { Filtrado } from "../models/Filtrado.js";
import { Pasteleria } from "../models/Pasteleria.js";
import { Pedido } from "../models/Pedido.js";

import { pedidos } from "../data/data.js";

describe("1. Tests Unitarios: Modelos y Polimorfismo (calcularPrecio)", () => {
  it("Debe calcular correctamente el precio de un Expreso según tamaño y variedad (Tabla PDF)", () => {

    const expresoBrasil = new Expreso(1, "Expreso", 2500, "Pocillo", "Brasil");
    expect(expresoBrasil.calcularPrecio()).toBe(5020);

    const expresoColombia = new Expreso(2, "Expreso", 2500, "Mediano", "Colombia");
    expect(expresoColombia.calcularPrecio()).toBe(7360);

    const expresoEtiopia = new Expreso(3, "Expreso", 2500, "Taza grande", "Etiopía");
    expect(expresoEtiopia.calcularPrecio()).toBe(11140);
  });

  it("Debe calcular correctamente el precio de un Café Filtrado según tamaño y variedad (Tabla PDF)", () => {

    const filtradoBrasil = new Filtrado(4, "Filtrado", 3200, "Pocillo", "Brasil");
    expect(filtradoBrasil.calcularPrecio()).toBe(4040);

    const filtradoColombia = new Filtrado(5, "Filtrado", 3200, "Mediano", "Colombia");
    expect(filtradoColombia.calcularPrecio()).toBe(5900);

    const filtradoEtiopia = new Filtrado(6, "Filtrado", 3200, "Taza grande", "Etiopía");
    expect(filtradoEtiopia.calcularPrecio()).toBe(9200);
  });

  it("Debe devolver el precioBase directo para productos de Pastelería", () => {
    const muffin = new Pasteleria(7, "Muffin de chocolate", 2500);
    const selvaNegra = new Pasteleria(8, "Torta selva negra", 4200);

    expect(muffin.calcularPrecio()).toBe(2500);
    expect(selvaNegra.calcularPrecio()).toBe(4200);
  });
});

describe("2. Tests de Integración / E2E: Endpoints de la API", () => {
  beforeEach(() => {
    pedidos.length = 0;
  });

  it("GET /productos -> Devuelve la lista de todos los productos disponibles", async () => {
    const res = await request(app).get("/productos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /productos/:id -> Devuelve un producto específico por ID o 404 si no existe", async () => {
    const resTodos = await request(app).get("/productos");
    const primerProducto = resTodos.body[0];

    const res = await request(app).get(`/productos/${primerProducto.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(primerProducto.id);

    const resNoExiste = await request(app).get("/productos/9999");
    expect(resNoExiste.status).toBe(404);
  });

  it("POST /pedidos y GET /pedidos -> Crea un pedido con su total calculado y lo lista", async () => {
    const resProductos = await request(app).get("/productos");
    const prod1 = resProductos.body[0];

    const nuevoPedido = {
      items: [{ productoId: prod1.id, cantidad: 2 }],
      estado: "pendiente"
    };

    const resPost = await request(app).post("/pedidos").send(nuevoPedido);
    expect(resPost.status).toBeGreaterThanOrEqual(200);
    expect(resPost.status).toBeLessThan(300);
    expect(resPost.body).toHaveProperty("total");
    expect(resPost.body.total).toBeGreaterThan(0);

    const resGetPedidos = await request(app).get("/pedidos");
    expect(resGetPedidos.status).toBe(200);
    expect(resGetPedidos.body.length).toBe(1);

    const pedidoCreadoId = resPost.body.id;
    const resGetPorId = await request(app).get(`/pedidos/${pedidoCreadoId}`);
    expect(resGetPorId.status).toBe(200);
    expect(resGetPorId.body.id).toBe(pedidoCreadoId);
  });

  it("GET /reportes/facturacion y GET /reportes/mas-vendido -> Calcula facturación total y el producto estrella", async () => {
    const resProductos = await request(app).get("/productos");
    const prod1 = resProductos.body[0];
    const prod2 = resProductos.body[1];

    const p1 = await request(app)
      .post("/pedidos")
      .send({
        items: [
          { productoId: prod1.id, cantidad: 3 },
          { productoId: prod2.id, cantidad: 1 }
        ]
      });

    const p2 = await request(app)
      .post("/pedidos")
      .send({
        items: [{ productoId: prod1.id, cantidad: 2 }]
      });

    const resFacturacion = await request(app).get("/reportes/facturacion");
    expect(resFacturacion.status).toBe(200);
    const sumaEsperada = p1.body.total + p2.body.total;

    const facturacionDevuelta =
      resFacturacion.body.facturacionTotal ?? resFacturacion.body.total ?? resFacturacion.body;
    expect(facturacionDevuelta).toBe(sumaEsperada);

    const resMasVendido = await request(app).get("/reportes/mas-vendido");
    expect(resMasVendido.status).toBe(200);
    expect(JSON.stringify(resMasVendido.body)).toContain(prod1.nombre);
  });
});