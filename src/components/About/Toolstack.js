import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiCanva,    // ajout Canva
  SiStartrek, // substitut UML Start
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* <Col xs={4} md={2} className="tech-icons">
        <SiMacos />
      </Col> */}
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSlack />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel />
      </Col>
      {/* Ajout de Canva */}
      <Col xs={4} md={2} className="tech-icons">
        <SiCanva />
      </Col>
      {/* Ajout de Cursor */}
      {/* <Col xs={4} md={2} className="tech-icons">
        <SiCursor />
      </Col> */}
      {/* Ajout de UML Start (substitut) */}
      <Col xs={4} md={2} className="tech-icons">
        <SiStartrek />
      </Col>
    </Row>
  );
}

export default Toolstack;
