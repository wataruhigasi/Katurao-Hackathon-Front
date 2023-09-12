import React from "react";
import styles from "./RakugakiButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const RakugakiButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.verticalButton}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button className={styles.verticalButton}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </div>
    </div>
  );
};

export default RakugakiButton;
