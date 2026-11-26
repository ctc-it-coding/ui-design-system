import { createContext, useContext } from 'react';

export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}
export interface CheckboxGroupContextValue {
  value: string[];
  onToggle: (value: string, checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);
export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);
export const useRadioGroup = () => useContext(RadioGroupContext);
export const useCheckboxGroup = () => useContext(CheckboxGroupContext);
