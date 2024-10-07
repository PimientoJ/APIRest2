const { Router } = require("express");
const ctrAnexo = require("../controllers/anexo.controller");
const routeAnexo = Router();

routeAnexo.get("/datosAnexos/:idProject", ctrAnexo.obtenerAnexos);
routeAnexo.get("/datoAnexo/:id", ctrAnexo.obtenerAnexo);
routeAnexo.post("/registarAnexo", ctrAnexo.agregarAnexo);

module.exports = routeAnexo;