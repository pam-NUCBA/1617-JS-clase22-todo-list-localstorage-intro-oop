const precio = 2000
const descuento = 15
const cantidad = 10

const precioTotal = (precio, descuento, cantidad) => {
    let total = ((precio * descuento) / 100) * cantidad
    console.log(total)
}

precioTotal(precio, descuento, cantidad)