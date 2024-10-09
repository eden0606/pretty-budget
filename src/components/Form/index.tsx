import { FunctionComponent, HTMLAttributes } from "react";

// TODO: do i need any props to be passed in??
interface FormProps extends HTMLAttributes<HTMLDivElement> {}

const Form: FunctionComponent<FormProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <label>i am form</label>
      <input></input>
    </div>
  );
};

export default Form;
