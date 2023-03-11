import * as React from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
interface VehicleSelectProps {
  handleChange?: () => void;
  children?: React.ReactNode;
  title?: string;
  value: any;
  error?: boolean;
  name?: string;
  label?: string;
}
interface IVehicleSelect {
  title: string;
  vin: string;
}
export const VehicleSelect: React.FC<VehicleSelectProps> = ({
  error,
  name,
  handleChange,
  value,
  label,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const vehicles: IVehicleSelect[] = [
    { title: "Audi A8", vin: "WAUZZZZ12323KAJ" },
    { title: "BMW X3", vin: "WAUZZZZ12323KAJ" },
    { title: "Audi A4", vin: "WAUZZZZ12323KAJ" },
    { title: "Audi RS3", vin: "WAUZZZZ12323KAJ" },
    { title: "Mazda CX-5", vin: "WAUZZZZ12323KAJ" },
    { title: "Mercedes S560", vin: "WAUZZZZ12323KAJ" },
  ];
  const handleOpen = () => {
    console.log("HANDLE OPEN");
  }
  return (
    <Autocomplete
      size="small"
      multiple
      defaultValue={vehicles.slice(0, 2)}
      onOpen={handleOpen}
      id="checkboxes-tags-demo"
      options={vehicles}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title + "-" + option.vin}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title + "-" + option.vin}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Vehicles" placeholder="Select vehicles" />
      )}
    />
  );
};
