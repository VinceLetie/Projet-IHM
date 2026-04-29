"use client";

import { useState } from "react";
import Menu from "../components/Menu";
import ListeTaux from "../components/ListeTaux";
import "./parametres.css";

const devisesSimulees = [
  { id: 1, nom: "Dollar américain", code: "USD", statut: "actif" },
  { id: 2, nom: "Ariary malgache", code: "MGA", statut: "actif" },
  { id: 3, nom: "Euro", code: "EUR", statut: "actif" },
  { id: 4, nom: "Livre sterling", code: "GBP", statut: "non actif" },
  { id: 5, nom: "Yen japonais", code: "JPY", statut: "actif" },
  { id: 6, nom: "Dollar canadien", code: "CAD", statut: "non actif" },
];

export default function ParametresPage() {
  const [ongletActif, setOngletActif] = useState<"devises" | "taux">("devises");
  const [recherche, setRecherche] = useState("");

  const devisesFiltrees = devisesSimulees.filter((devise) => {
    const valeur = recherche.toLowerCase();

    return (
      devise.nom.toLowerCase().includes(valeur) ||
      devise.code.toLowerCase().includes(valeur) ||
      devise.statut.toLowerCase().includes(valeur)
    );
  });

  return (
    <>
      <Menu />

      <main className="parametres-page">
        <section className="parametres-layout">
          {/* ===== BLOC GAUCHE : TABLE + SOUS MENU ===== */}
          <section className="parametres-main-card">
            {/* ===== SOUS MENU PARAMETRES ===== */}
            <div className="parametres-tabs">
              <button
                type="button"
                className={
                  ongletActif === "devises"
                    ? "parametres-tab parametres-tab--active"
                    : "parametres-tab"
                }
                onClick={() => {
                  setOngletActif("devises");
                  setRecherche("");
                }}
              >
                Gestion des devises
              </button>

              <button
                type="button"
                className={
                  ongletActif === "taux"
                    ? "parametres-tab parametres-tab--active"
                    : "parametres-tab"
                }
                onClick={() => {
                  setOngletActif("taux");
                  setRecherche("");
                }}
              >
                Gestion des taux de change
              </button>
            </div>

            {/* ===== RECHERCHE ===== */}
            <div className="parametres-search-area">
              <div className="parametres-search-box">
                <input
                  type="text"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  placeholder={
                    ongletActif === "devises"
                      ? "Rechercher une devise..."
                      : "Rechercher un taux..."
                  }
                />
                <button type="button">⌕</button>
              </div>
            </div>

            {/* ===== CONTENU ONGLET DEVISES ===== */}
            {ongletActif === "devises" && (
              <div className="parametres-devise-table">
                <div className="parametres-devise-header">
                  <span>id</span>
                  <span>Nom</span>
                  <span>Code devise</span>
                  <span>Statut</span>
                  <span></span>
                </div>

                <div className="parametres-devise-body">
                  {devisesFiltrees.map((devise) => (
                    <div className="parametres-devise-row" key={devise.id}>
                      <span>{devise.id}</span>
                      <span>{devise.nom}</span>
                      <span>{devise.code}</span>
                      <span>{devise.statut}</span>

                      <div className="parametres-actions">
                        <button className="parametres-edit-btn" type="button">
                          ✎
                        </button>
                        <button className="parametres-delete-btn" type="button">
                          🗑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== CONTENU ONGLET TAUX ===== */}
            {ongletActif === "taux" && (
              <div className="parametres-taux-wrapper">
                <ListeTaux variant="complete" />
              </div>
            )}
          </section>

          {/* ===== BLOC DROIT : FORMULAIRE VISUEL ===== */}
          <aside className="parametres-form-card">
            {ongletActif === "devises" ? (
              <>
                <label>Nom du devise :</label>
                <input type="text" />

                <label>Code devise :</label>
                <input type="text" />

                <label>Status :</label>
                <select defaultValue="non actif">
                  <option>actif</option>
                  <option>non actif</option>
                </select>

                <button type="button">AJOUTER</button>
              </>
            ) : (
              <>
                <h2>Valeur du devise par rapport a 1 USD</h2>

                <label>Valeur du devise :</label>
                <input type="text" />

                <label>Egale a :</label>
                <input type="text" value="1 USD" readOnly />

                <button type="button">MODIFIER</button>
              </>
            )}
          </aside>
        </section>
      </main>
    </>
  );
}