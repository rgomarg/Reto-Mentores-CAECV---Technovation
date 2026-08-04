import { useState } from "react";
import { crearUsuario } from "../services/usuarioService";

function CrearUsuarios(){
    const[nombre, setNombre]=useState("");
    async function crear(){
        const usuario= await crearUsuario(nombre);
        console.log(usuario);
    }

    return(
        <div className="px-4 space-x-1">
        <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-green-200"
        />
        <button onClick={crear} 
                className="bg-blue-600 hover:bg-blue-300 rounded-3xl p-2">
            Crear Usuario
        </button>
        </div>
    )
}

export default CrearUsuarios;