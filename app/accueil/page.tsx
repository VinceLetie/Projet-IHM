import ListeTaux from "../components/ListeTaux";
import CarteEchange from "../components/CarteEchange";
import "./accueil.css";
import Menu from "../components/Menu";

export default function AccueilPage() {
  return (
    <>
    <Menu/>
    <main className="accueil-page">
    
      <div className="accueil-main">
        {/* ===== BLOC GAUCHE : CARTE TAUX DATE ===== */}
        <section className="accueil-date-card">
          <h1 className="accueil-date-title">
            TAUX D’ECHANGE <br />
            POUR 01/01/2026
          </h1>

          <div className="accueil-image-box">
            <img
              src="/image/ar-dollar.png"
              alt="Taux d'échange"
              className="accueil-main-image"
            />
          </div>
        </section>

        {/* ===== ZONE DROITE : DASHBOARD + BOUTON ===== */}
        <div className="accueil-right-zone">
          <section className="accueil-dashboard">
            <div className="accueil-dashboard-top">
              <button className="accueil-refresh-btn" type="button">
                ↻
              </button>
            </div>

            <div className="accueil-dashboard-content">
              <h2 className="accueil-dashboard-title">
                LA LISTES DES TAUX D’ECHANGES
              </h2>

              <div className="accueil-dashboard-grid">
                <ListeTaux variant="dashboard" />
                <CarteEchange />
              </div>
            </div>
          </section>

          {/* ===== BOUTON SOUS LE BLOC DROIT ===== */}
          <button className="accueil-new-transaction" type="button">
            <span>✚</span>
            Nouvelle transaction
          </button>
        </div>
      </div>
    </main>
    </>
    
  );
}