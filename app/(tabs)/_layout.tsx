import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { Asset } from "expo-asset";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,

        tabBarButton: HapticTab,

        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: Asset.fromModule(
                  require("../../assets/images/Navbar/home.png")
                ).uri,
              }}
              className="size-5"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="campaign"
        options={{
          title: "Campaigns",
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: Asset.fromModule(
                  require("../../assets/images/Navbar/campaign.png")
                ).uri,
              }}
              className="size-5"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="update"
        options={{
          title: "Update",
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: Asset.fromModule(
                  require("../../assets/images/Navbar/update.png")
                ).uri,
              }}
              className="size-5"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: Asset.fromModule(
                  require("../../assets/images/Navbar/calendar.png")
                ).uri,
              }}
              className="size-5"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: Asset.fromModule(
                  require("../../assets/images/Navbar/chat.png")
                ).uri,
              }}
              className="size-5"
            />
          ),
        }}
      />
    </Tabs>
  );
}
