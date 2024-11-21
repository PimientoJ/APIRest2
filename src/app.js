const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const conexionDB = require("./db.conexion");
const fileupdates = require("express-fileupload");
const routerUser = require("./routes/users.routes");
const routerCalendar = require("./routes/calendars.routes");
const routerRol = require("./routes/rols.routes");
const routerProceso = require("./routes/procesos.routes");
const routerProyecto = require("./routes/proyectos.routes");
const routerAnexo = require("./routes/anexo.routes");

//Configure los archivos dotenv

const app = express();

//Conexion a la base de datos
conexionDB();

//settings
app.set("name", "APIrest");
app.set("port", process.env.PORT || 3500);

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(fileupdates({
    createParentPath: true
}));
app.use(cors({
    origin: ['http://localhost:4200', 'http://146.190.62.222',  'http://146.190.62.222:4200' ],

}));


//Llamado de rutas
app.use(express.static("public"));
app.use("/api/seira", routerUser);
app.use("/api", routerCalendar);
app.use("/api", routerRol);
app.use("/api", routerProceso);
app.use("/api", routerProyecto);
app.use("/api", routerAnexo);

module.exports = app;