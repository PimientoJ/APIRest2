const Calendario = require('../Models/Calendario');
const Procesos = require('../Models/Procesos');

exports.listarproceso = async(req, res) => {
    try {
        const proceso = await Procesos.find({estado: true});
        res.json(proceso);
    } catch (error) {
        res.json(error);
    }
};

exports.findProceso = async(req, res) => {
    try {
        if (req.params.idProc) {
            const idProc = req.params.idProc;
            const proceso = await Procesos.findById(idProc);
            res.json(proceso);
        } else {
            res.status(400).json({ error: 'Se debe enviar el id del proceso' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.ObtenerProceso = async(req, res) => {
    try {
        if (req.params.idCal) {
            const idCal = req.params.idCal;
            const calendario = await Calendario.findById(idCal);
            res.json(calendario.proceso);
        } else {
            res.status(400).json({ error: 'Se debe enviar el id del calendario' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.AgregarProceso = async(req, res) => {
    try {
        if (req.params.idCal && req.body) {
            const idCal = req.params.idCal;
            const proceso = req.body;
            console.log(idCal, proceso);
            const aggProceso = await Calendario.findById(idCal, { proceso: proceso });
            console.log("Calendario:", aggProceso);
            aggProceso.proceso.push(proceso); //agg un nuevo objeto en el arreglo de calendario
            await aggProceso.save();
            res.json({ isOk: true });
        } else {
            res.status(400).json({ error: 'Datos incompletos' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.EliminarProceso = async(req, res) => {

    try {
        if (req.params.idCal && req.params.idPro) {
            const idCal = req.params.idCal;
            const idPro = req.params.idPro;
            const calendario = await Calendario.findById(idCal);

            for (let index = 0; index < calendario.proceso.length; index++) {
                /*  console.log(calendario.proceso[index]);*/
                if (calendario.proceso[index]._id == idPro) {
                    calendario.proceso.splice(index, 1);
                }
            }
            await calendario.save();
            res.json({ isOk: true });

        } else {
            res.status(400).json({ error: "Debe ingresar el id del calendario y del proceso a eliminar" });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}
exports.ObtenerDatoProceso = async(req, res) => {
    try {
        if (req.params.idCal && req.params.idPro) {
            const idCal = req.params.idCal;
            const idPro = req.params.idPro;
            const calendario = await Calendario.findById(idCal);

            for (let index = 0; index < calendario.proceso.length; index++) {
                if (calendario.proceso[index]._id == idPro) {
                    res.json(calendario.proceso[index]);
                }
            }
        } else {
            res.status(400).json({ error });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}
exports.EditarProceso = async(req, res) => {

    try {
        if (req.params.idCal && req.params.idPro && req.body) {
            const idCal = req.params.idCal;
            const idPro = req.params.idPro;
            const data = req.body;
            const calendario = await Calendario.findById(idCal);

            for (let index = 0; index < calendario.proceso.length; index++) {
                if (calendario.proceso[index]._id == idPro) {
                    Object.assign(calendario.proceso[index], data);
                }
            }
            await calendario.save();
            res.json({ isOk: true });

        } else {
            res.status(400).json({ error: "Debe ingresar todos los datos" });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

//Agregar un dato a la tabla de procesos 
exports.agregarProcesoNuevo = async(req, res) => {
    try {
        const nombre = req.body;
        const procesoExists = await Procesos.findOne({ nombre: req.body.nombre });

        if (procesoExists) {
            console.log("procesoExists", procesoExists.estado);
            if (procesoExists.estado) {
                res.json({ success: false, msj: 'El proceso ya existe' })
            } else {
                await Procesos.findByIdAndUpdate(procesoExists.id, { estado: true });
                res.json({ success: true, msj: 'Datos del proceso registrado exitosamente' })
            }

        } else {
            const nuevoDatoProceso = new Procesos(req.body);
            await nuevoDatoProceso.save(); //Guarda en la base de datos
            res.json({ success: true, msj: 'Datos del proceso registrado exitosamente' })
        }

    } catch (error) {
        res.json(error);
    }
};

//Metodo para eliminar datos de la tabla procesos
exports.eliminarProceso = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const eliminar = await Procesos.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msj: "Dato eliminado satisfactoriamente", isOk: true });
    } catch (error) {
        res.status(200).json("Error");
    }
};

    //Actualizar el nombre del proceso
    exports.actualizarProceso = async(req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            await Procesos.findByIdAndUpdate(id, data);
            res.json({ success: true, msj: "Se actualizado exitosamente" });
        } catch (error) {
            res.json(error);
        }
    
    };