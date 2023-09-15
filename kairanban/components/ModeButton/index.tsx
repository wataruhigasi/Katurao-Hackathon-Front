import React from "react";
import EditSvg from "../../public/EditIcon.svg";
import SelectSvg from "../../public/SelectIcon.svg";
import DragSvg from "../../public/DragIcon.svg";
import styles from "./index.module.css";

type ModeButtonProps = {
  mode: "select" | "edit";
  onClick: (mode: "select" | "edit") => () => void;
};

const ModeButton: React.FC<ModeButtonProps> = ({ mode, onClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <div
        className={mode === "select" ? styles.iconSelected : styles.icon}
        onClick={onClick("select")}
      >
        <SelectSvg />
      </div>
      <div
        className={mode === "edit" ? styles.iconSelected : styles.icon}
        onClick={onClick("edit")}
      >
        <EditSvg />
      </div>
    </div>
  );
};

export default ModeButton;
