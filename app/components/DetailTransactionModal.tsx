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

export default function DetailTransactionModal({ transaction, onClose }: Props) {
  return (
    <div className="detail-modal-overlay">
      <section className="detail-modal">
        <button className="detail-modal-close" type="button" onClick={onClose}>
          ×
        </button>

        <div className="detail-modal-status">
          <span className="detail-modal-status-dot"></span>
          <span>{transaction.status}</span>
        </div>

        <p className="detail-modal-date">Date : {transaction.date}</p>

        <div className="detail-modal-section">
          <div className="detail-modal-section-title">
            <span></span>
            <h3>CLIENT</h3>
          </div>

          <p>Nom : {transaction.client}</p>
          <p>Prénom : {transaction.prenom}</p>
          <p>Numéro du CIN : {transaction.cin}</p>
        </div>

        <div className="detail-modal-section">
          <div className="detail-modal-section-title">
            <span></span>
            <h3>DETAILS</h3>
          </div>

          <p>Montant : {transaction.montant} {transaction.devises}</p>
          <p>Taux : {transaction.taux}</p>
          <p>Montant converti : {transaction.montantConverti}</p>
        </div>

        <div className="detail-modal-actions">
          <button className="detail-modal-cancel" type="button">
            ✖ Annuler
          </button>

          <button className="detail-modal-back" type="button" onClick={onClose}>
            Revenir
          </button>
        </div>
      </section>
    </div>
  );
}