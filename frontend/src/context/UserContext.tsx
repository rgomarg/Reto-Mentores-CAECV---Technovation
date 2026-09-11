import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';

export interface CromoData {
  id: number;
  nombre: string;
  imagen?: string;
  puntuacion: number;
  atributos?: string[];
  categoria?: 'Convencionales' | 'Ecológicas' | 'Shiny';
  esConseguida?: boolean;
}

export interface UsuarioPotenciadorData {
  id: number;
  cantidad: number;
  fechaObtenido: string;
  potenciador: {
    id: number;
    nombre: string;
    imagen: string;
    tipo: string;
    atributos?: string[];
  };
}

export interface UsuarioCromoData {
  id: number;
  usado: boolean;
  fechaObtenido: string;
  cantidad: number;
  cromo: CromoData;
}

export interface UserProfile {
  id: number;
  nombre: string;
  puntuacionUsuario: number;
  nCromos: number;
  nPotenciadores: number;
  usuarioCromos: UsuarioCromoData[];
  usuarioPotenciadores: UsuarioPotenciadorData[];
}

export interface RankingEntry {
  id: number;
  nombre: string;
  puntuacion: number;
  posicion: number;
  iconType: 'gold' | 'silver' | 'bronze';
}

export interface UserContextType {
  currentUser: UserProfile | null;
  currentUserId: number;
  setCurrentUserId: (id: number) => void;
  ranking: RankingEntry[];
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const defaultProfiles: Record<number, UserProfile> = {
  5: {
    id: 5,
    nombre: "Alma",
    puntuacionUsuario: 100,
    nCromos: 5,
    nPotenciadores: 1,
    usuarioCromos: [
      {
        id: 5,
        usado: false,
        fechaObtenido: new Date().toISOString(),
        cantidad: 5,
        cromo: {
          id: 3,
          nombre: "Miel",
          imagen: "miel.jpeg",
          puntuacion: 20,
          atributos: ["100% Ecológica", "Antioxidante", "Artesanal"],
          categoria: "Ecológicas",
          esConseguida: true,
        },
      },
    ],
    usuarioPotenciadores: [
      {
        id: 3,
        cantidad: 5,
        fechaObtenido: new Date().toISOString(),
        potenciador: {
          id: 1,
          nombre: "Doble Puntos",
          imagen: "potenciador.png",
          tipo: "DUPLICAR",
          atributos: ["+4 Puntos"],
        },
      },
    ],
  },
  1: {
    id: 1,
    nombre: "Raquel",
    puntuacionUsuario: 55,
    nCromos: 4,
    nPotenciadores: 1,
    usuarioCromos: [],
    usuarioPotenciadores: [],
  },
  3: {
    id: 3,
    nombre: "Sofia",
    puntuacionUsuario: 60,
    nCromos: 4,
    nPotenciadores: 0,
    usuarioCromos: [],
    usuarioPotenciadores: [],
  },
  2: {
    id: 2,
    nombre: "Laura",
    puntuacionUsuario: 45,
    nCromos: 3,
    nPotenciadores: 1,
    usuarioCromos: [],
    usuarioPotenciadores: [],
  },
  4: {
    id: 4,
    nombre: "Zoe",
    puntuacionUsuario: 35,
    nCromos: 1,
    nPotenciadores: 0,
    usuarioCromos: [],
    usuarioPotenciadores: [],
  },
};

const defaultRanking: RankingEntry[] = [
  { id: 5, nombre: "Alma", puntuacion: 100, posicion: 1, iconType: 'gold' },
  { id: 3, nombre: "Sofia", puntuacion: 60, posicion: 2, iconType: 'silver' },
  { id: 1, nombre: "Raquel", puntuacion: 55, posicion: 3, iconType: 'bronze' },
];

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Inicializamos con ID 5 (Alma, inicial "A" del diseño)
  const [currentUserId, setCurrentUserIdState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('caecv_user_id');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultProfiles[5]);
  const [ranking, setRanking] = useState<RankingEntry[]>(defaultRanking);
  const [loading, setLoading] = useState<boolean>(false);

  const setCurrentUserId = useCallback((id: number) => {
    try {
      localStorage.setItem('caecv_user_id', id.toString());
    } catch {
      // Ignorar fallo de localStorage
    }
    setCurrentUserIdState(id);
  }, []);

  const fetchUserData = useCallback(async (userId: number) => {
    try {
      const res = await fetch(`/api/usuarios/${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          setCurrentUser({
            id: userId,
            nombre: data.nombre || defaultProfiles[userId]?.nombre || 'Usuario',
            puntuacionUsuario: data.puntuacionUsuario ?? defaultProfiles[userId]?.puntuacionUsuario ?? 0,
            nCromos: data.nCromos ?? defaultProfiles[userId]?.nCromos ?? 0,
            nPotenciadores: data.nPotenciadores ?? defaultProfiles[userId]?.nPotenciadores ?? 0,
            usuarioCromos: Array.isArray(data.usuarioCromos) ? data.usuarioCromos : [],
            usuarioPotenciadores: Array.isArray(data.usuarioPotenciadores) ? data.usuarioPotenciadores : [],
          });
          return;
        }
      }
      setCurrentUser(defaultProfiles[userId] || defaultProfiles[5]);
    } catch {
      setCurrentUser(defaultProfiles[userId] || defaultProfiles[5]);
    }
  }, []);

  const fetchRanking = useCallback(async () => {
    const userIds = [1, 2, 3, 4, 5];
    const results: { id: number; nombre: string; puntuacion: number }[] = [];

    for (const uId of userIds) {
      try {
        const res = await fetch(`/api/usuarios/${uId}`);
        if (res.ok) {
          const d = await res.json();
          if (d && d.nombre) {
            results.push({
              id: uId,
              nombre: d.nombre,
              puntuacion: d.puntuacionUsuario ?? 0,
            });
          }
        }
      } catch {
        // Ignorar fallo individual
      }
    }

    if (results.length >= 3) {
      results.sort((a, b) => b.puntuacion - a.puntuacion);
      const newRanking: RankingEntry[] = results.slice(0, 3).map((item, idx) => ({
        id: item.id,
        nombre: item.nombre,
        puntuacion: item.puntuacion,
        posicion: idx + 1,
        iconType: idx === 0 ? 'gold' : idx === 1 ? 'silver' : 'bronze',
      }));
      setRanking(newRanking);
    } else {
      setRanking(defaultRanking);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        await Promise.allSettled([
          fetchUserData(currentUserId),
          fetchRanking(),
        ]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [currentUserId, fetchUserData, fetchRanking]);

  const refreshUserData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.allSettled([
        fetchUserData(currentUserId),
        fetchRanking(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentUserId, fetchUserData, fetchRanking]);

  const contextValue = useMemo(
    () => ({
      currentUser,
      currentUserId,
      setCurrentUserId,
      ranking: ranking || defaultRanking,
      loading,
      refreshUserData,
    }),
    [currentUser, currentUserId, setCurrentUserId, ranking, loading, refreshUserData]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe utilizarse dentro de un UserProvider');
  }
  return context;
};
