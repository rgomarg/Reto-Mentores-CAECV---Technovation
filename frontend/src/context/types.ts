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
