import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";

type ComboBoxProps = {
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
};

export function ComboBox({ options, placeholder = "Select an option", onChange}: ComboBoxProps) {
  const [value, setValue] = useState("")

  function handleChange(value: string){
    setValue(value)
    // Whatever function passed in as a prop will receive the value 
    // variable and be able to use in the outer context
    onChange?.(value)
  }

  return (
    <Combobox 
      items={options}
      value={value}
      onValueChange={handleChange}
    >
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}