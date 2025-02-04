import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function InitializeStorage() {
  useQuery({
    queryKey: ["recce"],
    queryFn: async () => {
      const recceData = await AsyncStorage.getItem("recce");
      if (!recceData) {
        const initialData = {
          reports: {
            recceID: "1",
            locName: "Manpho Convention Centre",
            locAddress:
              "95, Veerannapalya Main Rd, DadaMastan Layout, Manayata Tech Park, Nagavara, Bengaluru, Karnataka 560024",
            locCity: "Bengaluru",
            locState: "Karnataka",
            locMapLink: "https://maps.app.goo.gl/Fu2PiDudLuAQctS2A",
            contactName: "Raj Thakkar",
            contactNo: "+919491951924",
            contactWhatsapp: "https://wa.me/+919491951924",
            contactPOC: "Manpho Convention Centre",
          },
        };
        await AsyncStorage.setItem("recce", JSON.stringify(initialData));
        return initialData;
      }
      return JSON.parse(recceData);
    },
    staleTime: Infinity,
  });

  useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const notificationData = await AsyncStorage.getItem("notification");
      if (!notificationData) {
        const initialData = {
          notification: [
            {
              notificationID: "1",
              type: "recce",
              recceID: "1",
              content:
                "has sent you a Recce form Please visit the venue and conduct a recce.",
              by: "Admin",
              for: "Event Coordinator",
              event: "Acer Gaming Event Mumbai",
              image: {
                type: "local",
                uri: "admin",
              },
              time: "3 mins",
            },
            {
              notificationID: "2",
              type: "approved",
              content: "has approved your application for",
              by: "Admin",
              for: "Event Coordinator",
              event: "Acer Gaming Event Mumbai",
              image: {
                type: "local",
                uri: "admin",
              },
              time: "5 hrs",
            },
            {
              notificationID: "3",
              type: "reply",
              content: "replied to your update in",
              by: "Akash Sawant",
              event: "Acer Gaming Event Mumbai",
              image: {
                type: "local",
                uri: "profile1",
              },
              time: "yesterday",
            },
            {
              notificationID: "4",
              type: "reply",
              content: "replied to your update in",
              by: "ASanjay Jain",
              event: "Acer Gaming Event Mumbai",
              image: {
                type: "local",
                uri: "profile2",
              },
              time: "yesterday",
            },
          ],
        };
        await AsyncStorage.setItem("notification", JSON.stringify(initialData));
        return initialData;
      }
      return JSON.parse(notificationData);
    },
    staleTime: Infinity,
  });
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <InitializeStorage />
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
