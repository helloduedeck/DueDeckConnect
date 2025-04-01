import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MailIcon from './icons/Mail';
import LockIcon from './icons/Lock';
import EyeOffIcon from './icons/EyeOff';
import AppointmentWhiteIcon from './icons/AppointmentWhite';
import TasklistWhiteIcon from './icons/TasklistWhite';
import TasklistIcon from './icons/Tasklist';
import DocumentWhiteIcon from './icons/DocumentWhite';
import NoticeWhiteIcon from './icons/NoticeWhite';
import RupeeWhiteIcon from './icons/RupeeWhite';
import LoaderOutlineIcon from './icons/LoaderOutline';
import StopwatchOutlineIcon from './icons/StopwatchOutline';
import ThumbsupOutlineIcon from './icons/ThumsUpOutline';
import FilterWhite from './icons/FilterWhite';
import ListBadgeIcon from './icons/ListBadge';
import EyeOpenIcon from './icons/OpenEye';
interface Props {
  name: string;
  width?: number;
  height?: number;
  color?: string;
  onPress?: () => void;
  size: any;
}

const icons: {[key: string]: React.FC<Props>} = {
  mail: MailIcon,
  lock: LockIcon,
  eyeoff: EyeOffIcon,
  openeye: EyeOpenIcon,
  'appointment-white': AppointmentWhiteIcon,
  'tasklist-white': TasklistWhiteIcon,
  tasklist: TasklistIcon,
  'document-white': DocumentWhiteIcon,
  'notice-white': NoticeWhiteIcon,
  'rupee-white': RupeeWhiteIcon,
  'loader-outline': LoaderOutlineIcon,
  'stopwatch-outline': StopwatchOutlineIcon,
  'thumpsup-outline': ThumbsupOutlineIcon,
  'filter-white': FilterWhite,
  'list-badge': ListBadgeIcon,
  // Add more icon names and their corresponding components here
};

const IconComponent: React.FC<Props> = ({
  name,
  width = 20,
  height = 20,
  color = '#000000',
  ...props
}) => {
  const IconSvg = icons[name];
  // Check if the icon exists in the icons object
  if (!IconSvg) {
    return null; // Return null if the icon does not exist
  }

  // Render the dynamically selected icon component
  return (
    <TouchableOpacity style={{width, height}} onPress={props?.onPress}>
      <IconSvg
        width={width}
        height={height}
        color={color}
        name={name}
        {...props}
      />
    </TouchableOpacity>
  );
};

export default React.memo(IconComponent);
