import "../globals.css";

type TransactionDetail = {
  id: number;
  date: string;
  client: string;
  prenom: string;
  cin: string;
  devises: string;
  status: string;
  montant: string;
  taux: string;
  montantConverti: string;
};

type Props = {
  transaction: TransactionDetail;
  onClose: () => void;
};

const STATUS_CONFIG: Record<string, { couleur: string; label: string }> = {
  completee:  { couleur: "#1a9a4a", label: "Complétée"  },
  en_cours:   { couleur: "#F0A800", label: "En cours"   },
  annulee:    { couleur: "#e03030", label: "Annulée"    },
};

function getInitiales(nom: string, prenom: string) {
  return `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase();
}

export default function DetailTransactionModal({ transaction, onClose }: Props) {
  const statusKey = transaction.status.toLowerCase().replace(/\s/g, "_");
  const status = STATUS_CONFIG[statusKey] ?? { couleur: "#888", label: transaction.status };
  const initiales = getInitiales(transaction.client, transaction.prenom);

  return (
    <div className="dtm-overlay">
      <section className="dtm-modal" role="dialog" aria-modal="true">

        {/* ── EN-TÊTE ── */}
        <div className="dtm-header">
          <button
            className="dtm-close"
            type="button"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>

          <div className="dtm-header-top">
            <div className="dtm-icon">TX</div>
            <div>
              <p className="dtm-id">Transaction #{transaction.id}</p>
              <p className="dtm-date">{transaction.date}</p>
            </div>
          </div>

          <div className="dtm-status-pill">
            <span
              className="dtm-status-dot"
              style={{ background: status.couleur }}
            />
            <span className="dtm-status-label">{status.label}</span>
          </div>
        </div>

        {/* ── CORPS ── */}
        <div className="dtm-body">

          {/* Section Client */}
          <div className="dtm-section dtm-section--gray">
            <div className="dtm-section-title">
              <span className="dtm-section-bar dtm-section-bar--teal" />
              <h3>Client</h3>
            </div>
            <div className="dtm-client-row">
              <div className="dtm-avatar">{initiales}</div>
              <div>
                <p className="dtm-client-name">
                  {transaction.prenom} {transaction.client}
                </p>
                <p className="dtm-client-cin">CIN : {transaction.cin}</p>
              </div>
            </div>
          </div>

          {/* Section Détails financiers */}
          <div className="dtm-section dtm-section--bordered">
            <div className="dtm-section-title">
              <span className="dtm-section-bar dtm-section-bar--orange" />
              <h3>Détails financiers</h3>
            </div>

            <div className="dtm-row">
              <span className="dtm-row-label">Montant</span>
              <span className="dtm-row-value dtm-row-value--strong">
                {transaction.montant} {transaction.devises}
              </span>
            </div>

            <div className="dtm-row">
              <span className="dtm-row-label">Taux appliqué</span>
              <span className="dtm-row-value">{transaction.taux}</span>
            </div>

            <div className="dtm-row dtm-row--highlight">
              <span className="dtm-row-label dtm-row-label--teal">
                Montant converti
              </span>
              <span className="dtm-row-value dtm-row-value--teal">
                {transaction.montantConverti}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="dtm-actions">
            <button className="dtm-btn-cancel" type="button">
              ✖ &nbsp;Annuler la transaction
            </button>
            <button className="dtm-btn-back" type="button" onClick={onClose}>
              Revenir
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}