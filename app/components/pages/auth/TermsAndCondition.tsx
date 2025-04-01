import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Sublabel} from '../../../components/atoms/SubLabel';
import {colors} from '../../../themev1';
import {moderateScale} from 'react-native-size-matters';
import fontsize from '../../../themev1/fontstyle';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import Button from '@components/atoms/button/Button';
import WebView from 'react-native-webview';

const URL = 'https://website.duedeck.com/termsconditions-1';

const TermsAndCondition: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Terms & Conditions'}
        LabelPropsType={{
          size: 'Medium',
          fontWeight: 'semibold',
          title: 'Terms & Conditions',
          color: colors.GRey800,
          align: {undefined},
        }}
      />
      <WebView source={{uri: URL}} style={{flex: 1}} />
      {/* <View style={styles.container}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.strokeW,
            height: moderateScale(20),
          }}>
          <Sublabel
            size={'large'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Go Back'}
            color={undefined}
            align={undefined}
          />
        </View>
        <View>
          <Button
            label={'Accept'}
            onPress={() => {}}
            containerStyle={{
              marginVertical: moderateScale(10),
              height: moderateScale(40),
              borderRadius: 8,
            }}
            labelStyle={{fontSize: fontsize.medium14}}
          />
        </View> 
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(39),
  },
});

export default TermsAndCondition;
