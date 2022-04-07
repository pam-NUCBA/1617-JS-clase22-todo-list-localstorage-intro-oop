const producto = {
    precio: 2000,
    descuento: 15,
    cantidad: 10,
    precioTotal: function() {
        let total = ((this.precio * this.descuento) / 100) * this.cantidad
        console.log(total)
    }
}

producto.precioTotal()