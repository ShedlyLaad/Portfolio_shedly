import React from "react";
import { FaLaptopCode, FaUniversity, FaSchool } from "react-icons/fa";
import "../../Education.css";

// Correction: helper pour éviter de rendre des objets non valides dans le JSX.
// Si une valeur n'est pas une chaîne/élément React, on la convertit proprement en texte.
const safeText = (value) => {
  if (typeof value === "string" || typeof value === "number") return value;
  if (React.isValidElement(value)) return ""; // empêche l'affichage d'un objet React en texte
  return value != null ? String(value) : "";
};

// Correction: rendu sûr de l'icône. Si on reçoit un composant au lieu d'un élément,
// on le rend sous forme <Icon />. Sinon, on n'affiche rien si non valide.
const SafeIcon = ({ icon }) => {
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === "function") {
    const IconComp = icon;
    return <IconComp />;
  }
  return null;
};

const educationData = [
  {
    icon: <FaLaptopCode />,
    title: "Bachelor en Développement Full Stack",
    school: "The Digital School, Tunis",
    dates: "2023 - 2025",
    points: [
      "Spécialisé dans le développement frontend et backend.",
      "Focus sur la conception et la réalisation d'applications web complètes pour une expertise complète."
    ]
  },
  {
    icon: <FaUniversity />,
    title: "BTS en Informatique de Gestion",
    school: "L’institut National des Professionnels, Montplaisir, Tunis",
    dates: "2021 - 2023",
    points: [
      "Solide formation en gestion des systèmes d'information.",
      "Développement de compétences en analyse et conception de solutions informatiques pour les entreprises."
    ]
  },
  {
    icon: <FaSchool />,
    title: "Baccalauréat en Informatique",
    school: "Lycée route de la plage, Soliman",
    dates: "2018 - 2019",
    points: [
      "Acquisition des fondamentaux en informatique et en algorithmique.",
      "Bases solides en mathématiques et principes de la programmation."
    ]
  }
];

function Education() {
  return (
    <div className="education-section">
      <h1 className="project-heading">
        <span className="purple">Éducation</span>
      </h1>
      <div className="education-cards-row">
        {educationData.map((item, idx) => (
          <div className="education-card" key={idx}>
            {/* Correction: empêcher le rendu d'un objet React brut et forcer du texte sûr */}
            <div className="education-icon"><SafeIcon icon={item.icon} /></div>
            <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{safeText(item.title)}</div>
            <div className="education-school">{safeText(item.school)}</div>
            <div className="education-dates">{safeText(item.dates)}</div>
            <ul>
              {item.points.map((point, i) => (
                // Correction: garantir que chaque point est une chaîne rendable
                <li key={i}>{safeText(point)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Education;


