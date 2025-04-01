import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";


export default StyleSheet.create({
    extrasmalllabel:{
        fontSize:moderateScale(8),
        lineHeight:moderateScale(20)
    },
    smallsublabel:{
        fontSize:moderateScale(10),
        lineHeight:moderateScale(20)
    },
    mediumsublabel:{
        fontSize:moderateScale(12),
        lineHeight:moderateScale(20)
    },
    largesublabel:{
        fontSize:moderateScale(16), 
        lineHeight:moderateScale(20)
    }
});