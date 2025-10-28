import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiSolidity,
  SiPostgresql,
  SiFigma, // ajout Figma
  SiMysql, // ajout MySQL
  SiAngular, // ajout Angular
} from "react-icons/si";
import { MdDesignServices } from "react-icons/md"; // ajout UI/UX
import { FaRegGem } from "react-icons/fa"; // ajout logo générique

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* <Col xs={4} md={2} className="tech-icons">
        <CgCPlusPlus />
      </Col> */}
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
      </Col>
      {/* <Col xs={4} md={2} className="tech-icons">
        <TbBrandGolang />
      </Col> */}
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSolidity />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMongodb />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNextdotjs />
      </Col>
      {/* Ajout de Angular */}
      <Col xs={4} md={2} className="tech-icons">
        <SiAngular />
      </Col>
      {/* Ajout de React Native */}
      {/* <Col xs={4} md={2} className="tech-icons">
        <SiReactnative />
      </Col> */}
      <Col xs={4} md={2} className="tech-icons">
        <DiGit />
      </Col>
      {/* <Col xs={4} md={2} className="tech-icons">
        <SiFirebase />
      </Col> */}
      {/* Ajout de SQL */}
      <Col xs={4} md={2} className="tech-icons">
        <SiPostgresql />
      </Col>
      {/* Ajout de MySQL */}
      <Col xs={4} md={2} className="tech-icons">
        <SiMysql />
      </Col>
      {/* Ajout de Figma */}
      <Col xs={4} md={2} className="tech-icons">
        <SiFigma />
      </Col>
      {/* Ajout de UI/UX */}
      <Col xs={4} md={2} className="tech-icons">
        <MdDesignServices />
      </Col>
      {/* Ajout du logo générique */}
      <Col xs={4} md={2} className="tech-icons">
        <FaRegGem />
      </Col>
      {/* <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col> */}
      <Col xs={4} md={2} className="tech-icons">
        <DiJava />
      </Col>
    </Row>
  );
}

export default Techstack;
