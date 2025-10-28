import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import jobBoard from "../../Assets/Projects/Job-Board.png";
import ekitab from "../../Assets/Projects/Ekitab.png";
import dewini from "../../Assets/Projects/dewini.png";
import sneakerHub from "../../Assets/Projects/SneakerHub.png";
import excelleManger from "../../Assets/Projects/ExcelleManger.png";
import bigs from "../../Assets/Projects/Bigs.png";

import dewiniVid from "../../Assets/Projects/Dewini_Vid.mp4";
import excelVid from "../../Assets/Projects/Excel_Vid.mp4";
import bigsVid from "../../Assets/Projects/BigS_vid.mp4";

function Projects() {
  return (
    <div className="project-section" id="projects">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Voici quelques projets sur lesquels j'ai travaillé récemment.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={jobBoard}
              title="Job-Board-Ch"
              description="JOB-Board-CH est une plateforme web conçue pour faciliter la recherche d'emploi des jeunes diplômés. Le projet propose une expérience utilisateur fluide et personnalisée, intégrant des fonctionnalités innovantes telles que : création de profils candidats et entreprises, gestion des offres d'emploi, tableau de bord interactif pour suivre les candidatures, et moteur de recherche avancé. L’objectif est de connecter efficacement les talents émergents aux opportunités professionnelles adaptées à leurs profils."
              ghLink="https://github.com/ShedlyLaad/Job-Board-Ch"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ekitab}
              title="E-Kitab"
              description="E-KITAB est une plateforme en ligne moderne qui permet de louer et acheter des livres facilement. Elle propose une interface intuitive, accessible partout, et adaptée à différents rôles : admin, auteur et utilisateur. Construite avec React, Node.js et MongoDB, elle offre une gestion simple des livres et des commandes. Son objectif est de rendre la lecture plus pratique, connectée et ouverte à tous."
              ghLink="https://github.com/ShedlyLaad/pp-ebooks"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dewini}
              title="Dewini"
              description="Dewini est une plateforme humanitaire innovante qui facilite la connexion entre donateurs, médecins et associations. Conçue avec une approche UX/UI centrée sur l’humain, elle offre une expérience simple, fluide et engageante. Chaque interaction est pensée pour renforcer la confiance, encourager le don et favoriser une collaboration positive."
              linkedinLink="https://www.linkedin.com/pulse/nouveau-projet-uxui-dewini-laadhiby-chedly-nfpaf/"
              demoVideo={dewiniVid}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sneakerHub}
              title="SneakerHub"
              description="SneakerHub est une application mobile développée avec React Native, destinée aux passionnés de sneakers. Elle permet de parcourir un catalogue de produits, d’acheter en ligne, de localiser les boutiques à proximité et de filtrer les recherches selon plusieurs critères. Grâce à React Native, l’application offre une interface fluide et une compatibilité multiplateforme, optimisant l’expérience utilisateur sur Android et iOS."
              ghLink="https://github.com/ShedlyLaad/pp-sneakerhub"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={excelleManger}
              title="ExcelleManger"
              description="Application MERN (MongoDB, Express, React, Node.js) avec un dashboard bien structuré, séparant clairement le backend (API sécurisée) et le frontend (interface React avec Ant Design). Le projet inclut l'authentification, la gestion des utilisateurs et la manipulation de fichiers Excel (import, affichage et export)."
              ghLink="https://github.com/ShedlyLaad/PP-ExcelManager"
              demoVideo={excelVid}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bigs}
              title="BIGSCREEN Sondage"
              description="BIGSCREEN Sondage est une application web développée avec Laravel pour le backend et React pour le frontend. Elle permet de concevoir, gérer et analyser des sondages en ligne destinés aux utilisateurs de la plateforme Bigscreen. Le projet intègre une interface publique pour répondre aux sondages, un espace utilisateur pour consulter ou modifier les réponses, ainsi qu’un espace administrateur doté d’un tableau de bord, de statistiques et d’une option d’export des résultats. Il repose sur XAMPP pour la base de données MySQL et a été développé avec VS Code et Cursor. La conception des diagrammes a été réalisée sur Miro et les éléments graphiques créés avec Illustrator."
              ghLink="https://github.com/ShedlyLaad/BIGSCREEN_Sondage"
              demoVideo={bigsVid}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
