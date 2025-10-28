import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/me.png";
import Tilt from "react-parallax-tilt";


function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LAISSEZ-MOI <span className="purple"> ME PRÉSENTER </span>
            </h1>
            <p className="home-about-body">
              Passionné par la programmation, il paraît que j'ai appris une ou deux
              choses en chemin... 👨‍💻
              <br />
              <br />
              Je maîtrise les technologies web fondamentales comme
              <i>
                <b className="purple"> JavaScript, HTML/CSS et PHP</b>
              </i>
              , ainsi que des frameworks modernes comme
              <i>
                <b className="purple"> React</b>
              </i>
              . Je suis également à l'aise avec les bases de données, qu'elles soient
              <i>
                <b className="purple"> SQL ou NoSQL</b>
              </i>
              .
              <br />
              <br />
              Mes centres d'intérêt se portent sur la conception de nouvelles
              technologies et produits web, avec une forte orientation vers
              l'expérience utilisateur (UI/UX) et la recherche de solutions
              innovantes.
              <br />
              <br />
              Chaque fois que possible, j'applique ma passion au développement de
              produits en utilisant
              <b className="purple"> React.js</b> et d'autres bibliothèques et
              frameworks JavaScript modernes pour construire des expériences
              utilisateur fluides et efficaces.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
          <img src={myImg} className="img-fluid" alt="avatar" />
          </Col>
       
        </Row>
       
      </Container>
    </Container>
  );
}
export default Home2;
