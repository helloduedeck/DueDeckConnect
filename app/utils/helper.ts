import moment from 'moment';
import {colors} from '../themev1';

export const getServiceBackgroundColor = (serviceTitle: string) => {
  switch (serviceTitle) {
    case 'On Hold':
      return colors.darkred;
    case 'Completed':
      return colors.SemGreen500;
    case 'In Progress':
      return colors.semblue;
    default:
    case 'Creditnote':
      return colors.OnHold;
  }
};

export const getMenuBoarddBackgroundColor = (menuBoard: string) => {
  switch (menuBoard) {
    case 'Taskrequests':
      return 'yellow';
    case 'Servicepurple':
      return colors.Servicepurple;
    case 'DocViolet':
      return colors.DocViolet;
    case 'AppointBrown':
      return colors.AppointBrown;
    case 'NoticeYellow':
      return colors.NotieYellow;
    case 'Rupee':
      return colors.Rupee;
    default:
      return colors.primary;
  }
};

export const getInitials = (fullName: string) => {
  const allNames = fullName?.trim().split(' ');
  const initials = allNames?.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames?.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  console.log('getInitials', initials);
  return initials;
};

export const dateFormat = (date:string) =>{
   return moment(date,"DD/MM/YYYY").format("MMM Do, YYYY")
}
