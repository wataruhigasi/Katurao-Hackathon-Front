import React from "react";
import EditSvg from "../../public/EditIcon.svg";
import SelectSvg from "../../public/SelectIcon.svg";
import DragSvg from "../../public/DragIcon.svg";
import styles from "./index.module.css";

type ModeButtonProps = {
  mode: "select" | "edit" | "drag";
  onClick: (mode: "select" | "edit" | "drag") => () => void;
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
      <div
        className={mode === "drag" ? styles.iconSelected : styles.icon}
        onClick={onClick("drag")}
      >
        <DragSvg />
      </div>
    </div>
  );
};

export default ModeButton;
