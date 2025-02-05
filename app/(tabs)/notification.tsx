import Notification from "@/components/Notification/Notification";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

interface NotificationType {
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

export default function NotificationScreen() {
  const {
    data: notificationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notification"],
  });

  if (isLoading) {
    return (
      <SafeAreaView>
        <Stack screenOptions={{ headerShown: true }} />
        <Stack.Screen name="notification" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#5B4FE9" />
          <Text className="text-gray-600 mt-2">Loading notifications...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Stack screenOptions={{ headerShown: true }} />
        <Stack.Screen name="notification" />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-lg mb-2">Oops!</Text>
          <Text className="text-gray-600 text-center">
            Something went wrong while loading notifications.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Stack screenOptions={{ headerShown: true }} />
      <Stack.Screen name="notification" />
      {(notificationData as { notification: NotificationType[] })?.notification
        ?.length === 0 ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-600 text-center">
            No notifications yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={
            (notificationData as { notification: NotificationType[] })
              ?.notification ?? []
          }
          renderItem={({ item }) => <Notification details={item} />}
          keyExtractor={(item) => item.notificationID}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </SafeAreaView>
  );
}
