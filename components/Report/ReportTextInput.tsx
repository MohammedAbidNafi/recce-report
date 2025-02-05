import React from "react";
import { Text, TextInput, View } from "react-native";

const ReportTextInput = ({
  placeholder,
  inputClassName,
  boxClassName,
  value,
  editable,
  onChangeText,
  error,
}: {
  placeholder: string;
  inputClassName?: string;
  boxClassName?: string;
  value?: string;
  editable?: boolean;
  onChangeText: (text: string) => void;
  error?: string;
}) => {
  return (
    <View className={boxClassName || "flex flex-col w-[50%]"}>
      <Text className="text-[#3C3D3E] text-[10px]">{placeholder}</Text>
      <TextInput
        className={`text-black bg-[#F9F9F9] w-full  mt-1 h-11 px-3 rounded ${
          error ? "border border-red-500" : ""
        }`}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

export default ReportTextInput;
