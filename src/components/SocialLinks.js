// filepath: c:\Users\shedl\OneDrive\Desktop\portfolio\Portfolio\src\components\Home\SocialLinks.js
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn, FaDownload } from "react-icons/fa";
import myImg from "../Assets/me.png";
import pdf from "../Assets/CV-Chedly Laadhiby.pdf";
const safeNode = (value) => {
  if (React.isValidElement(value)) return value;
  if (typeof value === "string" || typeof value === "number") return value;
  return value != null ? String(value) : "";
};

function SocialLinks() {
  return (
    <div
      id="contact" // Ajout de l'id pour l'ancre
      style={{
        minHeight: "80vh",
        background: "#181824", // couleur sombre, à adapter selon votre thème principal
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0"
      }}
    >
      <Row className="w-100" style={{ maxWidth: 1100 }}>
        {/* Colonne gauche */}
        <Col
          md={7}
          className="d-flex flex-column justify-content-center align-items-start"
        >
          {/* Bloc Identité */}
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.8rem", color: "#6c63ff" }}>
            Trouver Moi !
          </h1>
          <h3 className="fw-semibold mb-2" style={{ fontSize: "1.5rem" }}>
            Développeur Full Stack
          </h3>
          <p className="mb-4" style={{ fontSize: "1.1rem", color: "#bdbdbd" }}>
            Construire des solutions web modernes, performantes et élégantes.
          </p>
          {/* Bloc Liens Sociaux */}
          <div className="d-flex gap-3 mb-4">
            <a
              href="https://www.linkedin.com/in/chedlylaadhiby98/"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#23234f",
                color: "#0a66c2",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              {/* Correction: s'assurer que l'enfant de <a> est un élément JSX valide */}
              {safeNode(<FaLinkedinIn />)}
            </a>
            <a
              href="https://github.com/ShedlyLaad"
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              {/* Correction: s'assurer que l'enfant de <a> est un élément JSX valide */}
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              {/* Correction: s'assurer que l'enfant de <a> est un élément JSX valide */}
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
                fontSize: "1rem"
              }}
            >
              <FaDownload className="me-2" />
              Télécharger le CV
            </Button>
            <Button
              variant="outline-light"
              href="https://github.com/ShedlyLaad"
              target="_blank"
              className="d-flex align-items-center px-4 py-2 rounded-pill"
              style={{
                border: "2px solid #6c63ff",
                color: "#6c63ff",
                fontWeight: 600,
                fontSize: "1rem"
              }}
            >
              <AiFillGithub className="me-2" />
              Voir GitHub
            </Button>
          </div>
        </Col>
        {/* Colonne droite */}
           <Col md={4} className="myAvtar">
            
              <img src={myImg} className="img-fluid" alt="avatar" />
            
          </Col>
      </Row>
    </div>
  );
}

export default SocialLinks;