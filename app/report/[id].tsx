import ContactDetails from "@/components/Report/ContactDetails";
import Form from "@/components/Report/Form";
import ImageCarousel from "@/components/Report/ImageCarousel";
import VenueDetails from "@/components/Report/VenueDetails";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface RecceData {
  recceID: string;
  locName: string;
  locAddress: string;
  locCity: string;
  locState: string;
  locMapLink: string;
  contactName: string;
  contactNo: string;
  contactWhatsapp: string;
  contactPOC: string;
}

const Report = () => {
  const { id } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const {
    data: recceData,
    isLoading,
    error,
  } = useQuery<RecceData>({
    queryKey: ["recce", id],
    queryFn: async (): Promise<RecceData> => {
      const allData = queryClient.getQueryData<{ reports: RecceData }>([
        "recce",
      ]);
      if (!allData?.reports) throw new Error("No reports data found");

      const report = allData.reports;
      if (report.recceID === id) {
        return report;
      }
      throw new Error("No reports data found");
    },
    enabled: !!id,
  });

  const localImages = [
    require("../../assets/images/Report/carousel1.png"),
    require("../../assets/images/Report/call.png"),
    require("../../assets/images/Report/maps.png"),
  ];

  if (isLoading) {
    return (
      <SafeAreaView className="bg-white flex-1">
        <Stack.Screen options={{ headerShown: true }} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#5B4FE9" />
          <Text className="text-gray-600 mt-2">Loading report details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-white flex-1">
        <Stack.Screen options={{ headerShown: true }} />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-lg mb-2">Error</Text>
          <Text className="text-gray-600 text-center">
            {error instanceof Error ? error.message : "Failed to load report"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white">
      <Stack.Screen
        options={{
          title: `Report: ${recceData?.locName}`,
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      {recceData && (
        <ScrollView>
          <ImageCarousel images={localImages} />
          <VenueDetails
            locName={recceData?.locName}
            locAddress={recceData.locAddress}
            locCity={recceData.locCity}
            locMap={recceData.locMapLink}
            locState={recceData.locState}
          />
          <ContactDetails />
          <Form />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Report;
