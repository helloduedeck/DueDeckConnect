import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
/**
 *
 * @returns {isFocused, isFirstTime, focusCount};
 *     How to use it
 *  useEffect(() => {
 *   if (focusCount === 1 && isFocused) {
 *     // this is the first time focus => init screen here
 *  }
 * });
 * useEffect(() => {
 *   if (focusCount > 1 && isFocused) {
 *     console.log('FIRST TIME LOADING ---- ' + focusCount);
 *  // trigger when you navigate back from another screen
 *   // you can background reload data here ...
 *    getDashboardData();
 *  }
 *});
 */

export const useFocus = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const isFirstTime = focusCount === 1;

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setIsFocused(true);
      setFocusCount(prev => prev + 1);
    });
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsFocused(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  });

  return {isFocused, isFirstTime, focusCount};
};
