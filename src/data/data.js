import Expreso from '../models/Expreso.js';
import Filtrado from '../models/Filtrado.js';
import Pasteleria from '../models/Pasteleria.js';

export const pedidos = [];
export const productos = [];

export const productosData = [
  { tipo: "Expreso", tamaño: "Pocillo", gramos: 18, variedad: "Brasil", precioPorG: 140, base: 2500 },
  { tipo: "Expreso", tamaño: "Pocillo", gramos: 18, variedad: "Colombia", precioPorG: 180, base: 2500 },
  { tipo: "Expreso", tamaño: "Pocillo", gramos: 18, variedad: "Etiopía", precioPorG: 240, base: 2500 },
  { tipo: "Expreso", tamaño: "Mediano", gramos: 27, variedad: "Brasil", precioPorG: 140, base: 2500 },
  { tipo: "Expreso", tamaño: "Mediano", gramos: 27, variedad: "Colombia", precioPorG: 180, base: 2500 },
  { tipo: "Expreso", tamaño: "Mediano", gramos: 27, variedad: "Etiopía", precioPorG: 240, base: 2500 },
  { tipo: "Expreso", tamaño: "Taza grande", gramos: 36, variedad: "Brasil", precioPorG: 140, base: 2500 },
  { tipo: "Expreso", tamaño: "Taza grande", gramos: 36, variedad: "Colombia", precioPorG: 180, base: 2500 },
  { tipo: "Expreso", tamaño: "Taza grande", gramos: 36, variedad: "Etiopía", precioPorG: 240, base: 2500 },
  { tipo: "Filtrado", tamaño: "Pocillo", gramos: 6, variedad: "Brasil", precioPorG: 140, base: 3200 },
  { tipo: "Filtrado", tamaño: "Pocillo", gramos: 6, variedad: "Colombia", precioPorG: 180, base: 3200 },
  { tipo: "Filtrado", tamaño: "Pocillo", gramos: 6, variedad: "Etiopía", precioPorG: 240, base: 3200 },
  { tipo: "Filtrado", tamaño: "Mediano", gramos: 15, variedad: "Brasil", precioPorG: 140, base: 3200 },
  { tipo: "Filtrado", tamaño: "Mediano", gramos: 15, variedad: "Colombia", precioPorG: 180, base: 3200 },
  { tipo: "Filtrado", tamaño: "Mediano", gramos: 15, variedad: "Etiopía", precioPorG: 240, base: 3200 },
  { tipo: "Filtrado", tamaño: "Taza grande", gramos: 25, variedad: "Brasil", precioPorG: 140, base: 3200 },
  { tipo: "Filtrado", tamaño: "Taza grande", gramos: 25, variedad: "Colombia", precioPorG: 180, base: 3200 },
  { tipo: "Filtrado", tamaño: "Taza grande", gramos: 25, variedad: "Etiopía", precioPorG: 240, base: 3200 },
  { tipo: "Pasteleria", nombre: "Muffin de chocolate", precioFinal: 2500 },
  { tipo: "Pasteleria", nombre: "Torta selva negra", precioFinal: 4200 }
];

let idCounter = 1;
productosData.forEach(item => {
    if (item.tipo === "Expreso") {
        productos.push(new Expreso(idCounter++, "Café Expreso", item.base, item.tamaño, item.gramos, item.variedad, item.precioPorG));
    } else if (item.tipo === "Filtrado") {
        productos.push(new Filtrado(idCounter++, "Café Filtrado", item.base, item.tamaño, item.gramos, item.variedad, item.precioPorG));
    } else if (item.tipo === "Pasteleria") {
        productos.push(new Pasteleria(idCounter++, item.nombre, item.precioFinal));
    }
});