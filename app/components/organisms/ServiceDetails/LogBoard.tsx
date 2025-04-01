import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../themev1';
import {ScaledSheet} from 'react-native-size-matters';
import LogsUpdates from '@components/molecules/Logs/LogsUpdates';
import LogContent from '@components/molecules/Logs/LogContent';

type IProps = {
  details: {};
};
const LogBoard = ({details}: IProps) => {
  const {data} = details;
  console.log("&&&&&", JSON.stringify(data));
  return (
    <View>
      {data.map(item1 => {
          return (
            <>
                 {item1.details.length > 0 && (
            <View style={{margin: 24, backgroundColor: colors.white, padding: 10}}>
              {item1.details.map(item => {
                return (
                  <View style={styles.logupdate}>
                    <LogsUpdates iconname={item.icon} sublabel={item.title} />
                  </View>
                );
              })}
         
                <View style={styles.logupdate}>
                <LogContent details={item1} />
              </View>
             
              
            </View>
             )}
            </>
       );
      })}
    </View>
  );
};
const styles = ScaledSheet.create({
  logupdate: {
    marginStart: 23,
    marginVertical: 6,
  },
});
export default React.memo(LogBoard);
