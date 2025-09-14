import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

export const useImagePreloader = (
  imageModules: any[],
  enabled: boolean = true
) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !imageModules.length) {
      setImagesLoaded(true);
      return;
    }

    const loadImages = async () => {
      try {
        setLoading(true);

        const imageAssets = imageModules.map((module) =>
          Asset.fromModule(module).downloadAsync()
        );

        await Promise.all(imageAssets);
        setImagesLoaded(true);
      } catch (error) {
        console.log("Image preloading error:", error);
        setImagesLoaded(true);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [imageModules, enabled]);

  return { imagesLoaded, loading };
};

export const useSingleImagePreloader = (
  imageModule: any,
  enabled: boolean = true
) => {
  return useImagePreloader([imageModule], enabled);
};
