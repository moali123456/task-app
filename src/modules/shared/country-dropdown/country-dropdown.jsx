import Select from "react-select";
import countries from "world-countries";

const countryOptions = countries.map((country) => ({
  //value: country.cca2,
  value: country.name.common,
  label: country.name.common,
  flagUrl: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
}));

const CountryDropdown = ({ value, onChange, name, className }) => {
  const selectedOption =
    countryOptions.find((option) => option.value === value) || null;

  return (
    <Select
      name={name}
      options={countryOptions}
      value={selectedOption}
      onChange={(selected) => onChange(selected ? selected.value : "")}
      placeholder="Select a country"
      className={`w-full ${className}`}
      isSearchable
      isClearable
      formatOptionLabel={(country) => (
        <div className="flex items-center gap-2">
          <img src={country.flagUrl} alt={country.label} className="w-5 h-5" />
          {country.label}
        </div>
      )}
    />
  );
};

export default CountryDropdown;
