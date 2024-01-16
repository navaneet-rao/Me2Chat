import React, { useState } from 'react';
import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface UserInputTextFieldProps {
  placeholder: string; // Provide a type annotation for the placeholder prop
  handleChange: (value: string) => void;
}

const UserInputTextField: React.FC<UserInputTextFieldProps> = ({ placeholder, handleChange }) => {
  const [InputValue, setInputValue] = useState("");

  const handleChangeEvent = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent; // Extract the value from the event
    setInputValue(text);
    handleChange(text); // Optionally pass the value to the parent component
  };

  return (
    <>
      <TextInput
        value={InputValue}
        className="block w-full p-4 my-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-400 focus:border-orange-400"
        placeholder={placeholder}
        autoCapitalize="none"
        onChange={handleChangeEvent}
      />
    </>
  );
};

export default UserInputTextField;
