const Anexo = require('../Models/Anexo');

exports.obtenerAnexos = async(req, res) => {
    try {
        const id = req.params.id;
        const anexo = await Anexo.find({ proyecto: id });
        res.json(anexo);
    } catch (error) {
        res.json(error);
    }
};
exports.agregarAnexo = async(req, res) => {
    try {
        const { nombre } = req.body;
        console.log(req.body);

        const nuevoAnexo = new Anexo(req.body);
        console.log(nuevoAnexo);
        await nuevoAnexo.save(); //Guarda en la base de datos
        res.json({ success: true, msj: 'Datos del anexo registrado exitosamente' })

    } catch (error) {
        res.json(error);
    }
};
exports.obtenerAnexo = async(req, res) => {
    try {
        const id = req.params.id;
        const anexo = await Anexo.findById(id);
        res.json(anexo.nombre);
    } catch (error) {
        res.json(error);
    }
};