import React from "react";
import EditSvg from "../../public/EditIcon.svg";
import SelectSvg from "../../public/SelectIcon.svg";
import styles from "./index.module.css";

const ModeButton: React.FC = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.icon}>
        <SelectSvg />
      </div>
      <div className={styles.icon}>
        <EditSvg />
      </div>
    </div>
  );
};

export default ModeButton;
