import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export interface CarouselProps {
  data: CarouselItem[];
  height?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function Carousel({
  data,
  height = 200,
  autoplay = true,
  autoplayInterval = 3000,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  // Lógica de auto-reproducción
  useEffect(() => {
    if (!autoplay || data.length <= 1) return;

    const timer = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, autoplay, data.length, autoplayInterval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    if (index !== activeIndex && index >= 0 && index < data.length) {
      setActiveIndex(index);
    }
  };

  const renderItem = ({ item }: { item: CarouselItem }) => {
    return (
      <View style={[styles.slideContainer, { height }]}>
        <View style={styles.cardContainer}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
            style={styles.gradientOverlay}
          />
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            {item.subtitle && <Text style={styles.subtitleText}>{item.subtitle}</Text>}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      />
      {data.length > 1 && (
        <View style={styles.paginationContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginVertical: 15,
  },
  slideContainer: {
    width: screenWidth,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: '#1b8edb',
  },
});
