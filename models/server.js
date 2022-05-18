// Servidor de Express
const express = require("express");

// Servidor de Sockets
const http = require("http");

// Configuracion sockets
const socketio = require("socket.io");

const path = require("path");

const cors = require("cors");
const Sockets = require("./sockets");

class Server {
    
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http Server
        this.server = http.createServer(this.app);

        this.io = socketio(this.server, {
            /*Configuraciones */
        });
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // CORS 
        this.app.use( cors() );
    }


    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {
        
        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log("Server corriendo en puerto:", this.port);
        });
    }
}

module.exports = Server;
