const { Schema, model } = require("mongoose");

const ProcesosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = model("Procesos", ProcesosSchema);