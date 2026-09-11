import type { ExtendedCromoData } from '../data/cardsData';
import CardVisual from './CardVisual';

interface CardItemProps {
  cromo: ExtendedCromoData;
  onClick: () => void;
  isConseguida?: boolean;
}

export default function CardItem({ cromo, onClick, isConseguida = true }: CardItemProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.04] ${
        isConseguida ? 'opacity-100' : 'opacity-85'
      }`}
    >
      <CardVisual card={cromo} size="md" />

      {/* Efecto de borde al hacer hover */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-amber-400/80 transition-all pointer-events-none" />
    </div>
  );
}
