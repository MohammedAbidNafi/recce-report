import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Asset } from "expo-asset";
import { Link, RelativePathString } from "expo-router";

interface VenueDetailsProps {
  locName: string;
  locAddress: string;
  locCity: string;
  locState: string;
  locMap: string;
}

const VenueDetails = ({
  locName,
  locAddress,
  locCity,
  locState,
  locMap,
}: VenueDetailsProps) => {
  return (
    <View className="flex flex-col p-4">
      <View className="flex flex-col">
        <Text className="font-bold text-[18px]">{locName}</Text>
        <Text className="mt-2 text-[12px]">{locAddress}</Text>
      </View>
      <View className="flex flex-row mt-2">
        <View className="flex flex-row">
          <Text className="font-bold text-[12px]">City: </Text>
          <Text className="text-[12px]">{locCity}</Text>
        </View>
        <View className="flex flex-row pl-6">
          <Text className="font-bold text-[12px]">State: </Text>
          <Text className="text-[12px]">{locState}</Text>
        </View>
      </View>
      <View className="flex flex-row mt-2 gap-1">
        <View className="flex flex-row gap-1">
          <Text className="font-bold text-[12px]">Google Maps Link </Text>
          <Image
            style={{ width: 13, height: 13 }}
            source={{
              uri: Asset.fromModule(
                require("../../assets/images/Report/maps.png")
              ).uri,
            }}
          />
          <Text className="font-bold text-[12px]">: </Text>
        </View>

        <Link href={locMap as RelativePathString} className="text-[12px] ">
          <Text className="text-blue-500 break-all">{locMap}</Text>
        </Link>
      </View>
    </View>
  );
};

export default VenueDetails;
