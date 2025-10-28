import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Bonjour à tous, je suis{" "}
            <span className="purple">Chedly Laadhiby</span> de{" "}
            <span className="purple">Soliman, Tunisie</span>.
            <br />
            Je suis un{" "}
            <span className="purple">futur développeur Full Stack</span>,
            actuellement étudiant en Bachelor de développement multimédia et déjà
            titulaire d'un BTS en Informatique de Gestion.
            <br />
            <br />
            En dehors du code, j'aime aussi d'autres activités !
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Explorer les nouvelles technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Travailler sur des projets personnels
            </li>
            <li className="about-activity">
              <ImPointRight /> Apprendre constamment de nouvelles choses
            </li>
          </ul>
          <p style={{ color: "rgb(155 126 172)" }}>
            "S'efforcer de créer des solutions qui font la différence !"
          </p>
          <footer className="blockquote-footer">Chedly Laadhiby</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
