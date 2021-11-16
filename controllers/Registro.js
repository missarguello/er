const Registro = require("../models/registro");

module.exports = class registro {
    constructor(req, res) {
        const user = req.body.user;
        const password = req.body.password;
        if (!user || !password) {
            return res.send("Ingrese la información correctamente.");
        } else {
            (this.user = user), (this.password = password);
        }
    }

    async crear_usuario(req, res) {

        const usern = await Registro.findOne({ user: req.body.user });
        if (usern) {
            return res.send("Ya existe ese user");
        } else {
            const registro = new Registro({
                user: this.user,
                password: this.password,
            });
            await registro.save();

            return res.send("Guardado con exito");
        }
    }

    async verificar(req, res) {
        console.log("holaaaa")
        const user = req.params.user;
        const password = req.params.password;

        if (!user && !password) {
            res.send(
                "Debe registrarse primero, antes de ejecutar cualquier operación"
            );
            res.end();
        } else {
            const usern = await Registro.findOne({ user });
            if (usern) {
                if (usern.password !== password) {
                    if (!password) {
                        res.send("Ingresa la contraseña.");
                        res.end();
                    } else {
                        res.send("Clave erronea");
                        res.end();
                    }
                } else {
                    next();
                }
            } else {
                res.send("No existe ese usuario");
                res.end();
            }
        }
    }
};