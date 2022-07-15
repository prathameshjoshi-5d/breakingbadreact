import React from "react";
import styles from "./container.module.css";

interface containerProps {
  children: React.ReactNode;
}
const Container: React.FC<containerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
