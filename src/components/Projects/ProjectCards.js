import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import VideoPlayer from "./VideoPlayer";

// Modal vidéo
function DemoModal({ show, onHide, videoSrc, poster }) {
  const isValidVideo = typeof videoSrc === "string" && videoSrc.endsWith(".mp4");

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header
        closeButton
        style={{ background: "#181824", borderBottom: "none" }}
      >
        <Modal.Title style={{ color: "#c770f0", fontWeight: 600 }}>
          Démo Vidéo
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "#23234f", padding: 0 }}>
        {isValidVideo ? (
          <div style={{ padding: "16px" }}>
            <VideoPlayer
              src={videoSrc}
              poster={poster}
              isModal={true}
              controls={true}
            />
          </div>
        ) : (
          <p
            style={{
              color: "#fff",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Vidéo non disponible ou invalide.
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}

function ProjectCards(props) {
  const [showDemo, setShowDemo] = useState(false);

  // Empêche le rendu d’objets React invalides dans le texte
  const safeText = (value) => {
    if (typeof value === "string") return value;
    if (React.isValidElement(value)) return "";
    return String(value || "");
  };

  // Correction: s'assurer que les icônes enfants de <Button>/<a> sont des éléments valides
  const GithubIcon = React.isValidElement(<BsGithub />) ? <BsGithub /> : null;
  const LinkedinIcon = React.isValidElement(<BsLinkedin />) ? <BsLinkedin /> : null;
  const WebsiteIcon = React.isValidElement(<CgWebsite />) ? <CgWebsite /> : null;

  return (
    <Card className="project-card-view">
      {/* If a demo video is provided show a lazy-loaded preview; otherwise show the static image */}
      {props.demoVideo ? (
        <VideoPlayer src={props.demoVideo} poster={props.imgPath} />
      ) : (
        <Card.Img variant="top" src={props.imgPath} alt={props.title || "project"} />
      )}
      <Card.Body>
        <Card.Title>{safeText(props.title)}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {safeText(props.description)}
        </Card.Text>

        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank">
            {/* Correction: enfant de lien doit être un nœud valide */}
            {GithubIcon} {"\u00A0"} GitHub
          </Button>
        )}

        {props.linkedinLink && (
          <Button
            variant="primary"
            href={props.linkedinLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            {/* Correction: enfant de lien doit être un nœud valide */}
            {LinkedinIcon} {"\u00A0"} LinkedIn
          </Button>
        )}

        {!props.isBlog && props.demoVideo && (
          <>
            <Button
              variant="primary"
              style={{
                marginLeft: "10px",
                background: "#6c63ff",
                border: "none",
              }}
              onClick={() => setShowDemo(true)}
            >
              {/* Correction: enfant de bouton doit être un nœud valide */}
              {WebsiteIcon} {"\u00A0"} Demo
            </Button>

            <DemoModal
              show={showDemo}
              onHide={() => setShowDemo(false)}
              videoSrc={props.demoVideo}
              poster={props.imgPath}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
