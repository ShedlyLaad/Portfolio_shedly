import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn, FaDownload } from "react-icons/fa";
import Particle from "../Particle";
import myImg from "../../Assets/me.png";
import pdf from "../../Assets/../Assets/CV_Chedly_Laadhiby.pdf";

// Correction: garantir que les enfants des balises <a> sont valides (évite le rendu d'objets bruts)
const safeNode = (value) => {
  if (React.isValidElement(value)) return value;
  if (typeof value === "string" || typeof value === "number") return value;
  return value != null ? String(value) : "";
};

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div id="resume">
      <Container fluid className="resume-section">
        <Particle />
        <Row
          className="w-100"
          style={{
            maxWidth: 1100,
            justifyContent: "center",
            position: "relative",
            minHeight: "80vh",
            background: "#181824",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          {/* Colonne gauche */}
          <Col
            md={7}
            className="d-flex flex-column justify-content-center align-items-start"
          >
            <h1
              className="fw-bold mb-1"
              style={{ fontSize: "2.8rem", color: "#6c63ff" }}
            >
              Nom Prénom
            </h1>
            <h3 className="fw-semibold mb-2" style={{ fontSize: "1.5rem" }}>
              Développeur Full Stack
            </h3>
            <p
              className="mb-4"
              style={{ fontSize: "1.1rem", color: "#bdbdbd" }}
            >
              Construire des solutions web modernes, performantes et élégantes.
            </p>
            {/* Bloc Liens Sociaux */}
            <div className="d-flex gap-3 mb-4">
              <a
                href="https://www.linkedin.com/in/soumyajit4419/"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#23234f",
                  color: "#6c63ff",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {/* Correction: S'assurer que l'enfant est un élément JSX valide */}
                {safeNode(<FaLinkedinIn />)}
              </a>
              <a
                href="https://github.com/soumyajit4419"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#23234f",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {/* Correction: S'assurer que l'enfant est un élément JSX valide */}
                {safeNode(<AiFillGithub />)}
              </a>
              <a
                href="mailto:email@example.com"
                style={{
                  background: "#23234f",
                  color: "#6c63ff",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {/* Correction: S'assurer que l'enfant est un élément JSX valide */}
                {safeNode(<AiOutlineMail />)}
              </a>
            </div>
            {/* Bloc Appel à l'action */}
            <div className="d-flex gap-3">
              <Button
                variant="primary"
                href={pdf}
                target="_blank"
                className="d-flex align-items-center px-4 py-2 rounded-pill"
                style={{
                  background: "#6c63ff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                <FaDownload className="me-2" />
                Télécharger CV
              </Button>
              <Button
                variant="outline-light"
                href="https://github.com/soumyajit4419"
                target="_blank"
                className="d-flex align-items-center px-4 py-2 rounded-pill"
                style={{
                  border: "2px solid #6c63ff",
                  color: "#6c63ff",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                <AiFillGithub className="me-2" />
                Voir GitHub
              </Button>
            </div>
          </Col>
          {/* Colonne droite */}
          <Col
            md={5}
            className="d-flex justify-content-center align-items-center mt-5 mt-md-0"
          >
            <div
              style={{
                borderRadius: "50%",
                border: "5px solid #6c63ff",
                padding: 6,
                boxShadow: "0 0 32px #6c63ff55",
                background: "#23234f",
              }}
            >
              <img
                src={myImg}
                alt="avatar"
                style={{
                  width: 220,
                  height: 220,
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
