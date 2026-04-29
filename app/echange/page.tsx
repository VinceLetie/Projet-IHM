"use client";

import { useState } from "react";
import "./transaction.css";
import Menu from "../components/Menu";

const devises = ["USD", "MGA", "EUR", "GBP", "JPY", "CAD", "CHF"];

export default function TransactionPage() {
  const [deviseSource, setDeviseSource] = useState("USD");
  const [deviseCible, setDeviseCible] = useState("MGA");

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cin, setCin] = useState("");

  const [montantSource, setMontantSource] = useState("");
  const [montantCible, setMontantCible] = useState("");

  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  const taux = 4400;

  function changerMontantSource(value: string) {
    setMontantSource(value);

    const montant = Number(value);

    if (!value || Number.isNaN(montant)) {
      setMontantCible("");
      return;
    }

    setMontantCible(String(montant * taux));
  }

  function changerMontantCible(value: string) {
    setMontantCible(value);

    const montant = Number(value);

    if (!value || Number.isNaN(montant)) {
      setMontantSource("");
      return;
    }

    setMontantSource(String((montant / taux).toFixed(2)));
  }

  function continuerTransaction() {
    setErreur("");
    setSucces("");

    if (!deviseSource || !deviseCible) {
      setErreur("Veuillez choisir les deux devises.");
      return;
    }

    if (deviseSource === deviseCible) {
      setErreur("Les deux devises doivent être différentes.");
      return;
    }

    if (!nom.trim()) {
      setErreur("Le nom du client est obligatoire.");
      return;
    }

    if (!prenom.trim()) {
      setErreur("Le prénom du client est obligatoire.");
      return;
    }

    if (!cin.trim()) {
      setErreur("Le numéro CIN est obligatoire.");
      return;
    }

    if (!montantSource || !montantCible) {
      setErreur("Veuillez saisir un montant à échanger.");
      return;
    }

    setSucces("Les informations sont valides. Vous pouvez confirmer la transaction.");
  }

  function confirmerTransaction() {
    setErreur("");
    setSucces("");

    if (!nom || !prenom || !cin || !montantSource || !montantCible) {
      setErreur("Veuillez d’abord compléter la transaction.");
      return;
    }

    setSucces("Transaction enregistrée avec succès.");
  }

  return (
    <>
    <Menu/>
    <main className="transaction-page">
      <section className="transaction-layout">
        <div className="transaction-left">
          <section className="transaction-pair-card">
            <p className="transaction-pair-title">
              Choisissez le paire de l’agent utiliser pour la transaction
            </p>

            <div className="transaction-pair-box">
              <span className="transaction-pair-label">Echanger</span>

              <input
                className="transaction-pair-input"
                type="text"
                list="liste-devises"
                value={deviseSource}
                onChange={(e) => setDeviseSource(e.target.value.toUpperCase())}
                placeholder="ex:USD"
              />

              <span className="transaction-pair-label">Contre</span>

              <input
                className="transaction-pair-input"
                type="text"
                list="liste-devises"
                value={deviseCible}
                onChange={(e) => setDeviseCible(e.target.value.toUpperCase())}
                placeholder="ex:MGA"
              />

              <datalist id="liste-devises">
                {devises.map((devise) => (
                  <option value={devise} key={devise} />
                ))}
              </datalist>

              <button className="transaction-confirm-pair" type="button">
                CONFIRMER
              </button>
            </div>
          </section>

          <section className="transaction-form-card">
            <p className="transaction-form-intro">
              Veuiller remplir les informations du client en dessous !
            </p>

            {erreur && <p style={{ color: "red", margin: "0 0 8px" }}>{erreur}</p>}
            {succes && <p style={{ color: "green", margin: "0 0 8px" }}>{succes}</p>}

            <label className="transaction-label">Nom :</label>
            <input
              className="transaction-input"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />

            <label className="transaction-label">Prénom :</label>
            <input
              className="transaction-input"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />

            <label className="transaction-label">Numéro de la CIN :</label>
            <input
              className="transaction-input"
              type="text"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
            />

            <label className="transaction-label">Montant a échanger :</label>

            <div className="transaction-amount-row">
              <input
                className="transaction-currency-input"
                type="text"
                value={montantSource}
                onChange={(e) => changerMontantSource(e.target.value)}
                placeholder={deviseSource}
              />

              <span className="transaction-en-text">EN</span>

              <input
                className="transaction-currency-input"
                type="text"
                value={montantCible}
                onChange={(e) => changerMontantCible(e.target.value)}
                placeholder={deviseCible}
              />
            </div>

            <button
              className="transaction-continue-btn"
              type="button"
              onClick={continuerTransaction}
            >
              CONTINUER
              <span>➜</span>
            </button>
          </section>
        </div>

        <aside className="transaction-right">
          <section className="transaction-rate-card">
            <h2 className="transaction-rate-title">
              LE COURS DU TAUX D’ECHANGE EST
            </h2>

            <div className="transaction-rate-box">
              100 {deviseSource} = {taux * 100} {deviseCible}
            </div>
          </section>

          <section className="transaction-summary-card">
            <div className="transaction-summary-line">
              <span>Nom</span>
              <span className="transaction-check">✓</span>
            </div>

            <div className="transaction-summary-line">
              <span>Prénom</span>
              <span className="transaction-check">✓</span>
            </div>

            <div className="transaction-summary-line">
              <span>Numéro de la CIN</span>
              <span className="transaction-check">✓</span>
            </div>

            <p className="transaction-result-label">
              Montant a donner au client :
            </p>

            <div className="transaction-result-box">
              {montantCible && `${montantCible} ${deviseCible}`}
            </div>

            <p className="transaction-save-text">
              Cliquer ci-dessous pour enregistrer <br />
              la transaction
            </p>

            <button
              className="transaction-save-btn"
              type="button"
              onClick={confirmerTransaction}
            >
              CONFIRMER
            </button>
          </section>
        </aside>
      </section>
    </main>
    </>
    
  );
}