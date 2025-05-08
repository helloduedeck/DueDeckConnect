import {ReactNode} from 'react';
import {ViewStyle, StyleProp, TextInputProps} from 'react-native';

// Layout
export interface LayoutPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// MenuItem
export interface MenuItemPropsType {
  label: string;
  rightItem?: ReactNode;
  onPress: () => void;
}

// Card
export interface CardPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Input
export interface InputPropsType extends TextInputProps {
  testID?: string;
  style?: ViewStyle;
  error?: string;
}

// Layout
export interface ButtonComponentPropsType {
  disabled: boolean;
  onPress: () => void;
  title: string;
  variant: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  isLoading: boolean;
  isOutlined: boolean;
  leftIcon: string;
}

// MenuItem
export interface MenuItemPropsType {
  label: string;
  rightItem?: ReactNode;
  onPress: () => void;
}

// Card
export interface CardPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Input
export interface InputPropsType extends TextInputProps {
  testID?: string;
  style?: ViewStyle;
  error?: string;
}
export interface LogoPropsType {
  style: any;
  disabled?: boolean;
  onPress?: () => void;
  size: SizeEnum; // Define the size prop as small, medium, or large
  color?: string;
  theme?: any;
}

type SizeEnum = 'exsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xmedium';

export interface ImagePropsType {
  //  source:any;
  height: number;
  width: number;
  color: number;
}
export interface CirclePropsType {
  size: string;
  background: any;
  iconName: string;
  children?: any;
  iconColor: any;
}
export interface TaskrequestCirclePropsType {
  size: string;
  background: any;
  iconName: string;
  children?: any;
  iconColor: any;
}

export interface LabelPropsType {
  size: SizeEnum;
  fontWeight: 'bold' | 'semibold' | 'normal';
  title: string;
  color: any;
  align?: any;
  style?: any;
}

export interface SubLabelPropsType {
  size: SizeEnum;
  fontWeight: 'bold' | 'semibold' | 'normal' | 'medbold';
  fontStyle: 'italic' | 'normal';
  title: string;
  color: any;
  align?: any;
  maxLength?: number;
}

export interface CheckBoxPropsType {
  size: 'small' | 'medium';
  fontWeight: 'bold' | 'semibold' | 'normal';
  title: string;
  color: any;
  isSelected: boolean;
  onPress: () => void;
}

export interface NavLinkPropsType {
  size: 'small' | 'medium';
  fontWeight: 'bold' | 'semibold' | 'normal';
  title: string;
  color: any;
  onPress: () => void;
}

export interface CircleImagePropsType {
  size: 'small' | 'medium';
  IsOutlined: boolean;
  title: string;
  color: any;
  onPress: () => void;
  style?: any;
  align?: any;
  backgroundColor: any;
  source: string;
}

export interface BadgePropsType {
  size: string;
  background: any;
  iconname: any;
  children?: any;
}

export interface FabPropsType {
  size: SizeEnum;
  background: string;
  iconName: string;
  showAppointmentSheet?: boolean;
  showServiceSheet?: boolean;
  onSheetClose?: () => void;
  onRefresh?: () => void;
  onTaskRequestCreated?: () => void;
}

export interface ServiceCardPropsType {
  size: string;
  backgroundColor: any;
  bordercolor: any;
  children?: any;
  Servicestatus: any;
  ServiceCount: any;
  bottomRightIcon: any;
}

export interface bottomRightIconPropsType {
  iconname: any;
}

export interface AppointmentStatusPropsType {
  status: any;
  message?:any
}

export interface AppointedEmployeePropsType {
  color: any;
  size: 'exsmall' | 'small' | 'medium' | 'large';
  fontWeight: 'bold' | 'semibold' | 'normal';
  title: any;
}

export interface MenuBoardItemProps {
  size: SizeEnum;
  fontWeight: 'bold' | 'semibold' | 'normal';
  fontStyle: 'italic' | 'normal';
  title: string;
  iconName: string;
  color: any;
  align: any;
  onPress: () => void;
  backgroundColor: string;
}

export interface DocumentAlertPropsType {
  color: any;
  size: 'xxsmall' | 'exsmall' | 'small' | 'medium' | 'large';
  fontWeight: 'bold' | 'semibold' | 'normal';
  fontStyle: 'italic' | 'normal';
  title: any;
  align?: any;
}

export interface DocumentStatusPropsType {
  color: any;
  size: 'xxsmall' | 'exsmall' | 'small' | 'medium' | 'large';
  fontWeight: 'bold' | 'semibold' | 'normal';
  fontStyle: 'italic' | 'normal';
  title: any;
  align?: any;
}

export interface AppointmentContentPropType {
  color: any;
  size: 'exsmall' | 'small' | 'medium' | 'large';
  fontWeight: 'bold' | 'semibold' | 'normal';
  title: any;
  align?: any;
}

export interface AppointedConsultantPropsType {
  color: any;
  size: 'exsmall' | 'small' | 'medium' | 'large';
  fontWeight: 'bold' | 'semibold' | 'normal';
  title: any;
  align?: any;
}

export interface AppointmentDatePropsType {
  color: any;
  size: 'xxsmall' | 'exsmall' | 'small' | 'medium' | 'large';
  fontWeight: 'bold' | 'semibold' | 'normal';
  fontStyle: 'italic' | 'normal';
  title: any;
  align?: any;
  isdashboard?: any;
  iconsize?: any;
}

export interface DashboardHeaderPropsType {
  userName: string;
  profilePic: string;
  clientName?: string;
  consultantName: string;
  onGlobalPanelPress: () => void;
  onProfileIconPress: () => void;
}

export interface CircleBadgePropsType {
  clientName?: string;
  userName: string;
  profilePic: string;
  onProfileIconPress: () => void;
}

export interface GlobalFilterPropsType {
  clientName: string;
  consultantName: string;
  onGlobalPanelPress: () => void;
}

export interface IMenuBoardItems {
  icon: string;
  background: string;
  size: SizeEnum;
  status: string;
  title: string;
}

export interface IAppointmentMenuProps {
  onResheduleAppointment: () => void;
  onCancelAppointment: () => void;
  onAppointmentAccepted: () => void;
  canReject: boolean;
  canAccept: boolean;
}

export interface IResheduleAppointment {
  AppointmentContent?: Object;
  id?: number | string;
  employeeId?: number | string;
  onRefresh: () => void;
  onClose: () => void;
  showActionSheet: boolean;
}
