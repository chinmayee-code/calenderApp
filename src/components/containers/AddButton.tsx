import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
  } from 'react-native';
  import React, {useRef, useEffect, useState} from 'react';
import { IMAGES } from '~/assets';
  const AddButton = ({opened, toggleOpened}: any) => {
    const animation = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(animation, {
        toValue: opened ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [opened, animation]);
    const opacity = {
      opacity: animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
      }),
    };
    
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <TouchableOpacity>
            <Animated.View
              style={[
                styles.item,
                opacity,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 70],
                      }),
                    },
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -70],
                      }),
                    },
                  ],
                },
              ]}>
              <Image
                style={styles.itemIcon}
                source={IMAGES.ARROWDOWN}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Animated.View
              style={[
                styles.item,
                opacity,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0],
                      }),
                    },
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -130],
                      }),
                    },
                  ],
                },
              ]}>
              <Image
                style={styles.itemIcon}
                source={IMAGES.ARROW}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Animated.View
              style={[
                styles.item,
                opacity,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -70],
                      }),
                    },
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -70],
                      }),
                    },
                  ],
                },
              ]}>
              <Image
                style={styles.itemIcon}
                source={IMAGES.ARROWUP}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={toggleOpened}>
            <Animated.View
              style={[
                styles.addButtonInner,
                {
                  transform: [
                    {
                      rotate: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '90deg'],
                      }),
                    },
                  ],
                },
              ]}>
              <Image
                source={IMAGES.ADD}
                resizeMode="contain"
                style={styles.addButtonIcon}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default AddButton;
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      height: 0,
    },
    box: {
      position: 'relative',
      width: 60,
      height: 60,
      marginTop: -20,
    },
    addButton: {
      shadowColor: '#333333',
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    addButtonInner: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5a35ff',
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    addButtonIcon: {
      width: 30,
      height: 30,
      tintColor: '#FFFFFF',
    },
    item: {
      position: 'absolute',
      top: 5,
      left: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5a35ff',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    itemIcon: {
      width: 32,
      height: 32,
      tintColor: '#FFFFFF',
    },
  });