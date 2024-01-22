const storedRouter = require("./storedRouter");
const exportRouter = require("./exportRouter");
const authRouter = require("./AuthRouter");

function route(app){
    app.use("/api/stored", storedRouter);
    app.use("/api/export-stored", exportRouter);
    app.use("/api/auth", authRouter);
    app.use("/", function(req, res, next) {res.send("NOT FOUND")});
}

module.exports = route;
