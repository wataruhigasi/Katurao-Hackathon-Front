import React from "react";
import styles from "./RakugakiButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const RakugakiButton = (props) => {
  const toggleCanvas = (event) => {
    const value = event.target.value;
    props.setIsCanvasVisible(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.verticalButton}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button className={styles.verticalButton} onClick={toggleCanvas}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </div>
    </div>
  );
};

export default RakugakiButton;
