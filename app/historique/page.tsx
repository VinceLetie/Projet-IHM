"use client";

import { useState } from "react";
import "./historique.css";
import Menu from "../components/Menu";
import DetailTransactionModal from "../components/DetailTransactionModal";

const transactions = [
  {
    id: 1,
    date: "01/01/2026",
    client: "Koto",
    prenom: "Ndrina",
    cin: "101234567890",
    devises: "USD → MGA",
    status: "Validée",
    montant: "100 ",
    taux: "4500",
    montantConverti: "450000 MGA",
  },
  {
    id: 2,
    date: "01/01/2026",
    client: "Rabe",
    prenom: "Lova",
    cin: "201234567890",
    devises: "EUR → MGA",
    status: "Validée",
    montant: "100 ",
    taux: "4800",
    montantConverti: "480000 MGA",
  },
  {
    id: 3,
    date: "02/01/2026",
    client: "Rakoto",
    prenom: "Jean",
    cin: "301234567890",
    devises: "MGA → USD",
    status: "Validée",
    montant: "450000 ",
    taux: "4500",
    montantConverti: "100 USD",
  },
  {
    id: 4,
    date: "02/01/2026",
    client: "Nadia",
    prenom: "Clara",
    cin: "401234567890",
    devises: "USD → EUR",
    status: "En attente",
    montant: "100 ",
    taux: "0.92",
    montantConverti: "92 EUR",
  },
  {
    id: 5,
    date: "03/01/2026",
    client: "Koto",
    prenom: "Ndrina",
    cin: "101234567890",
    devises: "USD → MGA",
    status: "Validée",
    montant: "200 =",
    taux: "4500",
    montantConverti: "900000 MGA",
  },
  {
    id: 6,
    date: "03/01/2026",
    client: "Miora",
    prenom: "Hasina",
    cin: "501234567890",
    devises: "GBP → MGA",
    status: "Validée",
    montant: "100 =",
    taux: "5600",
    montantConverti: "560000 MGA",
  },
  {
    id: 7,
    date: "04/01/2026",
    client: "Rabe",
    prenom: "Lova",
    cin: "201234567890",
    devises: "MGA → EUR",
    status: "Validée",
    montant: "480000 ",
    taux: "4800",
    montantConverti: "100 EUR",
  },
  {
    id: 8,
    date: "05/01/2026",
    client: "Toky",
    prenom: "Faly",
    cin: "601234567890",
    devises: "CAD → MGA",
    status: "Annulée",
    montant: "100 ",
    taux: "3300",
    montantConverti: "330000 MGA",
  },
];

const topClients = [
  "Koto Ndrina",
  "Rabe Lova",
  "Rakoto Jean",
  "Miora Hasina",
  "Nadia Clara",
];

export default function HistoriquePage() {
  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof transactions)[number] | null
  >(null);

  return (
    <>
      <Menu />

      <main className="historique-page">
        <section className="historique-layout">
          {/* ===== BLOC GAUCHE : LISTE TRANSACTIONS ===== */}
          <section className="historique-table-card">
            <h1 className="historique-title">Voici la liste des transactions</h1>

            <div className="historique-table">
              <div className="historique-table-header">
                <span>Id</span>
                <span>Date</span>
                <span>Client</span>
                <span>Cin</span>
                <span>Devises</span>
                <span>Status</span>
                <span></span>
              </div>

              <div className="historique-table-body">
                {transactions.map((transaction) => (
                  <div className="historique-table-row" key={transaction.id}>
                    <span>{transaction.id}</span>
                    <span>{transaction.date}</span>
                    <span>
                      {transaction.client} {transaction.prenom}
                    </span>
                    <span>{transaction.cin}</span>
                    <span>{transaction.devises}</span>
                    <span>{transaction.status}</span>

                    <button
                      className="historique-more-btn"
                      type="button"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      Voir plus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== BLOC DROIT ===== */}
          <aside className="historique-side">
            {/* ===== RECHERCHE ===== */}
            <section className="historique-search-card">
              <h2>Faire une recherche</h2>

              <div className="historique-search-box">
                <input type="text" />
                <button type="button">⌕</button>
              </div>
            </section>

            {/* ===== TOP CLIENTS ===== */}
            <section className="historique-top-card">
              <h2>Top 5 des Clients fidèles</h2>

              <div className="historique-top-list">
                {topClients.map((client, index) => (
                  <div className="historique-top-item" key={client}>
                    <span className="historique-rank">{index + 1}</span>
                    <span>{client}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        {selectedTransaction && (
          <DetailTransactionModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </main>
    </>
  );
}