import { Input } from "antd";

const NumericInput = (props) => {
  const { value, onChange } = props;

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;

    // Allow empty input or valid number input
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue); // Always treat the value as a string
    }
  };

  // Optional: Handle blur if you want to process the input further
  const handleBlur = () => {
    // If needed, you can format the phone number or validate here
    // For now, let's just pass the current value on blur
    onChange(value);
  };

  return (
    <Input
      {...props}
      value={value} // Ensure the input displays the current value correctly
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Input a phone number"
      maxLength={16}
    />
  );
};

const NumInput = ({ value, onChange }) => {
  return <NumericInput className="w-full" value={value} onChange={onChange} />;
};

export default NumInput;
