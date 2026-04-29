type ListeTauxVariant = "dashboard" | "complete";

type TauxItem = {
  id: number;
  devise: string;
  valeurUSD: string;
  dateMaj: string;
};

type ListeTauxProps = {
  variant?: ListeTauxVariant;
};

const endpointByVariant: Record<ListeTauxVariant, string> = {
  dashboard: "/api/taux/dernieres-maj",
  complete: "/api/taux/liste-complete",
};

const tauxSimules: TauxItem[] = [
  { id: 1, devise: "USD", valeurUSD: "1", dateMaj: "01/01/2026" },
  { id: 2, devise: "MGA", valeurUSD: "4500", dateMaj: "01/01/2026" },
  { id: 3, devise: "EUR", valeurUSD: "0.92", dateMaj: "01/01/2026" },
  { id: 4, devise: "GBP", valeurUSD: "0.79", dateMaj: "01/01/2026" },
  { id: 5, devise: "JPY", valeurUSD: "157.20", dateMaj: "01/01/2026" },
  { id: 6, devise: "CAD", valeurUSD: "1.36", dateMaj: "01/01/2026" },
  { id: 7, devise: "CHF", valeurUSD: "0.89", dateMaj: "01/01/2026" },
  { id: 8, devise: "CNY", valeurUSD: "7.25", dateMaj: "01/01/2026" },
];

export default function ListeTaux({ variant = "dashboard" }: ListeTauxProps) {
  const endpointPrevu = endpointByVariant[variant];

  return (
    <div className="liste-taux" data-api-prevue={endpointPrevu}>
      <div className="liste-taux__header">
        <span>id</span>
        <span>Devise</span>
        <span>Valeur/USD</span>
        <span>Date m.a.j</span>
      </div>

      <div className="liste-taux__body">
        {tauxSimules.map((taux) => (
          <div className="liste-taux__row" key={taux.id}>
            <span>{taux.id}</span>
            <span>{taux.devise}</span>
            <span>{taux.valeurUSD}</span>
            <span>{taux.dateMaj}</span>

            <button className="liste-taux__edit" type="button" aria-label="Modifier le taux">
              ✎
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}