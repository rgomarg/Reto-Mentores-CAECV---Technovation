export interface UsuarioDTO {
  id: number;
  nombre: string;
  puntuacionUsuario: number;
  nCromos: number;
  nPotenciadores: number;
  usuarioCromos?: any[];
  usuarioPotenciadores?: any[];
}

export interface UsuarioRankingDTO extends UsuarioDTO {
  posicion: number;
}

export async function crearUsuario(nombre: string) {
  const response = await fetch("http://localhost:8080/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre
    })
  });
  return await response.json();
}

export async function obtenerUsuarioDashboard(id: number | string): Promise<UsuarioDTO | null> {
  try {
    const res = await fetch(`/api/usuarios/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      id: Number(id),
      nombre: data.nombre,
      puntuacionUsuario: data.puntuacionUsuario ?? 0,
      nCromos: data.nCromos ?? 0,
      nPotenciadores: data.nPotenciadores ?? 0,
      usuarioCromos: data.usuarioCromos || [],
      usuarioPotenciadores: data.usuarioPotenciadores || [],
    };
  } catch (err) {
    console.error(`Error al cargar usuario ${id}:`, err);
    return null;
  }
}

export async function obtenerTodosUsuarios(): Promise<UsuarioDTO[]> {
  const usuarios: UsuarioDTO[] = [];
  const chunkSize = 10;
  let currentStart = 1;
  let hasMore = true;

  while (hasMore) {
    const ids = Array.from({ length: chunkSize }, (_, i) => currentStart + i);
    const results = await Promise.all(
      ids.map(id => obtenerUsuarioDashboard(id))
    );

    let foundInChunk = 0;
    for (const user of results) {
      if (user) {
        usuarios.push(user);
        foundInChunk++;
      }
    }

    if (foundInChunk === 0) {
      hasMore = false;
    } else {
      currentStart += chunkSize;
      if (currentStart > 100) hasMore = false;
    }
  }

  return usuarios;
}

export async function obtenerRankingUsuarios(): Promise<UsuarioRankingDTO[]> {
  const usuarios = await obtenerTodosUsuarios();
  // Ordenar por puntuación descendente
  usuarios.sort((a, b) => b.puntuacionUsuario - a.puntuacionUsuario);

  return usuarios.map((user, index) => ({
    ...user,
    posicion: index + 1
  }));
}
