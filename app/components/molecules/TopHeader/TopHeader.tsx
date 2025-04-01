import React from "react";
import { Text, View } from "react-native";

import { colors } from "../../../themev1";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { AppointmentDatePropsType } from "../../../types/components";
import { Logo } from "../../atoms/Logo";
import { Label } from "../../atoms/Label";
import { TouchableOpacity } from "react-native-gesture-handler";

const TopHeader = ({LabelPropsType}:any) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity>
        <MaterialCommunityIcons
                name={'arrow-left'}
                color={colors.GRey800}
                size={20}
                
            />
        </TouchableOpacity>
           <View style={styles.head}>
           <Label {...LabelPropsType}></Label>
           {/* <Label size={"small"} fontWeight={"bold"} title={""} color={undefined}/> */}
        
           </View>
         
        </View>
    );
}

export default TopHeader;

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
       
      
    },
    head:{
        flex:1,
        alignItems: 'center',
    }
});
