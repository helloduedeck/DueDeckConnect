import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {images} from '@assets';
import {colors} from '@theme';
import fontsize from '@theme/fontstyle';
type IProps = {
  style?: any;
  title:string
};

const FeatureDisableComp: React.FC<IProps> = ({style,title}) => {
  console.log("title",title)
  return (
    <View style={[styles.container, style]}>
      <Image
        source={images.AlertTriangle}
        style={{
          width: moderateScale(56),
          height: moderateScale(56),
        }}
      />
      <Text style={styles.text}>{title}</Text>
      <View style={styles.taskbtn} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: moderateScale(25, 0.25),
  },
  text: {
    marginTop: moderateScale(1),
    color: colors.HexGray,
    fontSize: fontsize.xlarge,
    fontWeight: '600', // You can adjust the color based on your theme
    marginBottom: moderateScale(25, 0.25),
    marginTop:moderateScale(15),
    width:'80%',
    alignContent:'center',
    textAlign:'center'
  },
  taskbtn: {
    marginTop: moderateScale(8, 0.25),
    color: colors.HexGray,
    fontSize: fontsize.large,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: moderateScale(42, 0.25),
    width: moderateScale(210, 0.25),
    borderRadius: moderateScale(32, 0.25),
    backgroundColor: colors.primary,
    marginBottom: moderateScale(5, 0.25),
  },
});

export default FeatureDisableComp;
