import React, {Children} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ServiceCardPropsType} from '../../../types/components';

const Card = (props: ServiceCardPropsType) => {
  let Cardsizes;
  switch (props.size) {
    case 'small':
      Cardsizes = styles.smallcard;
      break;
    // case "medium":
    //     Cardsizes = styles.mediumcard;
    //   break;
    default:
      Cardsizes = styles.smallcard;
  }

  return (
    <View
      style={[
        Cardsizes,
        {backgroundColor: props.backgroundColor},
        {borderColor: props.bordercolor},
      ]}>
      <View>
        {props.Servicestatus}
        {props.ServiceCount}
      </View>
      <View style={styles.icons}>{props.bottomRightIcon}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  smallcard: {
    // height: moderateScale(60),
    borderRadius: moderateScale(4),
    borderWidth: 1,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(7),
    // width: '100%',
    // backgroundColor: `${colors.Inprogress}33`,
  },
  icons: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  // Define other styles if needed
});
