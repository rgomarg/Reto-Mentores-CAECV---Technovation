export async function crearUsuario(nombre: string) {
    const response = await fetch(
        "http://localhost:8080/usuarios",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nombre:nombre
            })
        }
    )
    return await response.json();
}