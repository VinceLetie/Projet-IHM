"use client";

import { useState } from "react";
import Menu from "../components/Menu";
import CarteEchange from "../components/CarteEchange";
import "./accueil.css";

// Valeurs de base : 1 unité = X MGA
const TAUX_BASE = [
  { code: "USD", nom: "Dollar américain",  drapeau: "#003189", valeurMGA: 4720, variation: +0.4 },
  { code: "EUR", nom: "Euro",              drapeau: "#0055a4", valeurMGA: 5105, variation: +0.2 },
  { code: "GBP", nom: "Livre sterling",    drapeau: "#cf142b", valeurMGA: 5950, variation: -0.1 },
  { code: "JPY", nom: "Yen japonais",      drapeau: "#bc002d", valeurMGA: 31,   variation: +0.6 },
  { code: "ZAR", nom: "Rand sud-africain", drapeau: "#009e3d", valeurMGA: 256,  variation: -0.3 },
  { code: "CNY", nom: "Yuan chinois",      drapeau: "#ff0000", valeurMGA: 650,  variation: +0.1 },
  { code: "CHF", nom: "Franc suisse",      drapeau: "#e60012", valeurMGA: 5240, variation: +0.3 },
  { code: "AUD", nom: "Dollar australien", drapeau: "#0057a8", valeurMGA: 3060, variation: -0.2 },
];

