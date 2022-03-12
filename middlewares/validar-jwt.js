const  jwt  = require("jsonwebtoken");


const validarJWT = (req, res, next) => {
    // Obtenemos el token de los header
    const token = req.header('x-token');

    // Validamos que venga el token
    if(!token) {
        return res.status(401).json({
            ok: false,
            msj: 'No hay token en la peticion'
        });
    }

    try {
        // Validamos que sea un token correcto
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        // Asignamos el uid del usuario
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error no esperado revisar log'
        })
    }
}

module.exports = {
    validarJWT
}