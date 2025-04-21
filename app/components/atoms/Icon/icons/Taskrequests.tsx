import colors from "@themev1/colors";
import React, { FC } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
interface SVGIconProps {
    width?: number;
    height?: number;
  }
const Taskrequests : FC<SVGIconProps> = ({width = 24, height = 24}) =>{
  
    return (
        <View style={{width, height}}>
         <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.25 8.125H7.25V5.875H22.25V8.125Z"
            fill="#9CA2AA"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.25 13.375H7.25V11.125H22.25V13.375Z"
            fill="#9CA2AA"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.25 18.625H7.25V16.375H22.25V18.625Z"
            fill="#9CA2AA"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.75 6.25C2.75 5.83579 3.08579 5.5 3.5 5.5H5C5.41421 5.5 5.75 5.83579 5.75 6.25V7.75C5.75 8.16421 5.41421 8.5 5 8.5H3.5C3.08579 8.5 2.75 8.16421 2.75 7.75V6.25Z"
            fill="#9CA2AA"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.75 11.5C2.75 11.0858 3.08579 10.75 3.5 10.75H5C5.41421 10.75 5.75 11.0858 5.75 11.5V13C5.75 13.4142 5.41421 13.75 5 13.75H3.5C3.08579 13.75 2.75 13.4142 2.75 13V11.5Z"
            fill="#9CA2AA"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.75 16.75C2.75 16.3358 3.08579 16 3.5 16H5C5.41421 16 5.75 16.3358 5.75 16.75V18.25C5.75 18.6642 5.41421 19 5 19H3.5C3.08579 19 2.75 18.6642 2.75 18.25V16.75Z"
            fill="#9CA2AA"
          />
        </Svg>
        </View>
      );
      
      
     

}
export default Taskrequests