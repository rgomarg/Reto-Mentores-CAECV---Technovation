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
      className={`group relative transition-all duration-300 transform ${
        isConseguida
          ? 'cursor-pointer hover:-translate-y-1.5 hover:scale-[1.04] opacity-100'
          : 'cursor-default opacity-85 hover:scale-[1.01]'
      }`}
    >
      <CardVisual card={cromo} size="md" isConseguida={isConseguida} />

      {/* Efecto de borde al hacer hover en cartas conseguidas */}
      {isConseguida && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-amber-400/80 transition-all pointer-events-none" />
      )}
    </div>
  );
}
