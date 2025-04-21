import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { TaskrequestCirclePropsType } from '../../../types/components';
import Labelstyles from './Circlestyles';
import IconComponent from '../../../Icon/IconComponent';
import { moderateScale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../themev1';
import { Sublabel } from '../SubLabel';
import fontsize from '../../../themev1/fontstyle';

const TaskrequestCircle: React.FC<TaskrequestCirclePropsType> = ({
    size,
    iconName,
    background,
    iconColor,
    children,
    ...rest
}) => {
    let circlesize;
    switch (size) {
        case 'exsmall':
            circlesize = moderateScale(30);
            break;
        case 'small':
            circlesize = moderateScale(40);
            break;
        case 'medium':
            circlesize = moderateScale(100);
            break;
        default:
            circlesize = moderateScale(150);
    }
    const circleStyle: ViewStyle = {
        width: 43,
        height: 43,
        borderRadius: 150 / 2,
        backgroundColor: colors.taskrequestbg,
        justifyContent: 'center',
        alignItems: 'center',
    };

    // return <View {...rest} style={circleStyle}>{children}</View>;
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={circleStyle} {...rest}>
                <MaterialCommunityIcons
                    name="arrow-up"
                    color={colors.white}
                    size={24}
                />
            </View>
            {/* <Sublabel size={'small'} fontWeight={'bold'} fontStyle={'normal'} title={'TaskRequest'} color={colors.Grey600}/> */}
            <Text style={{ fontSize: fontsize.medium, color: colors.Grey600, paddingHorizontal: moderateScale(12), marginTop: moderateScale(9),fontWeight:'600' }}>Requests</Text>
        </View>
    );
};

export default TaskrequestCircle;
