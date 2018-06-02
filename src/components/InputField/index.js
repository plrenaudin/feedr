import { linkEvent } from "inferno";

const handleChange = (props, event) => {
  props.onChange(event.target.value);
  reset();
};

const reset = () => (event.target.value = "");

const InputField = props => <input type="text" onChange={linkEvent(props, handleChange)} />;

export default InputField;
