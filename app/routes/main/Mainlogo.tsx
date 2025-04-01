import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ViewStyle,
  RegisteredStyle,
  Falsy,
  RecursiveArray,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import { Image } from 'react-native-svg';

const FadeInView = (props: {
    style:
      | boolean
      | RegisteredStyle<ViewStyle>
      | Animated.Value
      | Animated.AnimatedInterpolation
      | Animated.WithAnimatedObject<ViewStyle>
      | Animated.WithAnimatedArray<
          | ViewStyle
          | Falsy
          | RegisteredStyle<ViewStyle>
          | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
          | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[]
        >
      | null
      | undefined;
    children:
      | string
      | number
      | boolean
      | Animated.Value
      | Animated.AnimatedInterpolation
      | Animated.WithAnimatedObject<
          React.ReactElement<any, string | React.JSXElementConstructor<any>>
        >
      | Animated.WithAnimatedObject<React.ReactFragment>
      | Animated.WithAnimatedObject<React.ReactPortal>
      | null
      | undefined;
  }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  
    const navigation = useNavigation();
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        // getData().then((result: any) => {
        //   if (result) {
        //     navigation.navigate('dashboard');
        //   } else {
        //     navigation.navigate('login');
        //   }
        // });
      });
  
      console.log('done');
    }, [fadeAnim]);
  
    return (
      <Animated.View // Special animatable View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };

const Mainlogo = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: true,
    }).start();
  };

//   const fadeOut = () => {
//     // Will change fadeAnim value to 0 in 3 seconds
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start();
//   };

  return (

    
    // <SafeAreaView style={styles.container}>
    //   <Animated.View
    //     style={[
    //       styles.fadingContainer,
    //       {
    //         // Bind opacity to animated value
    //         opacity: fadeAnim,
    //       },
    //     ]}>
    //     <Text style={styles.fadingText}>DueDeck</Text>
    //     {/* <Image
        
    //     /> */}
    //     {/* <Image source={require('../../assets/images')}/> */}
    //   </Animated.View>
      
    //   <View style={styles.buttonRow}>
    //     <Button title="Fade In View" onPress={fadeIn} />
    //     {/* <Button title="Fade Out View" onPress={fadeOut} /> */}
    //     {/* <Image source={require('../../assets/images/LogoWhite@2x.png')} /> */}
    //   </View>
    // </SafeAreaView>

    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(0, 104, 139)', 'rgb(7, 137, 181)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.LinearGradientBackground}>
        <FadeInView style={{backgroundColor: 'white'}}>
          <Image
            source={require('../../images/DueDeck.png')}
            style={[
              styles.WhiteLogo,
              {
                width: width *0.7,
              },
            ]}
          />
        </FadeInView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({

  fadingContainer: {
    padding: 5,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:200
  },
  greeting: {
    fontSize: 50,
    fontWeight: 'bold',
    margin: 16,
  },
  LinearGradientBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  WhiteLogo: {
    height: 60,
    width: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Mainlogo;

// import React, {useEffect} from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
// import RNBootSplash from 'react-native-bootsplash';

// const Mainlogo = () => {
//   useEffect(() => {
//     setTimeout(() => {
//       RNBootSplash.hide({fade: true});
//     }, 3000);
//   }, []);

//   return (
//     <SafeAreaView>
//       <View>
//         <Text>Splash Screen</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Mainlogo;