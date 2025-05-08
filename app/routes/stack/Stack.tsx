import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../routes';
import SendOTP from '@components/pages/unauth/SendOTP';
import VerifyOTP from '@components/pages/unauth/VerifyOTP';
import ResetPassword from '@components/pages/unauth/ResetPassword';
import BottomTabContainer from '@routes/bottom/Bottom';
import Login from '@components/pages/unauth/Login';
import Notice from '@components/pages/auth/Notice';
import ProfilePage from '@components/pages/auth/ProfilePage';
import SeviceDetails from '../../components/pages/auth/ServiceDetails';
import NoticeDetails from '../../components/pages/auth/NoticeDetails';
import Documents from '@components/pages/auth/Documents';
import PaymentDocView from '@components/organisms/Payment/DocView';
import DocpdfView from '@components/organisms/Payment/DocpdfView';
import Logs from '@components/pages/auth/Logs';
import DocumentUploadPanel from '@components/pages/auth/DocumentUploadPanel';
import LedgerView from '@components/pages/auth/LedgerView';
import DocPdfView from '@components/pages/auth/DocPdfView';
import TermsAndCondition from '@components/pages/auth/TermsAndCondition';
import PrivacyPolicy from '@components/pages/auth/PrivacyPolicy';
import Comments from '@components/templates/Details/Comments';
import Payments from '@components/pages/auth/Payments';
import Appointment from '@components/pages/auth/Appointment';
import TaskRequests from '../../components/pages/auth/TaskRequests';
import GlobalFilterModal from '../../components/organisms/Dashboard/GlobalFilter/GlobalFilterModal';

const UnAuthorizedStack = createStackNavigator();

const UnAuthorizedContainer = () => {
  return (
    <UnAuthorizedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <UnAuthorizedStack.Screen name={ROUTES.LOGIN} component={Login} />
      <UnAuthorizedStack.Screen name={ROUTES.SENDOTP} component={SendOTP} />
      <UnAuthorizedStack.Screen name={ROUTES.VERIFYOTP} component={VerifyOTP} />
      <UnAuthorizedStack.Screen
        name={ROUTES.RESETPASSWORD}
        component={ResetPassword}
      />
    </UnAuthorizedStack.Navigator>
  );
};

const AuthorizedStack = createStackNavigator();

const AuthorizedContainer = () => {
  return (
    <AuthorizedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthorizedStack.Screen
        name={ROUTES.BOTTOM_TAB}
        component={BottomTabContainer}
      />
      <AuthorizedStack.Screen name={ROUTES.NOTICE} component={Notice} />

      <AuthorizedStack.Screen name={ROUTES.PROFILE} component={ProfilePage} />

      <AuthorizedStack.Screen
        name={ROUTES.SERVICEDETAILS}
        component={SeviceDetails}
      />
      <AuthorizedStack.Screen
        name={ROUTES.NOTICEDETAILS}
        component={NoticeDetails}
      />
         <AuthorizedStack.Screen
        name={ROUTES.GLOBALFILTER}
        component={GlobalFilterModal}
      />
      <AuthorizedStack.Screen
        name={ROUTES.PAYMENTDOC}
        component={PaymentDocView}
      />
      <AuthorizedStack.Screen name={ROUTES.DOCPDFVIEW} component={DocpdfView} />
      <AuthorizedStack.Screen name={ROUTES.DOCUMENT} component={Documents} />
      <AuthorizedStack.Screen name={ROUTES.TASKREQUESTS} component={TaskRequests} />


      <AuthorizedStack.Screen
        name={ROUTES.DOCUMENTUPLOADPANEL}
        component={DocumentUploadPanel}
      />

      <AuthorizedStack.Screen name={ROUTES.LOGS} component={Logs} />

      <AuthorizedStack.Screen
        name={ROUTES.LEDGEERVIEW}
        component={LedgerView}
      />

      <AuthorizedStack.Screen
        name={ROUTES.TERMSANDCONDITIONS}
        component={TermsAndCondition}
      />

      <AuthorizedStack.Screen
        name={ROUTES.PRIVACYPOLICY}
        component={PrivacyPolicy}
      />

      <AuthorizedStack.Screen name={ROUTES.COMMENTS} component={Comments} />

      <AuthorizedStack.Screen name={ROUTES.PAYMENTS} component={Payments} />

      <AuthorizedStack.Screen
        name={ROUTES.CHANGEPASSWORD}
        component={ResetPassword}
      />
      <AuthorizedStack.Screen
        name={ROUTES.APPOINTMENT}
        component={Appointment}
      />

      <AuthorizedStack.Screen
        name={ROUTES.RESETPASSWORD}
        component={ResetPassword}
      />

      {/* <AuthorizedStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <AuthorizedStack.Screen
        name={ROUTES.CHANGEPASSWORD}
        component={ChangePassword}
      /> */}
      {/* <AuthorizedStack.Screen
        name={ROUTES.TERMSANDCONDITIONS}
        component={TermsAndConditions}
      />
      <AuthorizedStack.Screen
        name={ROUTES.PRIVACYPOLICY}
        component={PrivacyPolicy}
      />
      <AuthorizedStack.Screen name={ROUTES.DOCUMENT} component={Documents} />
      <AuthorizedStack.Screen
        name={ROUTES.APPOINTMENT}
        component={Appoinment}
      />

      <AuthorizedStack.Screen name={ROUTES.PREMIUM} component={Premium} />
      <AuthorizedStack.Screen name={ROUTES.REPORTS} component={Report} />
      <AuthorizedStack.Screen
        name={ROUTES.PAYMENTDOC}
        component={PaymentDocView}
      />
      <AuthorizedStack.Screen
        name={ROUTES.DOCPDFVIEW}
        component={DocpdfView}
      />

      <AuthorizedStack.Screen
        name={ROUTES.TASKCUSTOMM}
        component={Taskcustomm}
      />

      <AuthorizedStack.Screen
        options={{ cardStyleInterpolator: forFade }}
        name={ROUTES.PAYMENTDETAILS}
        component={PaymentDetails}
      />
      <AuthorizedStack.Screen
        name={ROUTES.CREATEUPDATEAPPOINTMENT}
        component={CreateAppointment}
      />
      <AuthorizedStack.Screen
        name={ROUTES.DOCUMENTDETAILS}
        component={DocumentsDetails}
      />
      <AuthorizedStack.Screen
        name={ROUTES.TASKDETAILS}
        component={TaskDetails}
      />

      <AuthorizedStack.Screen name={ROUTES.TASKLOGS} component={TaskLogs} />
      <AuthorizedStack.Screen name={ROUTES.DOCVIEWER} component={DocView} />
      <AuthorizedStack.Screen
        name={ROUTES.MAKEPAYMENT}
        component={MakePayment}
      />
      <AuthorizedStack.Screen
        name={ROUTES.NOTICEDETAILS}
        component={NoticeDetails}
      />

      <AuthorizedStack.Screen
        name={ROUTES.TOGGLENOTIFICATION}
        component={NotificationButton}
      /> */}
    </AuthorizedStack.Navigator>
  );
};

const forFade = ({current}: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const config: any = {
  animation: 'mass',
  config: {},
};
export {UnAuthorizedContainer, AuthorizedContainer};
