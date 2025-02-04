import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import ReportTextInput from "./ReportTextInput";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Modal } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const formSchema = z.object({
  openTime: z.string().min(1, "Open time is required"),
  closeTime: z.string().min(1, "Close time is required"),
  capacity: z.string().min(1, "Capacity is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  internetAvailability: z.enum(["yes", "no"]),
  wifiType: z.enum(["public", "private", "none"]),
  internetSpeed: z.enum(["high", "medium", "low", "none"]),
  internetProvider: z.string().optional(),
  image: z.string().optional(),
  photoDescription: z.string().optional(),
  remarks: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      internetAvailability: "yes",
      wifiType: "public",
      internetSpeed: "high",
    },
  });

  const { id } = useLocalSearchParams();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const existingSubmissions = await AsyncStorage.getItem(
        "recce-submissions"
      );
      const parsedSubmissions = existingSubmissions
        ? JSON.parse(existingSubmissions)
        : {};

      const newSubmission = {
        ...data,
        recceID: id,
        submissionID: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      // Group submissions by recceID
      if (!parsedSubmissions[id as string]) {
        parsedSubmissions[id as string] = [];
      }
      parsedSubmissions[id as string].push(newSubmission);

      await AsyncStorage.setItem(
        "recce-submissions",
        JSON.stringify(parsedSubmissions)
      );
      return newSubmission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recce-submissions"] });
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    mutation.mutate(data);
    router.back();
  };

  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("Choose file...");
  const [internetAvailability, setInternetAvailability] = useState("yes");
  const [wifiType, setWifiType] = useState("public");
  const [internetSpeed, setInternetSpeed] = useState("high");
  const [showSpeedPicker, setShowSpeedPicker] = useState(false);
  const [showWifiPicker, setShowWifiPicker] = useState(false);
  const [showAvailabilityPicker, setShowAvailabilityPicker] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Extract filename from uri
      const fileName =
        result.assets[0].uri.split("/").pop() || "Selected image";
      setImageName(fileName);
    }
  };

  return (
    <View className="px-8 mt-12 w-full">
      <View className="w-full">
        <Text className="text-black text-[12px] font-semibold">Timings</Text>
        <View className="mt-2 flex flex-row w-full gap-2">
          <Controller
            control={control}
            name="openTime"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Open Time"
                value={value?.toString() || ""}
                onChangeText={onChange}
                error={errors.openTime?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="closeTime"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Close Time"
                value={value?.toString() || ""}
                onChangeText={onChange}
                error={errors.closeTime?.message}
              />
            )}
          />
        </View>
        <View className="mt-3">
          <Controller
            control={control}
            name="capacity"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Capacity"
                value={value?.toString() || ""}
                onChangeText={onChange}
                error={errors.capacity?.message}
              />
            )}
          />
        </View>
      </View>

      <View className="w-full  mt-4">
        <Text className="text-black text-[12px] font-semibold">
          Venue Dimensions (Ft)
        </Text>
        <View className="mt-2 flex flex-row w-full gap-2">
          <Controller
            control={control}
            name="length"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Length"
                value={value?.toString() || ""}
                onChangeText={onChange}
                error={errors.length?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="width"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Width"
                value={value?.toString() || ""}
                onChangeText={onChange}
                error={errors.width?.message}
              />
            )}
          />
        </View>
        <View className="mt-3">
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Height"
                value={value?.toString() || ""}
                onChangeText={onChange}
                error={errors.height?.message}
              />
            )}
          />
        </View>
      </View>

      <View className="w-full  mt-4">
        <Text className="text-black text-[12px] font-semibold">
          Venue Internet
        </Text>
        <View>
          <View className="mt-2 flex flex-row w-full gap-2">
            <View className="flex-1">
              <Text className="text-[#3C3D3E] text-[10px]">
                Internet Availability
              </Text>
              <Pressable
                onPress={() => setShowAvailabilityPicker(true)}
                className="bg-[#F9F9F9] mt-1 h-11 px-3 rounded justify-center"
              >
                <Text className="text-black">
                  {internetAvailability === "yes" ? "Yes" : "No"}
                </Text>
              </Pressable>
              <Modal
                visible={showAvailabilityPicker}
                transparent
                animationType="slide"
              >
                <View className="flex-1 bg-black/50 justify-end">
                  <View className="bg-white w-full">
                    <View className="flex-row justify-end p-2 border-b border-gray-200">
                      <Pressable
                        onPress={() => setShowAvailabilityPicker(false)}
                      >
                        <Text className="text-[#5B4FE9] font-semibold">
                          Done
                        </Text>
                      </Pressable>
                    </View>
                    <Picker
                      selectedValue={internetAvailability}
                      onValueChange={(value) => {
                        setInternetAvailability(value);
                        setShowAvailabilityPicker(false);
                      }}
                    >
                      <Picker.Item label="Yes" value="yes" />
                      <Picker.Item label="No" value="no" />
                    </Picker>
                  </View>
                </View>
              </Modal>
            </View>
            <View className="flex-1">
              <Text className="text-[#3C3D3E] text-[10px]">WiFi</Text>
              <Pressable
                onPress={() => setShowWifiPicker(true)}
                className="bg-[#F9F9F9] mt-1 h-11 px-3 rounded justify-center"
              >
                <Text className="text-black">
                  {wifiType.charAt(0).toUpperCase() + wifiType.slice(1)}
                </Text>
              </Pressable>
              <Modal visible={showWifiPicker} transparent animationType="slide">
                <View className="flex-1 bg-black/50 justify-end">
                  <View className="bg-white w-full">
                    <View className="flex-row justify-end p-2 border-b border-gray-200">
                      <Pressable onPress={() => setShowWifiPicker(false)}>
                        <Text className="text-[#5B4FE9] font-semibold">
                          Done
                        </Text>
                      </Pressable>
                    </View>
                    <Picker
                      selectedValue={wifiType}
                      onValueChange={(value) => {
                        setWifiType(value);
                        setShowWifiPicker(false);
                      }}
                      className="h-11"
                    >
                      <Picker.Item label="Public" value="public" />
                      <Picker.Item label="Private" value="private" />
                      <Picker.Item label="None" value="none" />
                    </Picker>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-[#3C3D3E] text-[10px]">Internet Speed</Text>
            <Pressable
              onPress={() => setShowSpeedPicker(true)}
              className="bg-[#F9F9F9] mt-1 h-11 px-3 rounded justify-center"
            >
              <Text className="text-black">
                {internetSpeed.charAt(0).toUpperCase() + internetSpeed.slice(1)}{" "}
                Speed
              </Text>
            </Pressable>
            <Modal visible={showSpeedPicker} transparent animationType="slide">
              <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-white w-full">
                  <View className="flex-row justify-end p-2 border-b border-gray-200">
                    <Pressable onPress={() => setShowSpeedPicker(false)}>
                      <Text className="text-[#5B4FE9] font-semibold">Done</Text>
                    </Pressable>
                  </View>
                  <Picker
                    selectedValue={internetSpeed}
                    onValueChange={(value) => {
                      setInternetSpeed(value);
                      setShowSpeedPicker(false);
                    }}
                    className="h-11"
                  >
                    <Picker.Item label="High Speed" value="high" />
                    <Picker.Item label="Medium Speed" value="medium" />
                    <Picker.Item label="Low Speed" value="low" />
                    <Picker.Item label="No Internet" value="none" />
                  </Picker>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <Controller
          control={control}
          name="internetProvider"
          render={({ field: { onChange, value } }) => (
            <ReportTextInput
              placeholder="Internet Provider"
              value={value?.toString() || ""}
              onChangeText={onChange}
              boxClassName="flex flex-col w-full mt-3"
              error={errors.internetProvider?.message}
            />
          )}
        />
      </View>

      <View className="w-full  mt-4">
        <Text className="text-black text-[12px] font-semibold">
          Venue Photos
        </Text>
        <View className="mt-2 flex flex-row w-full gap-2">
          <View className={"flex flex-col w-full mt-2"}>
            <Text className="text-[#3C3D3E] text-[10px]">{"Venue Photo"}</Text>
            <View className="flex flex-row items-center gap-2">
              <View className="flex-1 flex-row items-center bg-[#F9F9F9] mt-1 h-11 px-3 rounded">
                <Image
                  source={require("../../assets/images/Report/image.png")}
                  className="w-6 h-6 mr-2"
                />
                <TextInput
                  className="flex-1 text-black"
                  placeholder="Choose file..."
                  value={imageName}
                  editable={false}
                />
                <Pressable
                  className="bg-[#E6E5FC] px-4 py-1 rounded-xl"
                  onPress={pickImage}
                >
                  <Text className="text-[#5B4FE9]">Upload</Text>
                </Pressable>
              </View>
              <Pressable
                className="w-10 h-10 bg-[#E6E5FC] rounded-full items-center justify-center"
                onPress={pickImage}
              >
                <Text className="text-[#5B4FE9] text-xl">+</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="mt-3">
          <Controller
            control={control}
            name="photoDescription"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Photo Description"
                value={value?.toString() || ""}
                boxClassName="flex flex-col w-full mt-3"
                onChangeText={onChange}
                error={errors.photoDescription?.message}
              />
            )}
          />
        </View>
        <View className="mt-3">
          <Controller
            control={control}
            name="remarks"
            render={({ field: { onChange, value } }) => (
              <ReportTextInput
                placeholder="Remarks"
                value={value?.toString() || ""}
                onChangeText={onChange}
                boxClassName="flex flex-col w-full mt-3"
                error={errors.remarks?.message}
              />
            )}
          />
        </View>
      </View>

      <Pressable
        className="w-full flex items-center justify-center bg-[#5B4FE9]  py-4 mt-20 rounded-3xl"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-base">Submit Report</Text>
      </Pressable>
    </View>
  );
};

export default Form;
