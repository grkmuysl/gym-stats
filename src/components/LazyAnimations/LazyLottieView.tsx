// components/LazyLottieView.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import { getAnimation, AnimationKey } from "../../utils/AnimationsLoader";
import { AppColors } from "../../styles/colors";

interface LazyLottieViewProps {
  animationKey: AnimationKey;
  style?: any;
  autoPlay?: boolean;
  loop?: boolean;
  onAnimationFinish?: () => void;
  speed?: number;
  progress?: number;
}

const LazyLottieView: React.FC<LazyLottieViewProps> = ({
  animationKey,
  style,
  autoPlay = false,
  loop = false,
  onAnimationFinish,
  speed = 1,
  progress,
  ...props
}) => {
  const [animationSource, setAnimationSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isVisible && !animationSource) {
      loadAnimation();
    }
  }, [isVisible, animationKey]);

  const loadAnimation = async () => {
    try {
      setIsLoading(true);
      const source = await getAnimation(animationKey);

      if (source) {
        setAnimationSource(source);
      }
    } catch (error) {
      console.warn(`Animation ${animationKey} yüklenirken hata:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayout = () => {
    setIsVisible(true);
  };

  // Loading placeholder
  if (isLoading || !animationSource) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: "rgba(255,255,255,0.05)",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onLayout={handleLayout}
      >
        {isLoading && (
          <ActivityIndicator size="small" color={AppColors.limeGreenColor} />
        )}
      </View>
    );
  }

  return (
    <LottieView
      ref={animationRef}
      style={style}
      source={animationSource}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      progress={progress}
      onAnimationFinish={onAnimationFinish}
      hardwareAccelerationAndroid={true}
      renderMode="HARDWARE"
      cacheComposition={true}
      {...props}
    />
  );
};

export default LazyLottieView;
