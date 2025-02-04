import ContactDetails from "@/components/Report/ContactDetails";
import Form from "@/components/Report/Form";
import ImageCarousel from "@/components/Report/ImageCarousel";
import VenueDetails from "@/components/Report/VenueDetails";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Asset } from "expo-asset";
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
  const { data: recceData } = useQuery<RecceData>({
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
  console.log(id);

  const localImages = [
    require("../../assets/images/Report/carousel1.png"),
    require("../../assets/images/Report/call.png"),
    require("../../assets/images/Report/maps.png"),
  ];
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
