import React from "react";
import { View } from "react-native";
import { Sublabel } from "../Labels";
import { colors } from "@theme";
const AllAppointMent=()=>{
    return (
        <View>
            <Sublabel size={"small"} fontWeight={"semibold"} title={"View All"} color={colors.primary} fontStyle={"normal"} align={undefined}/>
        </View>
    )
}
export default AllAppointMent