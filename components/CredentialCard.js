import {React, useRef, useState, useContext} from "react"; 
import { Image, KeyboardAvoidingView, Platform,   Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'; 
import {Card, Button , Title ,Paragraph } from 'react-native-paper'; 
import PagerView from "react-native-pager-view";

import { AuthContext } from '../AuthContext';

const validateEmail = (email) => {
	return email.match(
	  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
  };

const validateName = (name) => {
if (name.length > 0) {
	return name.match(/[^a-zA-Z]/);
} else {
	return true;
}
}  

const CredentialCard = () => { 
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const { credentials } = useContext(AuthContext);

	const isEmailValid = validateEmail(email);
	const viewPagerRef = useRef(PagerView);



	return( 
		
/* 		<Card style={styles.container}> 
			<Card.Content>  */
			<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
			<PagerView
				style={styles.viewPager}
				scrollEnabled={false}
				initialPage={0}
				ref={viewPagerRef}
			>
				<View style={styles.page} key="1">
					<View style={styles.pageContainer}>
						<Text style={styles.text}>First Name</Text>
						<TextInput
						style={styles.inputBox}
						value={firstName}
						onChangeText={setFirstName}
						placeholder={"First Name"}
						/>

						<View style={styles.pageIndicator}>
							<View style={[styles.pageDot, styles.pageDotActive]}></View>
							<View style={styles.pageDot}></View>
							<View style={styles.pageDot}></View>
						</View>

						<View style={styles.pageIndicator}>
						<TouchableOpacity style={{ height: 40, width: "40%", backgroundColor: "#495E57", borderRadius: 8, borderWidth: 1,   marginRight: 10 }}
						onPress={() => () => viewPagerRef.current.setPage(0)}> 
							<Text style={{ color: '#FFF', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
								Back 
							</Text> 
						</TouchableOpacity> 
						<TouchableOpacity style={{ height: 40, width: "40%", backgroundColor: "#FFFFFf", borderRadius: 8, borderWidth: 1,   marginHorizontal: 10 }}
							onPress={() => viewPagerRef.current.setPage(1)}> 
								<Text style={{color: '#333', textAlign:'center',  fontSize: 18, paddingTop: 4 }}> 
									Next
								</Text> 
						</TouchableOpacity> 
						</View>
					</View>



	{/* 				<Pressable
						style={[
						styles.btn,
						validateName(firstName) ? styles.btnDisabled : "",
						]}
						onPress={() => viewPagerRef.current.setPage(1)}
						disabled={validateName(firstName)}
					>
						<Text style={styles.btntext}>Next</Text>
					</Pressable> */}





				</View>
				<View style={styles.page} key="2">
				<View style={styles.pageContainer}>
					<Text style={styles.text}>Last Name</Text>
					<TextInput
					style={styles.inputBox}
					value={lastName}
					onChangeText={setLastName}
					placeholder={"Last Name"}
					/>
				</View>
				<View style={styles.pageIndicator}>
					<View style={styles.pageDot}></View>
					<View style={[styles.pageDot, styles.pageDotActive]}></View>
					<View style={styles.pageDot}></View>
				</View>
				<View style={styles.buttons}>
					<Pressable
					style={styles.halfBtn}
					onPress={() => viewPagerRef.current.setPage(0)}
					>
					<Text style={styles.btntext}>Back</Text>
					</Pressable>
					<Pressable
					style={[
						styles.halfBtn,
						validateName(lastName) ? styles.btnDisabled : "",
					]}
					onPress={() => viewPagerRef.current.setPage(2)}
					disabled={validateName(lastName)}
					>
					<Text style={styles.btntext}>Next</Text>
					</Pressable>
				</View>
				</View>
				<View style={styles.page} key="3">
				<View style={styles.pageContainer}>
					<Text style={styles.text}>Email</Text>
					<TextInput
					style={styles.inputBox}
					value={email}
					onChangeText={setEmail}
					placeholder={"Email"}
					keyboardType="email-address"
					/>
				</View>
				<View style={styles.pageIndicator}>
					<View style={styles.pageDot}></View>
					<View style={styles.pageDot}></View>
					<View style={[styles.pageDot, styles.pageDotActive]}></View>
				</View>
				<View style={styles.buttons}>
					<Pressable
					style={styles.halfBtn}
					onPress={() => viewPagerRef.current.setPage(1)}
					>
					<Text style={styles.btntext}>Back</Text>
					</Pressable>
					<Pressable
					style={[styles.halfBtn, isEmailValid ? "" : styles.btnDisabled]}
					onPress={() => credentials({ firstName, lastName, email })}
					disabled={!isEmailValid}
					>
					<Text style={styles.btntext}>Submit</Text>
					</Pressable>
				</View>
				</View>
			</PagerView>



 
			</KeyboardAvoidingView>
			
/* 			</Card.Content> 

		</Card>  */
		
	) 
} 



const styles = StyleSheet.create({ 
	container :{ 
		alignContent:'center', 
		width: 325,
		height: 175
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
	  },
	  pageDot: {
		backgroundColor: "#67788a",
		width: 22,
		height: 22,
		marginHorizontal: 10,
		borderRadius: 11,
	  },
	  pageDotActive: {
		backgroundColor: "#f4ce14",
		width: 22,
		height: 22,
		borderRadius: 11,
	  },
});

export default CredentialCard; 