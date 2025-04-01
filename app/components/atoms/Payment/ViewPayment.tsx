import React from "react";
import { View } from "react-native";

import SubLabel from "../SubLabel/SubLabel";
import { colors } from "../../../themev1";
const ViewPayments =( )=>{
    return (
        <View>
            <SubLabel size={"small"} fontWeight={"semibold"} title={"View Payments"} color={colors.primary} fontStyle={"normal"} align={undefined}></SubLabel>
        </View>
    )
}
export default ViewPayments