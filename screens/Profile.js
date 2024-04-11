import React, {useState, useEffect, useContext} from 'react';
import {Image,   KeyboardAvoidingView,
  Platform,Text, StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import { ProgressBar, MD2Colors , TextInput} from "react-native-paper";
import {getProfileInfo, saveProfileChanges,logout} from  '../utils/State';
import * as ImagePicker from 'expo-image-picker';
import CheckBox from 'expo-checkbox';
import { AuthContext } from "../AuthContext";

import { MaskedTextInput } from "react-native-mask-text";
// https://github.com/Mr2s/Little-Lemon-Food-Ordering-App/blob/main/screens/Profile.js

function allSpaces(s) {
  // Remove leading and trailing spaces
    s = s.trim();
  // Check if the resulting string is empty (i.e., contains only spaces)
  return s.length === 0;
}

function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[\w+.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}


const removeImage = () => {
  setProfile((prevState) => ({
    ...prevState,
    ['image']: "",
  }))
};

const isValidProfile = (data) => {

  if (data.firstName.length == 0 || data.lastName.length == 0 || data.email.length == 0) {
    return false;
  } else {
    return true;
  }
}

function Profile() {

  const [isSelected, setIsSelected] = useState(true);
  const [status, setStatus] = useState(0) ;
  const [progressColor , setProgessColor] = useState("#495E57")
  const [avatarImage, setAvatarImage] = useState(null);


  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  });

  let profileCopy = {};

/*   const { updateProfile } = useContext(AuthContext);
  const { removeProfile } = useContext(AuthContext);
  const { discardChanges} = useContext(AuthContext);
  const { logout } = useContext(AuthContext); */


  const [discard, setDiscard] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        //await logout();
        //await AsyncStorage.clear();
        const getProfile = await getProfileInfo();

        if (isValidProfile(getProfile)) {
          setProfile(getProfile)
          setAvatarImage(profile.image)

          setDiscard(false)
          //console.log('Original:', profile)
          profileCopy = JSON.parse(JSON.stringify(profile));
          //console.log('Copy of Original:', profileCopy)
        }/*  else {
          console.log('Profile is not valid')
          updateScreenProfile("firstName","")
          updateScreenProfile("lastName","")
          updateScreenProfile("email","")
          updateScreenProfile("phoneNumber","")
          profileCopy = JSON.parse(JSON.stringify(profile));
          console.log('Copy of Original:', profileCopy)          
        }
 */
      } catch (e) {
        console.error(e);
      }
    })();
}, [discard]);

const profileUpdate = async () => {

  try {
    await saveProfileChanges(profile);
    profileCopy = JSON.parse(JSON.stringify(profile));
  } catch (err) {
    console.error(err)
  }
}

const reloadProfile = () => {
    setProfile(profileCopy)
    setAvatarImage(profile.image)
}

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setAvatarImage(result.assets[0].uri);
  }
};

const removeImage = () => {
    setAvatarImage(null);
}

const updateScreenProfile = (key, value) => {

  statusValue = 0;

  if (key != "total") {
    setProfile((profile) => ({
      ...profile,
      [key]: value,
    }))
  }

}

