import { forwardRef } from "react";
import { Select } from "antd";
import { countries } from "./Countries";
import Flag from "react-world-flags";

const { Option } = Select;

const CountrySelect = forwardRef(({ value, onChange }, ref) => (
  <Select
    ref={ref} // Forward the ref here
    className="w-full"
    placeholder="Select a country"
    showSearch
    optionFilterProp="children"
    value={value} // Set the value prop
    onChange={onChange} // Set the onChange handler
  >
    {countries.map((country) => (
      <Option key={country.code} value={country.name}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <Flag
            code={country.code}
            style={{ width: 20, height: 15, marginRight: 8 }}
          />
          {country.name}
        </span>
      </Option>
    ))}
  </Select>
));

// Don't forget to set displayName for better debugging
CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
