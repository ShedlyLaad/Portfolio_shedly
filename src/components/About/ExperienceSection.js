import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCode,
  FaPaintBrush,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";
import "./ExperienceTimeline.css";

const safeText = (value) => {
  if (typeof value === "string" || typeof value === "number") return value;
  if (React.isValidElement(value)) return "";
  return value != null ? String(value) : "";
};

// Association des icônes selon le domaine de l’expérience
const iconForExperience = {
  "ZahouTech": <FaPaintBrush color="#0078d7" size={22} />, // Web & design
  "The Digital School, École du Digital du Belvédère": <FaCode color="#0078d7" size={22} />, // Dev Front
  "E2business Consulting and Training": <FaSearch color="#0078d7" size={22} />, // SEO marketing
  "CAP AGRO": <FaClipboardList color="#0078d7" size={22} />, // Gestion admin
};

const experiences = [
  {
    company: "ZahouTech",
    location: " Monplisair, Tunis",
    period: "Avril à Juillet 2025",
    title: "Stage polyvalent web & design",
    missions: [
      "Participation à des projets web et mobile : conception UX/UI, intégration sous WordPress.",
      "Contribution au développement backend avec Laravel.",
      "Expérience axée sur la collaboration, la polyvalence et la création de solutions digitales sur mesure.",
    ],
  },
  {
    company: "The Digital School, École du Digital du Belvédère",
    location: "Jean D'arc ,Tunis, Tunisie",
    period: "Août à septembre 2024",
    title: "Développeur Front-End",
    missions: [
      "Développement Front-End : Conception et réalisation d'interfaces utilisateur en utilisant HTML5, CSS3, JavaScript, et React.",
      "Méthodologie : Travail selon la méthode Agile, favorisant la livraison itérative et la collaboration.",
      "Modélisation : Utilisation du langage UML pour la modélisation et la conception de systèmes.",
      "Fait preuve d'un esprit travailleur et bien organisé, confirmé par la direction.",
      "Capacité à développer de bonnes relations et à s'intégrer efficacement au sein d'une équipe.",
    ],
  },
  {
    company: "E2business Consulting and Training",
    location: "Centre Urbain Nord, Tunis, Tunisie",
    period: "2023",
    title: "Stage en SEO - Marketing Digital",
    missions: [
      "Optimisation de contenu, analyse de mots-clés et mise en œuvre de stratégies SEO.",
      "Amélioration de la visibilité en ligne et renforcement des compétences en marketing digital.",
    ],
  },
  {
    company: "CAP AGRO",
    location: "Soliman, Tunisie",
    period: "2021",
    title: "Stage en Gestion Administrative",
    missions: [
      "Gestion des factures et transactions financières via Excel.",
      "Développement de compétences en gestion administrative.",
    ],
  },
];

function ExperienceSection() {
  const titleRefs = useRef([]);
  const timelineRef = useRef();
  const [pointPositions, setPointPositions] = useState([]);

  useEffect(() => {
    function updatePositions() {
      if (!timelineRef.current) return;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const positions = titleRefs.current.map((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return rect.top + rect.height / 2 - timelineRect.top;
        }
        return 0;
      });
      setPointPositions(positions);
    }
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const hasPoints = pointPositions.length > 1 && pointPositions.every((pos) => pos > 0);
  const lineTop = hasPoints ? pointPositions[0] : 0;
  const lineHeight = hasPoints ? pointPositions[pointPositions.length - 1] - pointPositions[0] : 0;

  return (
    <section
      id="experience"
      style={{
        backgroundImage:
          "linear-gradient(to bottom left, rgba(17, 16, 16, 0.582), rgba(12, 8, 24, 0.904))",
        color: "white",
        padding: "90px 0 30px 0",
      }}
    >
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={12} className="d-flex align-items-center justify-content-center">
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 18,
				borderColor: "transparent",
              }}
            >
              <FaBriefcase style={{ color: "#0078d7", fontSize: 22 }} />
            </div>
            <h2
              className="fw-bold mb-0"
              style={{
                color: "var(--imp-text-color, #c770f0)",
                fontSize: "2.1rem",
                letterSpacing: "1px",
              }}
            >
              Expérience Professionnelle
            </h2>
          </Col>
        </Row>

        <Row className="gx-0 justify-content-center" style={{ position: "relative" }}>
          <Col xs={2} md={2} className="timeline-vertical-col" style={{ position: "relative" }}>
            <div className="timeline-vertical" ref={timelineRef} style={{ position: "relative", height: "100%" }}>
              {hasPoints && (
                <div
                  className="timeline-vertical-line"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: `${lineTop}px`,
                    height: `${lineHeight}px`,
                  }}
                />
              )}
              {pointPositions.map((pos, idx) => (
                <div
                  key={idx}
                  className="timeline-vertical-point"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: `${pos}px`,
                  }}
                />
              ))}
            </div>
          </Col>

          <Col xs={10} md={10}>
            <Row className="gx-0">
              {experiences.map((exp, idx) => (
                <Col key={idx} xs={12} md={6} className="mb-4 d-flex project-card card-full-width">
                  <Card
                    className="project-card-view w-100"
                    style={{
                      boxShadow: "0 4px 5px 3px rgba(119, 53, 136, 0.459)",
                      color: "white",
                      backgroundColor: "transparent",
                      opacity: 0.9,
                      transition: "all 0.5s ease 0s",
                      height: "100%",
                      borderRadius: 18,
                      border: "none",
                      marginBottom: "32px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Card.Body>
                      <div className="d-flex align-items-center mb-2" ref={(el) => (titleRefs.current[idx] = el)}>
                        <div style={{ marginRight: 10 }}>{iconForExperience[exp.company] || <FaBriefcase color="#c770f0" size={20} />}</div>
                        <span
                          className="fw-bold"
                          style={{
                            fontSize: "1.2rem",
                            color: "#c770f0",
                          }}
                        >
                          {safeText(exp.title)}
                        </span>
                      </div>

                      <div className="d-flex flex-wrap mb-3" style={{ gap: "24px 32px" }}>
                        <span className="d-flex align-items-center" style={{ color: "#bdbdbd" }}>
                          <FaBuilding style={{ marginRight: 8, color: "#c770f0" }} />
                          {safeText(exp.company)}
                        </span>
                        <span className="d-flex align-items-center" style={{ color: "#bdbdbd" }}>
                          <FaMapMarkerAlt style={{ marginRight: 8, color: "#c770f0" }} />
                          {safeText(exp.location)}
                        </span>
                        <span className="d-flex align-items-center" style={{ color: "#bdbdbd" }}>
                          <FaCalendarAlt style={{ marginRight: 8, color: "#c770f0" }} />
                          {safeText(exp.period)}
                        </span>
                      </div>

                      <ul style={{ color: "#fff", paddingLeft: 24, marginBottom: 0 }}>
                        {exp.missions.map((mission, i) => (
                          <li key={i} style={{ marginBottom: 8, listStyle: "circle" }}>
                            {safeText(mission)}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ExperienceSection;
