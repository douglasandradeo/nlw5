import { http } from "./http"

// importa-se os arquivos desenvolvidos em websocket para que seja transmitido no HTML
import "./websocket/client"
import "./websocket/admin"

http.listen(3333, () => console.log("Server is running on port 3333."));

