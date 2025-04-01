import React from "react";
import { View } from "react-native";

import SubLabel from "../SubLabel/SubLabel";
import { colors } from "../../../themev1";
const FeeDue =( )=>{
    return (
        <View>
            <SubLabel size={"medium"} fontWeight={"semibold"} title={"Fee Due"} color={colors.GRey800} fontStyle={"normal"} align={undefined}></SubLabel>
        </View>
    )
}
export default FeeDue