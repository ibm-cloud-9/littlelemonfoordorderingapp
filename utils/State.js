import AsyncStorage from '@react-native-async-storage/async-storage';

export const isOnboardingCompleted = async () => {
  const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
    
  console.log("onboarding completed: " + onboardingCompleted);
  return onboardingCompleted === 'true';
};

//export const setUserInfo = async (firstName, lastName, email) => {
export const setUserInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem('firstName', userInfo.firstName);
    await AsyncStorage.setItem('lastName', userInfo.lastName);
    await AsyncStorage.setItem('email', userInfo.email);
    await AsyncStorage.setItem('onboardingCompleted', 'true');

    console.log(`Stored firstName: ${userInfo.firstName}`);
    console.log(`Stored lastName: ${userInfo.lastName}`);
    console.log(`Stored email: ${userInfo.email}`);
    console.log('Onboarding completed status set to true');
  } catch (error) {
    console.error(error);
  }
};

export const getProfileInfo = async () => {
  try {
    const image = await AsyncStorage.getItem('image') || '';
    const firstName = await AsyncStorage.getItem('firstName') || '';
    const lastName = await AsyncStorage.getItem('lastName') || '';
    const email = await AsyncStorage.getItem('email') || '';
    const phoneNumber = await AsyncStorage.getItem('phoneNumber') || '';
    const notifyOrderStatus = await AsyncStorage.getItem('notifyOrderStatus') === 'true';
    const notifyPasswordChanges = await AsyncStorage.getItem('notifyPasswordChanges') === 'true';
    const notifySpecialOffers = await AsyncStorage.getItem('notifySpecialOffers') === 'true';
    const notifyNewsletter = await AsyncStorage.getItem('notifyNewsletter') === 'true';

    console.log(`Retrieved image: ${image}`);
    console.log(`Retrieved firstName: ${firstName}`);
    console.log(`Retrieved lastName: ${lastName}`);
    console.log(`Retrieved email: ${email}`);
    console.log(`Retrieved phoneNumber: ${phoneNumber}`);
    console.log(`Retrieved notifyOrderStatus: ${notifyOrderStatus}`);
    console.log(`Retrieved notifyPasswordChanges: ${notifyPasswordChanges}`);
    console.log(`Retrieved notifySpecialOffers: ${notifySpecialOffers}`);
    console.log(`Retrieved notifyNewsletter: ${notifyNewsletter}`);

    return { image, firstName, lastName, email, phoneNumber, notifyOrderStatus, notifyPasswordChanges, notifySpecialOffers, notifyNewsletter };
  } catch (error) {
    console.error(error);
    return { image: '', firstName: '', lastName: '', email: '', phoneNumber: '', notifyOrderStatus: false, notifyPasswordChanges: false, notifySpecialOffers: false, notifyNewsletter: false };
  }
};

//export const saveProfileChanges = async (image, firstName, lastName, email, phoneNumber, notifyOrderStatus, notifyPasswordChanges, notifySpecialOffers, notifyNewsletter) => {

export const saveProfileChanges = async (profile) => {
  try {
    await AsyncStorage.setItem('image', profile.image);
    await AsyncStorage.setItem('firstName', profile.firstName);
    await AsyncStorage.setItem('lastName', profile.lastName);
    await AsyncStorage.setItem('email', profile.email);
    await AsyncStorage.setItem('phoneNumber', profile.phoneNumber);
    await AsyncStorage.setItem('notifyOrderStatus', profile.notifyOrderStatus ? 'true' : 'false');
    await AsyncStorage.setItem('notifyPasswordChanges', profile.notifyPasswordChanges ? 'true' : 'false');
    await AsyncStorage.setItem('notifySpecialOffers', profile.notifySpecialOffers ? 'true' : 'false');
    await AsyncStorage.setItem('notifyNewsletter', profile.notifyNewsletter ? 'true' : 'false');

    console.log(`Stored image: ${profile.image}`);
    console.log(`Stored firstName: ${profile.firstName}`);
    console.log(`Stored lastName: ${profile.lastName}`);
    console.log(`Stored email: ${profile.email}`);
    console.log(`Stored phoneNumber: ${profile.phoneNumber}`);
    console.log(`Stored notifyOrderStatus: ${profile.notifyOrderStatus}`);
    console.log(`Stored notifyPasswordChanges: ${profile.notifyPasswordChanges}`);
    console.log(`Stored notifySpecialOffers: ${profile.notifySpecialOffers}`);
    console.log(`Stored notifyNewsletter: ${profile.notifyNewsletter}`);
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('image');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('phoneNumber');
    await AsyncStorage.removeItem('notifyOrderStatus');
    await AsyncStorage.removeItem('notifyPasswordChanges');
    await AsyncStorage.removeItem('notifySpecialOffers');
    await AsyncStorage.removeItem('notifyNewsletter');
    await AsyncStorage.removeItem('onboardingCompleted');
    console.log('Logged out');
  } catch (error) {
    console.error(error);
  }
};

