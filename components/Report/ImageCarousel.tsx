import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Dimensions,
  Pressable,
  PanResponder,
  ImageProps,
} from "react-native";

interface ImageCarouselProps {
  images: string[];
  info?: string[];
  autoplayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplayInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get("window").width;
  const autoplayRef = useRef<NodeJS.Timeout>();

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(handleNext, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: () => {
      stopAutoplay();
    },
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        if (gestureState.dx > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
      startAutoplay();
    },
  });

  return (
    <View className="items-center">
      <Pressable
        onPress={handleNext}
        className="shadow-md shadow-black/25"
        {...panResponder.panHandlers}
      >
        <Image
          source={images[activeIndex] as ImageProps}
          className="h-[250px] rounded-lg"
          style={{ width: windowWidth - 32 }}
          resizeMode="contain"
        />
      </Pressable>

      <View className="flex-row mt-4">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
