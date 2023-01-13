import express from "express";

import env from "dotenv";
env.config()

import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";

// membuat variabel app untuk memanggil express
const app = express();

// membuat variabel port 
const { PORT } = process.env;

//** membuat default middleware //
// membuat express json
app.use(express.json());

// membuat express urlencoded
app.use(express.urlencoded(
    {
        extended: false,
    }
));
// membuat express static yang akan diletakkan di folder public 
app.use(express.static(path.join(__dirname, "./public")));

// membuat cookies
app.use(cookieParser());

// membuat view engine yang akan diletakkan di folder views
app.set("views", path.join(__dirname, "./views"));

// membuat handlebars
app.set("view engine", "handlebars");

// membuat engine handlebars
app.engine("handlebars", engine(
    {
        // membuat layout dir yang akan diletakkan di folder layouts
        layoutsDir: path.join(__dirname, "./views/layouts"),

        // untuk default layout yang nama filenya yaitu : main.handlebars
        defaultLayout: "main.handlebars",

        // melakukan set partial dir yang akan diletakkan di folder components
        partialsDir: path.join(__dirname, "./views/components")
    }
));
//** membuat default middleware //

// membuat route
app.get("/", async (req, res) => {
    // melakukan set cookies ke client / front end -> f12 lalu pilih application kemudian pilih cookies
    // res.cookie("test_cookies", "Muzikk...");

    // melakukan cek cookies
    // const checkCookies = req.cookies
    // menampilkan cookies di server 
    // console.info(checkCookies);

    // melakukan render view index.handlebars
    // res.render("index.handlebars");

    // membuat variabel ck untuk melakukan permintaan cookies
    // const { cokies } = await req.cookies;

    // melakukan pengkondisian cokies
    // if (!cokies) {
    //     // melakukan set cookies cokies
    //     res.cookie("cokies", "true");

    //     return (
    //         // menampilkan output
    //         res.render("index", {
    //             firstTime: true,
    //         })
    //     )
    // }

    // membuat objek isLogin 
    const { isLogin } = await req.cookies;

    if (isLogin) {
        return (
            res.render("dashboard")
        )
    }
    // memanggil index
    return (
        res.render("index")
    )

});

// menjalankan login
app.get("/login", async (req, res) => {
    res.cookie("isLogin", "true");
    return (
        res.redirect("/")
    )
})

// menjalankan server 
app.listen(PORT, () => {
    console.info(`Server Berjalan di Port ${PORT}`);
});