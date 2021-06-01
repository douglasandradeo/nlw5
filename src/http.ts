import express from "express"
import { createServer } from "http" //pacote default do node_modules, não precisando adicionar no projeto
import { Server, Socket } from "socket.io"
import path  from "path"

// quando vinculamos o arquivo index.ts, não é necessário informar o caminho compreto,
// somente a pasta é suficiente.
import "./database";

import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
})

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
})

const http = createServer(app); //criando protocolo http
const io = new Server(http); //criando protocolo ws

io.on("connection", (socket: Socket) => {
    console.log("Conectado", socket.id)
})

app.use(express.json());

app.use(routes);

export { http, io }