import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@routes';
import fontsize from '@theme/fontstyle';
import {colors} from '@theme';
import {images} from '@assets';

type IProps = {
  style?: any;
  navigation: any;
};

const Empty: React.FC<IProps> = ({style}) => {
  const navigation = useNavigation<any>();
  const onCreateTaskPress = () => {
    navigation.push(ROUTES.CREATE_TASK);
    // navigation.push(ROUTES.PUSHNOTIFICATION,event);
  };
  return (
    <View style={[styles.container, style]}>
      <Image
        source={images.NoRecordFile}
        style={{
          width: moderateScale(219, 0.25),
          height: moderateScale(170, 0.25),
        }}
      />
      <Text style={styles.text}>No records found</Text>
      <View style={styles.taskbtn}>
        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => onCreateTaskPress()}>
          + Request New Task
        </Button>
        <Text style={styles.taskbtn}> Or, Contact Your Consultant</Text>
      </View>
    </View>
  );
};

export default Empty;

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
    fontSize: fontsize.large,
    fontWeight: '600', // You can adjust the color based on your theme
    marginBottom: moderateScale(25, 0.25),
  },
  taskbtn: {
    marginTop: moderateScale(8, 0.25),
    color: colors.HexGray,
    fontSize: fontsize.medium,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: moderateScale(38, 0.25),
    width: moderateScale(180, 0.25),
    borderRadius: moderateScale(32, 0.25),
    backgroundColor: colors.primary,
    marginBottom: moderateScale(5, 0.25),
  },
});
