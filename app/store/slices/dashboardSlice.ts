import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  globalPanel: {
    clients: [],
    branches: [],
    fyears: [],
    selectedYears: [],
    billingFirm: [],
  },
  menuBoard: [],
  serviceBoard: [],
  notificationBoard: [],
  appoinmentSection: [],
  paymentSection: [],
  branchEmployees: [], //used for appointments creation picker
  activeFYears: null,
  activeBranch: null,
  activeClient: null,
  activeBillingFirm: null,
  activeBillingFirmPaymentStatus: null,
  filterStatusChange: false,
  loadNotificationpage:false
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData(state, action) {
      const data = action.payload;
      state.menuBoard = data['menu-board'];
      state.serviceBoard = data['service-board'];
      state.notificationBoard = data['notification-board'];
      state.appoinmentSection = data['appointment-section'];
      state.paymentSection = data['payment-section'];
    },
    setGlobalPanel(state, action) {
      const data = action.payload;
      state.globalPanel.clients = data.clients;
      state.globalPanel.branches = data.branches;
      state.globalPanel.fyears = data.fyears;
      state.globalPanel.selectedYears = data.selectedyears;
      state.globalPanel.billingFirm = data.billingfirms;
    },
    setBranchEmployess(state, action) {
      state.branchEmployees = action.payload;
    },
    setActiveClient(state, action) {
      state.activeClient = action.payload;
    },
    setActiveBranch(state, action) {
      state.activeBranch = action.payload;
    },
    setActiveFYears(state, action) {
      state.activeFYears = action.payload;
    },
    setActiveBillingFirm(state, action) {
      state.activeBillingFirm = action.payload;
    },
    setActiveBillingFirmPaymentStatus(state, action) {
      state.activeBillingFirmPaymentStatus = action.payload;
    },
    setFilterStatus(state, action) {
      state.filterStatusChange = action.payload;
    },
    setLoadNotificationPage(state, action){
      state.loadNotificationpage = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {
  setDashboardData,
  setGlobalPanel,
  setBranchEmployess,
  setActiveClient,
  setActiveBranch,
  setActiveFYears,
  setActiveBillingFirm,
  setActiveBillingFirmPaymentStatus,
  setLoadNotificationPage,
  setFilterStatus,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
