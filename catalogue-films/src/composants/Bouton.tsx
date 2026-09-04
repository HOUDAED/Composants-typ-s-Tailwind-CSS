export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;   // "primaire" par défaut
  desactive?: boolean;         // false par défaut
  onClick?: () => void;
}

export function Bouton({libelle,variante= "primaire" , desactive =false, onClick}:BoutonProps){
  const classesBase = "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const stylesVariantes: Record<VarianteBouton, string> = {
    primaire: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-red-500",
    secondaire: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const classesDesactive = "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
    const classesFinales = `${classesBase} ${stylesVariantes[variante]} ${classesDesactive}`;
  return(
    <button disabled ={desactive}  onClick={onClick} className={classesFinales}>{libelle}</button>
  );

}