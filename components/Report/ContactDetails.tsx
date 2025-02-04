import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Asset } from "expo-asset";
import { Link } from "expo-router";

const ContactDetails = () => {
  return (
    <View className="flex flex-col p-4 mt-8">
      <View className="flex flex-col">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-[18px]">Raj Thakkar</Text>
          <View className="flex flex-row gap-6">
            <Pressable className="p-2 bg-[#EFEDFD] rounded-full">
              <Image
                style={{ width: 22, height: 22 }}
                source={{
                  uri: Asset.fromModule(
                    require("../../assets/images/Report/call.png")
                  ).uri,
                }}
              />
            </Pressable>
            <Pressable className="p-2 bg-[#EFEDFD] rounded-full">
              <Image
                style={{ width: 22, height: 22 }}
                source={{
                  uri: Asset.fromModule(
                    require("../../assets/images/Report/whatsapp.png")
                  ).uri,
                }}
              />
            </Pressable>
          </View>
        </View>
        <View className="flex flex-row items-center mt-3">
          <Text className="mt-2 text-[12px] mr-1">POC</Text>
          <View className="bg-[#808182] w-[2px] h-[2px] rounded-full"></View>
          <Text className="mt-2 text-[12px] ml-1">
            Manpho Convention Centre
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-[12px] mt-1">Bengaluru Karnataka</Text>
      </View>
    </View>
  );
};

export default ContactDetails;
