const { Schema, model } = require("mongoose");


const AnexoSchema = new Schema({
    
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        autopopulate: true
    },
    
    nombreDocumento: {
        type: String,
        required: true
    }
});

AnexoSchema.plugin(require('mongoose-autopopulate'));
module.exports = model("Anexo", AnexoSchema);