import Notification from "@/components/Notification/Notification";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";

export default function NotificationScreen() {
  const { data: notificationData } = useQuery({
    queryKey: ["notification"],
  });

  console.log(notificationData);

  return (
    <SafeAreaView>
      <Stack screenOptions={{ headerShown: true }} />
      <Stack.Screen name="notification" />

      <FlatList
        data={notificationData?.notification}
        renderItem={({ item }) => <Notification details={item} />}
        keyExtractor={(item) => item.notificationID}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}
