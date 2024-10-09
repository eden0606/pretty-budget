import { ButtonHTMLAttributes, FunctionComponent } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<any> {
  // TODO: what should this be?
  children: any;
}

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {children}
    </button>
  );
};

export default Button;
