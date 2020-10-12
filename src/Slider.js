
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  cond,
  eq,
  set,
  useCode,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";

import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get("window");


const Slider = () => {
    const sliders = useSelector(state => state.sliders)
    const snapPoints = sliders.map((_, i) => i * -width);
    const clock = useClock();
    const offsetX = useValue(0);
    const translateX = useValue(0);
    const {
        gestureHandler,
        state,
        velocity,
        translation,
    } = usePanGestureHandler();
    const to = snapPoint(translateX, velocity.x, snapPoints);
    useCode(
      () => [
        cond(eq(state, State.ACTIVE), [
          set(translateX, add(offsetX, translation.x)),
        ]),
        cond(eq(state, State.END), [
          set(translateX, timing({ clock, from: translateX, to })),
          set(offsetX, translateX),
        ]),
      ],
      []
    );
  
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[styles.pictures, { transform: [{ translateX }], width: width * sliders.length, }]}
          >
            {sliders.map((uri, index) => (
              <View key={index} style={styles.picture}>
                <Image style={styles.image} source={{ uri }} />
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "black",
    },
    pictures: {
      height,
      flexDirection: "row",
    },
    picture: {
      width,
      height,
      overflow: "hidden",
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: undefined,
      height: undefined,
    },
  });

export default Slider;
