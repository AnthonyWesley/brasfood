import {
  Beef,
  Carrot,
  Cherry,
  Croissant,
  CupSoda,
  Milk,
  ShoppingBasket,
  Soup,
  Cookie,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { CategoryIcon } from "@/lib/types";

export const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  cheese: Milk,
  meal: Soup,
  corn: Wheat,
  root: Carrot,
  fruit: Cherry,
  meat: Beef,
  bakery: Croissant,
  snack: Cookie,
  drink: CupSoda,
  grocery: ShoppingBasket,
};

// Tons por categoria para os quadros sem foto: o catálogo continua legível e variado
// enquanto as fotos dos produtos não chegam.
const tints: Record<CategoryIcon, string> = {
  cheese: "bg-[#f3ecd8] text-[#8a6d1c]",
  meal: "bg-[#efe1d6] text-[#8c4a23]",
  corn: "bg-[#f7efc9] text-[#8a7414]",
  root: "bg-[#ede3d4] text-[#7a5a32]",
  fruit: "bg-[#f4dfe2] text-[#9b2c44]",
  meat: "bg-[#f1dcd7] text-[#943325]",
  bakery: "bg-[#f3e6d1] text-[#8f5b17]",
  snack: "bg-[#f2e3cf] text-[#94571b]",
  drink: "bg-[#dfece4] text-[#1f6a42]",
  grocery: "bg-[#e5e9dc] text-[#4f6526]",
};

export function CategoryIconBadge({ icon, className = "" }: { icon: CategoryIcon; className?: string }) {
  const Icon = categoryIcons[icon];
  return (
    <span className={`grid place-items-center rounded-2xl ${tints[icon]} ${className}`}>
      <Icon className="size-1/2" strokeWidth={1.6} aria-hidden="true" />
    </span>
  );
}

export function ProductVisual({
  image,
  name,
  icon,
  className = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  image: string | null;
  name: string;
  icon: CategoryIcon;
  className?: string;
  sizes?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image src={image} alt={name} fill sizes={sizes} className="object-contain p-4" />
      </div>
    );
  }
  const Icon = categoryIcons[icon];
  return (
    <div className={`grid place-items-center ${tints[icon]} ${className}`} role="img" aria-label={`${name} (photo coming soon)`}>
      <Icon className="size-[34%]" strokeWidth={1.3} aria-hidden="true" />
    </div>
  );
}
