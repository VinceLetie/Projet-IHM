"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // À remplacer plus tard par l'API de déconnexion si besoin
    localStorage.removeItem("auth");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="main-menu">
      <div className="main-menu-logo">
        <img src="/image/logo.png" alt="Logo Bank" />
      </div>

      <nav className="main-menu-links">
        <Link
          href="/accueil"
          className={isActive("/accueil") ? "menu-link active" : "menu-link"}
        >
          ACCUEIL
        </Link>

        <Link
          href="/echange"
          className={isActive("/echange") ? "menu-link active" : "menu-link"}
        >
          ECHANGE
        </Link>

        <Link
          href="/historique"
          className={
            isActive("/historique") ? "menu-link active" : "menu-link"
          }
        >
          HISTORIQUE
        </Link>

        <Link
          href="/parametres"
          className={
            isActive("/parametres") ? "menu-link active" : "menu-link"
          }
        >
          PARAMETRES
        </Link>
      </nav>

      <button type="button" className="logout-button" onClick={handleLogout}>
        Déconnecter
      </button>
    </header>
  );
}