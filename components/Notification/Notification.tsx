import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Asset } from "expo-asset";
import { router } from "expo-router";

interface NotificationDetails {
  notificationID: string;
  type: string;
  recceID: string;
  content: string;
  by: string;
  for?: string;
  event?: string;
  venue?: string;
  image: {
    uri: string;
    type: "local" | "remote";
  };
  time: string;
}

const imageMapping = {
  profile1: require("../../assets/images/Profile/profile1.png"),
  profile2: require("../../assets/images/Profile/profile2.png"),
  admin: require("../../assets/images/Profile/profile3.png"),
};

const Notification = ({ details }: { details: NotificationDetails }) => {
  const getImageSource = () => {
    return imageMapping[details.image.uri as keyof typeof imageMapping];
  };

  return (
    <>
      {details.type === "recce" && (
        <View className="container">
          <View className="container flex flex-row items-center justify-between w-full py-4 pl-4 pr-2 bg-[#FEFAEB] border-b border-[#E2E2E2]">
            <Image
              style={{ width: 38, height: 38 }}
              source={getImageSource()}
            />
            <Text className="text-black pl-3 text-[12px] break-words">
              <Text className="font-bold">{details.by}</Text> {details.content}{" "}
              <Text
                className="text-[12px] text-[#5B4FE9]"
                onPress={() => {
                  router.push(`/report/${details.recceID}`);
                }}
              >
                View Form
              </Text>
            </Text>
            <Text className="text-[10px] text-[#9A9A9A] pl-1">
              {details.time}
            </Text>
          </View>
        </View>
      )}

      {details.type === "approved" && (
        <View className="container">
          <View className="container flex flex-row items-center justify-between w-full py-4 pl-4 pr-2 bg-white border-b border-[#E2E2E2]">
            <Image
              style={{ width: 38, height: 38 }}
              source={getImageSource()}
            />
            <Text className="text-black pl-3 text-[12px] break-words ">
              <Text className="font-bold">{details.by}</Text> {details.content}{" "}
              <Text>{details.for}</Text>in <Text>{details.event}</Text>
              <Text className="text-[12px] text-[#5B4FE9]"> View Details</Text>
            </Text>
            <Text className="text-[10px] text-[#9A9A9A] pl-1">
              {details.time}
            </Text>
          </View>
        </View>
      )}

      {details.type === "reply" && (
        <View className="container">
          <View className="container flex flex-row items-center justify-between w-full py-4 pl-4 pr-2 bg-white border-b border-[#E2E2E2]">
            <Image
              style={{ width: 38, height: 38 }}
              source={getImageSource()}
            />
            <Text className="text-black pl-3 text-[12px] break-words ">
              <Text className="font-bold">{details.by}</Text> {details.content}{" "}
              <Text>{details.event}</Text>
            </Text>
            <Text className="text-[10px] text-[#9A9A9A] pl-1">
              {details.time}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Notification;
