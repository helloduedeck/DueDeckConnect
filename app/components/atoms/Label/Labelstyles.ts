import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";


export default StyleSheet.create({
    xsmalllabel:{
        fontSize:moderateScale(10), 
    },
smalllabel:{
    fontSize:moderateScale(12),
},
xmedium:{
    fontSize:moderateScale(14) 
},
mediumlabel:{
    fontSize:moderateScale(16),
},
largelabel:{
    fontSize:moderateScale(20),
}
});