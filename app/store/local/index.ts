import AsyncStorage from '@react-native-async-storage/async-storage';

const fetch = async (key: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};

const store = async (key: any, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('erroro is', value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // save error
  }
};

const remove = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  // console.log('Done.')
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

const keys = {
  AUTH: 'AUTH',
  GPANEL_FYEAR: 'GPANEL_FYEAR',
  GPANEL_CONSULTATNT: 'GPANEL_CONSULTATNT',
  GPANEL_BRANCH: 'GPANEL_BRANCH',
  GPANEL_CLIENT: 'GPANEL_CLIENT',
  GPANEL_BILLING_FIRM: 'GPANEL_BILLING_FIRM',
  PAYMENT_FINANCIAL_YEAR: 'PAYMENT_FINANCIAL_YEAR',
};

const local = {
  store,
  fetch,
  remove,
  keys,
  clearAll,
};

export default local;
