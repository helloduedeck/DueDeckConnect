import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Card from '../organisms/Dashboard/Card';
import {colors} from '@theme';
import Icon from '@components/atoms/Icon';
import {Sublabel} from '@components/atoms/Labels';
import IconComponent from '../../Icon/IconComponent';

export interface ServiceCardPropsType {
  serviceName: string;
  serviceCount: string;
  backgroundColor: string;
  boderColor: string;
  rightIcon: string;
  onCardPress: () => void;
}

const ServiceCard: React.FC<ServiceCardPropsType> = ({
  serviceName,
  serviceCount,
  backgroundColor,
  boderColor,
  rightIcon,
  onCardPress,
}) => {
  return (
    <TouchableOpacity onPress={onCardPress}>
      <Card
        key={serviceName}
        size={''}
        backgroundColor={`${backgroundColor}15`}
        bordercolor={`${backgroundColor}30`}
        Servicestatus={
          <Sublabel
            size={'exsmall'}
            fontWeight={'semibold'}
            title={serviceName}
            color={colors.GRey800}
            fontStyle={'normal'}
          />
        }
        ServiceCount={
          <Sublabel
            size={'large'}
            fontWeight={'semibold'}
            title={serviceCount}
            color={backgroundColor}
            fontStyle={'normal'}
            align={undefined}
          />
        }
        bottomRightIcon={<IconComponent name={rightIcon} size={24} />}
      />
    </TouchableOpacity>
  );
};
export default ServiceCard;
