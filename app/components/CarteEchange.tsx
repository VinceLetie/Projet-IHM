"use client";

import { useEffect, useRef, useState } from "react";
import "../globals.css";

type Devise = {
  code: string;
  nom: string;
};

const devisesSimulees: Devise[] = [
  { code: "USD", nom: "Dollar américain" },
  { code: "MGA", nom: "Ariary malgache" },
  { code: "EUR", nom: "Euro" },
  { code: "GBP", nom: "Livre sterling" },
  { code: "JPY", nom: "Yen japonais" },
  { code: "CAD", nom: "Dollar canadien" },
  { code: "CHF", nom: "Franc suisse" },
];

const tauxSimules: Record<string, number> = {
  "USD-MGA": 4500,
  "MGA-USD": 1 / 4500,
  "USD-EUR": 0.92,
  "EUR-USD": 1.08,
  "USD-GBP": 0.79,
  "GBP-USD": 1.26,
  "USD-JPY": 157.2,
  "JPY-USD": 1 / 157.2,
};

export default function CarteEchange() {
  const [source, setSource] = useState("USD");
  const [cible, setCible] = useState("MGA");
  const [montantSource, setMontantSource] = useState("");
  const [montantCible, setMontantCible] = useState("");
  const [listeOuverte, setListeOuverte] = useState<"source" | "cible" | null>(null);

  const carteRef = useRef<HTMLDivElement>(null);
  const endpointPrevu = "/api/conversion/test";

  useEffect(() => {
    function fermerListe(event: MouseEvent) {
      if (carteRef.current && !carteRef.current.contains(event.target as Node)) {
        setListeOuverte(null);
      }
    }

    document.addEventListener("mousedown", fermerListe);
    return () => document.removeEventListener("mousedown", fermerListe);
  }, []);

  function calculerSimulation(value: string, deviseSource = source, deviseCible = cible) {
    setMontantSource(value);

    /*
      API prévue plus tard :
      POST /api/conversion/test

      body:
      {
        deviseSource,
        deviseCible,
        montant: value
      }

      response:
      {
        taux,
        montantConverti
      }
    */

    const montant = Number(value);

    if (!value || Number.isNaN(montant)) {
      setMontantCible("");
      return;
    }

    const taux = tauxSimules[`${deviseSource}-${deviseCible}`] ?? 1;
    setMontantCible(String((montant * taux).toFixed(2)));
  }

  function choisirDevise(type: "source" | "cible", code: string) {
    const nextSource = type === "source" ? code : source;
    const nextCible = type === "cible" ? code : cible;

    setSource(nextSource);
    setCible(nextCible);
    setListeOuverte(null);

    calculerSimulation(montantSource, nextSource, nextCible);
  }

  function inverserDevises() {
    const ancienneSource = source;
    const ancienneCible = cible;

    setSource(ancienneCible);
    setCible(ancienneSource);
    setMontantSource(montantCible);
    setMontantCible(montantSource);
  }

  return (
    <div className="exchange-card" ref={carteRef} data-api-prevue={endpointPrevu}>
      <div className="exchange-card__head">
        <div>
          <p className="exchange-card__label">Test conversion</p>
          <h3>{source} → {cible}</h3>
        </div>

        <button className="exchange-card__swap" type="button" onClick={inverserDevises}>
          ↔
        </button>
      </div>

      <div className="exchange-card__fields">
        <div className="exchange-card__field">
          <button
            type="button"
            className="exchange-card__currency"
            onClick={() => setListeOuverte(listeOuverte === "source" ? null : "source")}
          >
            {source}
          </button>

          <input
            value={montantSource}
            onChange={(event) => calculerSimulation(event.target.value)}
            placeholder="0.00"
            inputMode="decimal"
          />
        </div>

        <div className="exchange-card__field exchange-card__field--readonly">
          <button
            type="button"
            className="exchange-card__currency"
            onClick={() => setListeOuverte(listeOuverte === "cible" ? null : "cible")}
          >
            {cible}
          </button>

          <input value={montantCible} placeholder="Résultat" readOnly />
        </div>
      </div>

      {listeOuverte && (
        <div className="exchange-card__dropdown">
          <div className="exchange-card__dropdown-top">
            <span>Choisir la devise</span>
            <button type="button" onClick={() => setListeOuverte(null)}>×</button>
          </div>

          <div className="exchange-card__list">
            {devisesSimulees.map((devise) => (
              <button
                key={devise.code}
                type="button"
                className="exchange-card__option"
                onClick={() => choisirDevise(listeOuverte, devise.code)}
              >
                <strong>{devise.code}</strong>
                <span>{devise.nom}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}