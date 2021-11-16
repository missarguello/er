const News = require("../models/news")
const registro = require("./Registro")

module.exports = class noticia extends registro {
    constructor(req, res) {
        super(req.body.user, req.body.password)
        if (req.body.title == undefined ||
            req.body.subtitle == undefined ||
            req.body.cnoti == undefined ||
            req.body.autor == undefined ||
            req.body.description == undefined ||
            req.file == undefined) {

            res.send("Ingresa correctamente los datos")
            res.end();

        } else {

            this.titulo = req.body.title
            this.subtitulo = req.body.subtitle
            this.cnoti = req.body.cnoti
            this.autor = req.body.autor
            this.desc = req.body.description
            this.filename = req.file.filename
            this.path = "/uploads/" + req.file.filename
            this.orinalname = req.file.originalname
            this.mimetype = req.file.mimetype
            this.size = req.file.size

        }

    }

    async crear(req, res) {

        const user = req.params.user
        const password = req.params.password
        const news = new News({
            titulo: this.titulo,
            subtitulo: this.subtitulo,
            c_noti: this.cnoti,
            autor: this.autor,
            d_noti: this.desc,
            filename: this.filename,
            path: this.path,
            orinalname: this.orinalname,
            mimetype: this.mim,
            size: this.size

        })
        await news.save()
        res.render('upload', { user, password });

    }
    async edit(req, res) {

        const id = req.params.id
        const mostrar_id = await News.findById(id)
        if (id == null) {
            res.send("No existe ese código");
            res.end();
        } else {
            res.render("edit", { mostrar_id })
        }



    }
    async editar(req, res) {

        const valor = req.params.id;
        if (valor) {
            await News.updateOne({ id: valor }, {
                titulo: req.body.title,
                subtitulo: req.body.subtitle,
                c_noti: req.body.cnoti,
                autor: req.body.autor,
                d_noti: req.body.description,

            });
            const mostrar = await News.findOne({ id: valor });
            if (mostrar == null) {
                res.send("No existe ese código");
                res.end();
            } else {
                return res.send("Se ha editado correctamente");
            }
        } else {
            res.send("Debe ingresar el código del case que desea editar");
        }

    }

    async delete(req, res) {
        verificar()
        const codigon = req.params.id;
        await News.deleteOne({ id: codigon });
        await News.find();
        return res.send("Se ha eliminado");
    }


    async mostrar(req, res) {
        verificar()
        const codigo = req.params.id;
        if (codigo) {

            const mostrarm = await News.findOne({ id: codigo });
            if (mostrarm == null) {
                res.send("No existe ese código");
                res.end();
            } else {
                console.log(mostrarm)
                res.render("mostrar", { mostrarm })
                    // res.send("SE MUESTRA UNO");
            }
        } else {
            const mostrart = await News.find();
            res.render("mostrart", { mostrart });
        }
    }
}