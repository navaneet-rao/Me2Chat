import React, { Component, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

interface UserInputTextFieldProps {
  placeholder: string; // Provide a type annotation for the placeholder prop
  handleChange: (value: string) => void;
  isPass: boolean;
}

const UserInputTextField: React.FC<UserInputTextFieldProps> = ({
  placeholder,
  handleChange,
  isPass,
}) => {
  const [InputValue, setInputValue] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(true);
  const [icon, setIcon] = useState<"lock" | "person" | "email">();

  const handleChangeEvent = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = e.nativeEvent; // Extract the value from the event
    setInputValue(text);
    handleChange(text); // Optionally pass the value to the parent component
  };

  useLayoutEffect(() => {
    switch (placeholder) {
      case "Password":
        return setIcon("lock");
      case "Name":
        return setIcon("person");
      case "Email":
        return setIcon("email");
    }
  });

  return (
    <View className="flex-row w-full p-4 my-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-400 focus:border-orange-400">
      <MaterialIcons name={icon} size={24} color={"#CC7A00"} />

      <TextInput
        className=" flex-1 px-5"
        value={InputValue}
        placeholder={placeholder}
        autoCapitalize="none"
        onChange={handleChangeEvent}
        secureTextEntry={isPass && showPass} // Show/hide password input field based on showPass
      />

      {isPass && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Entypo
            name={`${showPass ? "eye" : "eye-with-line"}`}
            size={24}
            color={"#CC7A00"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserInputTextField;
