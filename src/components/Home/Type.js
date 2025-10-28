import React, { useState, useEffect } from "react";

function Type() {
  const words = ["Développeur Logiciel", "Freelance"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    let timeout;
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && text === currentWord) {
      // pause at end
      timeout = setTimeout(() => setIsDeleting(true), 800);
    } else if (isDeleting && text === "") {
      // move to next word
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
      setSpeed(120);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
        );
        // speed up when deleting
        if (isDeleting) setSpeed(60);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span>
      <span>{text}</span>
      <span className="cursor" aria-hidden="true">|</span>
    </span>
  );
}

export default Type;
