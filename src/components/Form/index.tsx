import { FunctionComponent, HTMLAttributes } from "react";
import Button from "../Button";
import styles from "./Form.module.scss";

// TODO: do i need any props to be passed in??
interface FormProps extends HTMLAttributes<HTMLDivElement> {}

const Form: FunctionComponent<FormProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <form className={styles.form}>
        {/* TODO: change to date picker package */}
        <div>
          <label htmlFor="date">date</label>
          <input name="date" />
        </div>
        <div>
          <label htmlFor="purchase">purchase</label>
          <input name="purchase" />
        </div>
        <div>
          <label htmlFor="store">store</label>
          <input name="store" />
        </div>
        <div>
          {/* TODO: make these pill selectors */}
          <label htmlFor="category">category</label>
          <input name="category" />
        </div>
        <div>
          {/* TODO: make this a toggle */}
          <label htmlFor="want-or-need">want or need?</label>
          <input name="want-or-need" />
        </div>
        <div>
          <label htmlFor="amount">amount</label>
          <input name="amount" />
        </div>
        <Button>submit</Button>
      </form>
    </div>
  );
};

export default Form;
