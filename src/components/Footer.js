import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

// Correction: garantir que les enfants passés aux balises <a> sont des éléments JSX valides
const safeNode = (value) => {
  if (React.isValidElement(value)) return value;
  if (typeof value === "string" || typeof value === "number") return value;
  return value != null ? String(value) : "";
};

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Chedly Laadhiby</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} CL</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/ShedlyLaad"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {/* Correction: s'assurer que l'enfant de <a> est un élément JSX valide */}
                {safeNode(<AiFillGithub />)}
              </a>
            </li>
            
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/chedlylaadhiby98/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {/* Correction: s'assurer que l'enfant de <a> est un élément JSX valide */}
                {safeNode(<FaLinkedinIn />)}
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/shedlylaadhiby/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {/* Correction: s'assurer que l'enfant de <a> est un élément JSX valide */}
                {safeNode(<AiFillInstagram />)}
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
