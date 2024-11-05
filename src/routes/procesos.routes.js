const { Router } = require("express");
const ctrProceso = require("../controllers/proceso.controller");
const routerProcesos = Router();

routerProcesos.get("/datosProcesos/:idCal", ctrProceso.ObtenerProceso);
routerProcesos.post("/agregarProcesos/:idCal", ctrProceso.AgregarProceso);
routerProcesos.put("/actualizarProcesos/:idCal/:idPro", ctrProceso.EditarProceso);
routerProcesos.get("/datoDelProceso/:idCal/:idPro", ctrProceso.ObtenerDatoProceso);
routerProcesos.delete("/eliminarProceso/:idCal/:idPro", ctrProceso.EliminarProceso);
routerProcesos.get("/visualizarProceso", ctrProceso.listarproceso);
routerProcesos.post("/agregarProcesoNuevo", ctrProceso.agregarProcesoNuevo);
routerProcesos.delete("/eliminarProceso/:id", ctrProceso.eliminarProceso);
routerProcesos.put("/actualizarProceso/:id", ctrProceso.actualizarProceso);



module.exports = routerProcesos;