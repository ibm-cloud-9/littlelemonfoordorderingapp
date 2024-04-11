import React, {useRef, useState, useContext}  from 'react';
import {Image, StyleSheet,Text, TextInput, TouchableOpacity, View} from 'react-native';
import TestimonialCard from '../components/TestimonialCard';
import PagerView from "react-native-pager-view";
import { AuthContext } from "../AuthContext";


const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
 
const Onboarding = () => {

  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const viewPagerRef = useRef(PagerView);

  const validateName = (name) => {
    if (name.length > 0) {
      return name.match(/[^a-zA-Z]/);
    } else {
      return true;
    }
  };

  const { createProfile } = useContext(AuthContext);

	const isEmailValid = validateEmail(email);
	const pagerRef = useRef(PagerView);


  const handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePageChange = pageNumber => {
    pagerRef.current.setPage(pageNumber);
  };

  

/*   useEffect(() => {
    // Place your code here
    console.log('Component has mounted.');

    loadFonts = async () => {
      try {
          await Font.loadAsync({
              'Karla-Regular': require('../assets/Fonts/Karla-Regular.ttf'),
          })

          await Font.loadAsync({
              'MarkaziText-Regular': require('../assets/Fonts/MarkaziText-Regular.ttf'),
          })

          this.setState({fontLoaded: true});
      } catch (error) {
        console.error('Error retrieving font(s):', error);
        return null;
      }
    };


    loadFonts();

  }, []); */

  return (
    <>

    <View
      style={{
        flex: .10,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
      <Image source={require('../assets/Logo.png')}
        style={{marginTop: 10}} />
    </View>
    <View
      style={{
        flex: .10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#495E57',
        padding: 10
      }}>
      <Text style={{color: '#F4CE14', fontSize: 32}}>Little Lemon</Text>
      <Text style={{color: '#FFFFFF', fontSize: 24}}>Chicago</Text>
    </View>
    <View
      style={{
        flex: .20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#495E57',
        padding: 10
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 18, width: '60%'}}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
      <Image source={require('../assets/restaurant-food.jpg')}
        style={{width: 150, height: 150, borderRadius: 8, marginTop: -20}} />
    </View>

			<PagerView
				style={{flex: .60}}
				scrollEnabled={false}
				initialPage={0}
				ref={pagerRef}
			>
        <View style={{}} key="1">
          <View
              style={{
                flex: .55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TestimonialCard/>
          </View> 
          <View
          style={{
            flex: .35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4CE14'
          }}>
          <View style={styles.pageIndicator}>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
          </View>
          </View>
          <View
              style={{
                flex: .20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F4CE14'
              }}>

            <TouchableOpacity style={{ height: 40, width: "40%", backgroundColor: "#FFFFFf", borderRadius: 8, borderWidth: 1,   marginHorizontal: 10 }}
                  onPress={() => handlePageChange(1)}> 
                    <Text style={{color: '#333', textAlign:'center',  fontSize: 18, paddingTop: 4 }}>
                        Next
                    </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{}} key="2">
          <View
              style={{
                flex: .55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={onChangeFirstName}
              placeholder={"First Name"}
            />
          </View> 
          <View
          style={{
            flex: .35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4CE14'
          }}>
          <View style={styles.pageIndicator}>
            <View style={[styles.pageDot]}></View>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>          
          </View>       
          </View>
          <View
              style={{
                flex: .20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F4CE14'
              }}>

            <TouchableOpacity style={{ height: 40, width: "40%", backgroundColor: "#495E57", borderRadius: 8, borderWidth: 1,   marginRight: 10 }}
                  onPress={() => handlePageChange(0)}> 
                    <Text style={{ color: '#FFF', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
                        Back 
                    </Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={[{ height: 40, width: "40%", backgroundColor: "#FFFFFf", borderRadius: 8, borderWidth: 1,   marginHorizontal: 10 },
                            validateName(firstName) ? styles.btnDisabled : ""]}
                              onPress={() => handlePageChange(2)}
                              disabled={validateName(firstName)}> 
                    <Text style={{color: '#333', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
                        Next
                    </Text> 
            </TouchableOpacity>     
          </View>
        </View>

        <View style={{}} key="3">
          <View
              style={{
                flex: .55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={onChangeLastName}
              placeholder={"Last Name"}
            />
          </View> 
          <View
          style={{
            flex: .35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4CE14'
          }}>
          <View style={styles.pageIndicator}>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>
            <View style={styles.pageDot}></View>
          </View>
          </View>
          <View
              style={{
                flex: .20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F4CE14'
              }}>

            <TouchableOpacity style={{ height: 40, width: "40%", backgroundColor: "#495E57", borderRadius: 8, borderWidth: 1,   marginRight: 10 }}
                  onPress={() => handlePageChange(1)}> 
                  <Text style={{ color: '#FFF', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
                      Back 
                  </Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={[{ height: 40, width: "40%", backgroundColor: "#FFFFFf", borderRadius: 8, borderWidth: 1,   marginHorizontal: 10 },
                            validateName(lastName) ? styles.btnDisabled : ""]}
                              onPress={() => handlePageChange(3)}
                              disabled={validateName(lastName)}> 
                  <Text style={{color: '#333', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
                      Next
                  </Text> 
            </TouchableOpacity>     
          </View>
        </View>

        <View style={{}} key="4">
          <View
              style={{
                flex: .55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Email"}
            />
          </View> 
          <View
          style={{
            flex: .35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4CE14'
          }}>
          <View style={styles.pageIndicator}>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>          
          </View>       
          </View>
          <View
              style={{
                flex: .20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F4CE14'
              }}>

            <TouchableOpacity style={{ height: 40, width: "40%", backgroundColor: "#495E57", borderRadius: 8, borderWidth: 1,   marginRight: 10 }}
                  onPress={() => handlePageChange(2)}> 
                  <Text style={{ color: '#FFF', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
                      Back 
                  </Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={[{ height: 40, width: "40%", backgroundColor: "#FFFFFf", borderRadius: 8, borderWidth: 1,   marginHorizontal: 10 },
                            isEmailValid ? "" : styles.btnDisabled]}
                            onPress={createProfile({ firstName, lastName, email })}
                            disabled={!isEmailValid}> 
                  <Text style={{color: '#333', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
                      Next
                  </Text> 
            </TouchableOpacity>     
          </View>
        </View>        
      </PagerView>

    </>
  );

};

const styles = StyleSheet.create({
  viewPager: {
		flex: 1,

	  },
    label: {
      fontSize: 18,

    },
	  input: {
      alignSelf: "stretch",
      height: 50,
      margin: 18,
      borderWidth: 1,
      padding: 10,
      fontSize: 18,
      borderRadius: 9,
      borderColor: "#C0C0C0",
      backgroundColor: "#EDEFEE",
      },    
    pageIndicator: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      marginTop: 20,
      },
      pageDot: {
      backgroundColor: "#495E57",
      width: 22,
      height: 22,
      marginHorizontal: 10,
      borderRadius: 11,
      },
      pageDotActive: {
      backgroundColor: "#EE9972",
      width: 22,
      height: 22,
      borderRadius: 11,
      },  
      btnDisabled: {
        backgroundColor: "#C0C0C0",
      },
});
/* const styles = StyleSheet.create({ 
	container :{ 
		alignContent:'center', 
		height: 575
	},
	header: {
		padding: 12,
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#dee3e9",
	  },
	  logo: {
		height: 50,
		width: 150,
		resizeMode: "contain",
	  },
	  viewPager: {
		flex: 1,

	  },
	  page: {
		justifyContent: "center",
	
	  },
	  pageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#FF0000",

	  },
	  text: {
		fontSize: 24,
	  },
	  inputBox: {
		alignSelf: "stretch",
		height: 50,
		margin: 18,
		borderWidth: 1,
		padding: 10,
		fontSize: 24,
		borderRadius: 9,
		borderColor: "#EDEFEE",
		backgroundColor: "#EDEFEE",
	  },
	  btn: {
		backgroundColor: "#f4ce14",
		borderRadius: 9,
		alignSelf: "stretch",
		marginHorizontal: 18,
		marginBottom: 60,
		padding: 10,
		borderWidth: 1,
		borderColor: "#cc9a22",
	  },
	  btnDisabled: {
		backgroundColor: "#f1f4f7",
	  },
	  buttons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 18,
		marginBottom: 60,
	  },
	  halfBtn: {
		flex: 1,
		backgroundColor: "#f4ce14",
		borderRadius: 9,
		alignSelf: "stretch",
		marginRight: 18,
		padding: 10,
		borderWidth: 1,
		borderColor: "#cc9a22",
	  },
	  btntext: {
		fontSize: 22,
		color: "#3e524b",
		fontWeight: "bold",
		alignSelf: "center",
	  },
	  pageIndicator: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
    marginTop: 20,
	  },
	  pageDot: {
		backgroundColor: "#495E57",
		width: 22,
		height: 22,
		marginHorizontal: 10,
		borderRadius: 11,
	  },
	  pageDotActive: {
		backgroundColor: "#EE9972",
		width: 22,
		height: 22,
		borderRadius: 11,
	  },
});
 */
export default Onboarding;