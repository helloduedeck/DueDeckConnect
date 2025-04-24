import React, {useEffect, useState} from 'react';
import DashBoardContainer from '@components/templates/DashboardContainer';
import {useDashboardMutation, useSubHeaderMutation} from '@api/dashboard.api';
import {useAppDispatch, useAppSelector} from '@hooks/redux_hooks';
import {
  setBranchEmployess,
  setDashboardData,
  setGlobalPanel,
} from '@store/slices/dashboardSlice';
import local from '@store/local';
import {store} from '@store/store';
import {
  setActiveBranch,
  setActiveClient,
  setActiveFYears,
  setActiveBillingFirm,
} from '@store/slices/dashboardSlice';
import {useFocus} from '@utils/useFocus';
import {useBranchEmployeesMutation} from '@api/appointments';
import { setProfilePictures } from '@store/slices/userSlice';

const DashBoard = () => {
  const {focusCount, isFocused} = useFocus();

  const filterStatusChange = useAppSelector(
    state => state?.dashboard?.filterStatusChange,
  );

  const dashboardState = useAppSelector(state => state?.dashboard);

  const user = useAppSelector(state => state.user?.user);

  const [dashboard] = useDashboardMutation();
  const [subHeader] = useSubHeaderMutation();
  const [getBranchesEmployee] = useBranchEmployeesMutation();

  const userToken = useAppSelector(state => state?.user.user);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (focusCount > 1 && isFocused) {
      // trigger when you navigate back from another screen
      // you can background reload data here ...
      getDashboardData();
    }
  }, [isFocused]);

  const loadFilterDataFromRedux = async () => {
    await local
      .fetch(local.keys.GPANEL_CONSULTATNT)
      .then(reqData => {
        if (reqData) {
          store.dispatch(setActiveBranch(reqData));
        }
      })
      .finally(() => {});

    await local
      .fetch(local.keys.GPANEL_CLIENT)
      .then(reqData => {
        if (reqData) {
          store.dispatch(setActiveClient(reqData));
        }
      })
      .finally(() => {});
    await local
      .fetch(local.keys.GPANEL_FYEAR)
      .then(reqData => {
        if (reqData) {
          store.dispatch(setActiveFYears(reqData));
        }
      })
      .finally(() => {});

    await local
      .fetch(local.keys.GPANEL_BILLING_FIRM)
      .then(reqData => {
        if (reqData) {
          store.dispatch(setActiveBillingFirm(reqData));
        }
      })
      .finally(() => {});
  };

  const fetchDataAfterDashboardRefresh = async () => {
    await getDashboardData();
    await getBrancheEmployees();
  };

  useEffect(() => {
    if (userToken?.token) {
      fetchDataAfterDashboardRefresh();
    }
    console.log('filterStatusChange', filterStatusChange);
  }, [userToken?.token, filterStatusChange]);

  useEffect(() => {
    async function fetchData() {
      if (userToken?.token) {
        await getFilterData();
        await loadFilterDataFromRedux();
        await getBrancheEmployees();
      }
    }
    fetchData();
  }, []);

  const getFilterData = async () => {
    await subHeader({})
      .unwrap()
      .then((data: {data: any}) => {
        dispatch(setGlobalPanel(data?.data));
      })
      .finally(() => {})
      .catch(e => {
        console.log('ERROR WHILE subHeader', e);
      });
  };

  const getDashboardData = async () => {
    setIsLoading(true);
    await dashboard({})
      .unwrap()
      .then(data => {
        dispatch(setDashboardData(data?.data));
        dispatch(setProfilePictures(data?.data.user.profile_photo_path));
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        console.log('ERROR WHILE getDashboardData ', e);
      });
  };

  const getBrancheEmployees = async () => {
    await getBranchesEmployee({
      client_id: dashboardState?.activeClient?.id,
      branch_id: dashboardState?.activeBranch?.id,
      emp_id: user?.data?.emp_id,
      package_status: 1,
    })
      .unwrap()
      .then(data => {
        if (data?.success) {
          dispatch(setBranchEmployess(data?.data));
        } else {
          dispatch(setBranchEmployess([]));
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        console.log('ERROR PENDING LIST getBranchesEmployee', e);
      });
  };

  return (
    <DashBoardContainer
      isDataLoading={isLoading}
      onAppointmentAddedOrCancelled={function (): void {
        getDashboardData();
      }}
      onRefresh={() => {
        getDashboardData();
      }}
    />
  );
};
export default DashBoard;