const validateNumber = (number) => {
  if (isNaN(number)) {
    return false;
  } else if (number.length == 10) {
    return true;
  }
}

    return (
      <>
	<KeyboardAvoidingView
	style={styles.container}
	behavior={Platform.OS === "ios" ? "padding" : "height"}
	>       
    <View
      style={{
        flex: .10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,

      }}>
      <Image source={require('../assets/Logo.png')}
        style={{marginTop: 10}} />
    </View>
  
	<View >
	   <View>
	      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 5}}>Personal information</Text>
	   </View>
	   <View style={{flexDirection:"row",justifyContent:'space-between',padding:5}}>
        {avatarImage ? <Image source={{ uri: profile.image }} style={styles.avatarImage}/> : <View><Text style={styles.avatarText}>{profile.firstName[0]+profile.lastName[0]}</Text></View>}
            <TouchableOpacity style={styles.changeButton}
            onPress={() => pickImage()}>
            <Text style={styles.changeButtonText}> 
                Change 
            </Text>
	      </TouchableOpacity>
	      <TouchableOpacity style={styles.removeButton}
          onPress={() => removeImage()}>
          <Text style={styles.removeButtonText}> 
              Remove 
          </Text>
	      </TouchableOpacity>
	   </View>
	</View >

	<ScrollView>
	   <View style={{alignItems: 'flex-start', marginTop: 10}}>
	   <Text style={{}}>First name</Text>
	   <TextInput style={{ height: 40, width: "100%", borderRadius: 8, borderColor: '#ccc', borderWidth: 1,  marginBottom: 20 }}
	   value={profile.firstName}
     keyboardType="default"
	   onChangeText={(newValue) => updateScreenProfile("firstName", newValue)}
	   />
	   <Text style={{}}>Last name</Text>
	   <TextInput style={{ height: 40, width: "100%", borderRadius: 8, borderColor: '#ccc', borderWidth: 1,  marginBottom: 20 }}
          	  value={profile.lastName}
              keyboardType="default"
              onChangeText={(newValue) => updateScreenProfile("lastName", newValue)}
     />
	   <Text style={{}}>Email</Text>
	   <TextInput style={{ height: 40, width: "100%", borderRadius: 8, borderColor: '#ccc', borderWidth: 1,  marginBottom: 20 }} 
              value={profile.email}
              keyboardType="email-address"
              onChangeText={(newValue) => updateScreenProfile("email", newValue)}

     />
	   <Text style={{}}>Phone number</Text>
{/* 	   <TextInput
	   style={{height: 40, width: "100%", borderRadius: 8, borderColor: '#ccc', borderWidth: 1,  marginBottom: 20 }}
	   value={profile.phoneNumber}
	   keyboardType="phone-pad"
	   onChangeText={(newValue) => updateScreenProfile("phoneNumber", newValue)}

	   /> */}
    <MaskedTextInput
      mask="(999) 999-9999"
      value={profile.phoneNumber}
      onChangeText={(newValue) => updateScreenProfile("phoneNumber", newValue)}
      style={{height: 40, width: "100%", backgroundColor: '#E8E4EC', borderRadius: 8, borderColor: '#ccc', borderWidth: 1,  marginBottom: 20 }}
    />

	   </View>
	   <View>
	      <View>
		 <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Email notifications</Text>
	      </View>
	      <View style={styles.checkboxWrapper}>
		 <CheckBox value={isSelected}/>
		 <Text style={{marginLeft: 8}}>Order statuses</Text>
	      </View>
	      <View style={styles.checkboxWrapper}>
		 <CheckBox value={isSelected}/>
		 <Text style={{marginLeft: 8}}>Password changes</Text>
	      </View>
	      <View style={styles.checkboxWrapper}>
		 <CheckBox value={isSelected}/>
		 <Text style={{marginLeft: 8}}>Special offers</Text>
	      </View>
	      <View style={styles.checkboxWrapper}>
		 <CheckBox value={isSelected}/>
		 <Text style={{marginLeft: 8}}>Newsletter</Text>
	      </View>
	   </View>
	</ScrollView>

	<View style={{flexDirection:"row",justifyContent:'space-between',padding:5}}>
	   <TouchableOpacity style={{ height: 40, width: "100%", backgroundColor: "#F4CE14", borderRadius: 6, borderWidth: 1,  marginBottom: 10, marginTop: 10 }}
	   onPress={() => logout()}> 
	   <Text style={{color: '#333', textAlign:'center',  fontSize: 18, fontWeight: 'bold', paddingTop: 4 }}> 
	   Log out 
	   </Text> 
	   </TouchableOpacity>
	</View>
	<View style={{flexDirection:"row",justifyContent:'space-between',padding:5}}>
	   <TouchableOpacity style={styles.discardChangesButton}
        onPress = {() => reloadProfile()}>
	      <Text style={styles.discardChangesButtonText}> 
		 Discard changes 
	      </Text>
	   </TouchableOpacity>
	   <TouchableOpacity style={styles.saveChangesButton}
        onPress={() => profileUpdate()}>
	      <Text style={styles.saveChangesButtonText}> 
		 Save changes 
	      </Text>
	   </TouchableOpacity>
	</View>
	</KeyboardAvoidingView>

      </>
    );
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    alignContent: 'stretch', 
    padding: 20,
    paddingTop: 10,
  },
  smallProfile: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  avatarText: {
    width: 80,
    height: 80,
    borderRadius: 50,
    fontSize: 32,
    backgroundColor: "#495E57",
    color: "#F4CE14",
    padding: 16,
    
  },
  changeButton: { 
    backgroundColor: "#495E57", 
    height: 45,
    borderRadius: 10,
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 15,
    width: "30%", 
    
  }, 
  removeButton: { 
    backgroundColor: "#FFF", 
    height: 45,

    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 15,
    width: "30%", 
  }, 
  saveChangesButton: { 
    backgroundColor: "#495E57", 
    height: 45,
    borderRadius: 10, 

    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 15,
    width: "45%", 
    
  }, 
  discardChangesButton: { 
    backgroundColor: "#FFF", 
    height: 45,

    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 15,
    width: "45%", 
  },   
  changeButtonText: { 
      color: "white", 
      fontSize: 18, 
  },   
  removeButtonText: { 
    color: "#000", 
    fontSize: 18, 
  }, 
  saveChangesButtonText: { 
    color: "white", 
    fontSize: 18, 
},   
discardChangesButtonText: { 
  color: "#000", 
  fontSize: 18, 
},   
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },  
  row: {
    
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  fullRow: {
    height: '100%',
    width: '100%',
  },
  customHeight: {
    height: 20,
  },
  customPercentageHeight: {
    height: '50%',
  },
  progressBar: {
    height: 15,
  },

});

export default Profile;