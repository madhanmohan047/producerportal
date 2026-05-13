import React from "react";
import styles from "./IconButton.module.scss";

type IconButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "transparent";
  className?: string;
};
const IconButton = ({
  label,
  icon,
  onClick,
  disabled = false,
  type = "button",
  variant = "default",
  className = "",
}: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${
          variant === "transparent"
            ? styles.transparentButton
            : styles.iconButton
        } ${className}`.trim()}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default IconButton;
