import { FunctionComponent, useState } from "react";
import styles from "./Navbar.module.scss";
import Button from "../Button";
import Form from "../Form";

// TODO: idk if navbar is the right name for this component
const Navbar: FunctionComponent = () => {
  const [isFormActive, setIsFormActive] = useState(false);

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h1>pretty budget</h1>
        <Button
          onClick={() => {
            setIsFormActive(true);
          }}
        >
          click me
        </Button>
      </div>
      <div
        id="form"
        className={`${styles.formWrapper} ${
          !isFormActive && styles.formInactive
        }`}
      >
        <Button
          onClick={() => {
            setIsFormActive(false);
          }}
        >
          x
        </Button>
        <Form className={styles.form} />
      </div>
    </section>
  );
};

export default Navbar;
