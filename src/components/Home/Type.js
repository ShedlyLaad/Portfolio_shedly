import React, { useState, useEffect } from "react";

function Type() {
  const words = ["Développeur Logiciel", "Freelance"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  // Slower default typing speed (ms). Higher = slower.
  const [speed, setSpeed] = useState(220);

  useEffect(() => {
    let timeout;
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && text === currentWord) {
      // longer pause at end so the word stays visible longer
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && text === "") {
      // move to next word
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
      setSpeed(220);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
        );
        // slightly faster when deleting but still readable
        if (isDeleting) setSpeed(120);
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
