const { response } = require('express');

const Cliente = require('../models/cliente');

const crearCliente = async(req, res = response) => {

    const { rut } = req.body;
    try {
        
        // Validamos si existe el cliente en la bd
        const existeCliente = await Cliente.findOne({rut});
        if(existeCliente) {
           return res.status(400).json({
               ok: false,
               msj: 'Ya existe un cliente con ese rut'
           });
        }

        const cliente = new Cliente(req.body);
        cliente.save();
        res.status(200).json({
            ok: true,
            cliente
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error de servicio ver log'
        })
    }
}

const getClientes = async(req, res) => {
    try {

        // Obtenemos todos los clientes que estan registrados
        const clientes = await Cliente.find();

        res.status(200).json({
            ok: true,
            clientes
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado ver log'
        })
    }
}

module.exports = {
    crearCliente,
    getClientes
}