export default function AccueilPage() {
  const [montant, setMontant]       = useState<number>(100);
  const [montant2, setMontant2]     = useState<number>(472000);
  const [deviseFrom, setDeviseFrom] = useState<number>(4720);
  const [deviseTo, setDeviseTo]     = useState<number>(1);
  const [labelFrom, setLabelFrom]   = useState<string>("USD");
  const [labelTo, setLabelTo]       = useState<string>("MGA");

  // Taux recalculés selon la devise de référence (deviseTo)
  const TAUX = TAUX_BASE.map((t) => ({
    ...t,
    valeur: parseFloat((t.valeurMGA / deviseTo).toFixed(4)),
  }));
  const RANGS   = [...TAUX].sort((a, b) => b.valeur - a.valeur);
  const MAX_VAL = RANGS[0].valeur;

  const OPTIONS = [
    { value: 1,    label: "MGA — Ariary malgache" },
    { value: 4720, label: "USD — Dollar américain" },
    { value: 5105, label: "EUR — Euro" },
    { value: 5950, label: "GBP — Livre sterling" },
    { value: 31,   label: "JPY — Yen japonais" },
    { value: 256,  label: "ZAR — Rand sud-africain" },
    { value: 650,  label: "CNY — Yuan chinois" },
    { value: 5240, label: "CHF — Franc suisse" },
    { value: 3060, label: "AUD — Dollar australien" },
  ];

  function getCode(val: number) {
    return OPTIONS.find((o) => o.value === val)?.label.split("—")[0].trim() ?? "";
  }

  function handleMontant(v: number) {
    setMontant(v);
    setMontant2(parseFloat(((v * deviseFrom) / deviseTo).toFixed(2)));
  }

  function handleMontant2(v: number) {
    setMontant2(v);
    setMontant(parseFloat(((v * deviseTo) / deviseFrom).toFixed(2)));
  }

  function handleFrom(val: number, label: string) {
    setDeviseFrom(val);
    setLabelFrom(label);
    setMontant2(parseFloat(((montant * val) / deviseTo).toFixed(2)));
  }

  function handleTo(val: number, label: string) {
    setDeviseTo(val);
    setLabelTo(label);
    setMontant2(parseFloat(((montant * deviseFrom) / val).toFixed(2)));
  }

  function swap() {
    const tmpVal   = deviseFrom;
    const tmpLabel = labelFrom;
    setDeviseFrom(deviseTo);
    setLabelFrom(labelTo);
    setDeviseTo(tmpVal);
    setLabelTo(tmpLabel);
    setMontant2(parseFloat(((montant * deviseTo) / deviseFrom).toFixed(2)));
  }

  const resultat = ((montant * deviseFrom) / deviseTo).toLocaleString("fr-FR", {
    maximumFractionDigits: 2,
  });
  const tauxUnitaire = (deviseFrom / deviseTo).toLocaleString("fr-FR", {
    maximumFractionDigits: 2,
  });

  return (
    <>
      <Menu />
      <main className="accueil-page">

        {/* ───── EN-TÊTE ───── */}
        <div className="accueil-header">
          <h1 className="accueil-header-title">
            Taux d'échange d'aujourdhui 
            
          </h1>
          <span className="accueil-date-chip">01 Janvier 2026</span>
        </div>

        {/* ───── GRILLE PRINCIPALE ───── */}
        <div className="accueil-grid">

          {/* ── COLONNE GAUCHE ── */}
          <aside className="accueil-left">

            {/* Stat : transactions du mois */}
            <div className="accueil-stat-card">
              <div>
                <p className="stat-label">Transactions du mois</p>
                <p className="stat-value">1 248</p>
                <p className="stat-sub">↑ +12 % par rapport au mois dernier</p>
              </div>
              <div className="stat-icon">📋</div>
            </div>

            {/* Liste des taux */}
            <div className="accueil-card">
              <p className="card-title">
                Taux des devises par rapport à {labelTo}
              </p>
              <div className="taux-scroll">
                {TAUX.map((t) => (
                  <div key={t.code} className="rate-item">
                    <div className="rate-left">
                      <span
                        className="rate-flag"
                        style={{ background: t.drapeau }}
                      />
                      <div>
                        <p className="rate-name">{t.code}</p>
                        <p className="rate-sub">{t.nom}</p>
                      </div>
                    </div>
                    <div className="rate-right">
                      <p className="rate-val">
                        {t.valeur.toLocaleString("fr-FR", { maximumFractionDigits: 4 })} {labelTo}
                      </p>
                      <span
                        className={`rate-change ${t.variation >= 0 ? "up" : "down"}`}
                      >
                        {t.variation >= 0 ? "+" : ""}
                        {t.variation}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Classement des devises */}
            <div className="accueil-card">
              <p className="card-title">Classement des devises</p>
              <div className="rang-scroll">
                {RANGS.map((t, i) => (
                  <div key={t.code} className="rang-item">
                    <span
                      className={`rang-num ${
                        i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : ""
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="rang-bar-wrap">
                      <div className="rang-label">
                        <span>{t.code} — {t.nom}</span>
                        <span className="rang-val">
                          {t.valeur.toLocaleString("fr-FR", { maximumFractionDigits: 4 })} {labelTo}
                        </span>
                      </div>
                      <div className="rang-bar-bg">
                        <div
                          className="rang-bar-fill"
                          style={{
                            width: `${(t.valeur / MAX_VAL) * 100}%`,
                            background: i === 0 ? "var(--orange)" : "var(--teal)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── COLONNE DROITE : CONVERTISSEUR ── */}
          <div className="accueil-right">
            <div className="conv-card">
              <div className="conv-top">
                <h2 className="conv-title">Convertisseur de devises</h2>
              </div>

              {/* Champ FROM */}
              <p className="conv-label">Montant à convertir</p>
              <div className="conv-field">
                <input
                  type="number"
                  value={montant}
                  onChange={(e) => handleMontant(parseFloat(e.target.value) || 0)}
                  className="conv-input"
                  placeholder="0"
                />
                <select
                  className="conv-select"
                  value={deviseFrom}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    const l = OPTIONS.find((o) => o.value === v)?.label.split("—")[0].trim() ?? "";
                    handleFrom(v, l);
                  }}
                >
                  {OPTIONS.filter((o) => o.value !== 1).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bouton swap */}
              <div className="swap-row">
                <button className="swap-btn" onClick={swap} type="button" title="Inverser">
                  ⇄
                </button>
              </div>

              {/* Champ TO */}
              <p className="conv-label">Converti en</p>
              <div className="conv-field">
                <input
                  type="number"
                  value={montant2}
                  onChange={(e) => handleMontant2(parseFloat(e.target.value) || 0)}
                  className="conv-input"
                  placeholder="0"
                />
                <select
                  className="conv-select"
                  value={deviseTo}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    const l = OPTIONS.find((o) => o.value === v)?.label.split("—")[0].trim() ?? "";
                    handleTo(v, l);
                  }}
                >
                  {OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Résultat */}
              <div className="conv-result">
                <p className="r-label">Résultat</p>
                <p className="r-val">{resultat}</p>
                <p className="r-rate">
                  1 <span className="r-mga">{labelFrom}</span> ={" "}
                  {tauxUnitaire} <span className="r-mga">{labelTo}</span>
                </p>
              </div>

              

              {/* Actions */}
              <div className="conv-actions">
                <button className="btn-refresh" type="button" title="Actualiser">
                  ↻
                </button>
                <button className="btn-new" type="button">
                  ✚ &nbsp;Nouvelle transaction
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </main>
    </>
  );
}