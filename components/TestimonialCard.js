import {React, useState} from "react"; 
import { Image, Text ,View, StyleSheet } from 'react-native'; 
import {Card, Button , Title ,Paragraph } from 'react-native-paper'; 

const TestimonialCard = () => { 
	
	const yellowStar = "⭐";
	//const [starText, setStarText] = useState(' , , , , ,');
	let starText = ' , , , , ,';
	return( 
		
		<Card style={Styles.container}> 
			<Card.Content> 
			<Text>
				{starText
					.split(' ')
					.map(word => word && yellowStar)
					.join(' ')} 
				</Text>


				<View style={{flexDirection:"row",padding:10}}>
				<Image 
					style={{height: 50, width: 50, borderRadius: 50}}
					source={require('../assets/testimonial3.png')} alt="sara lopez testimonial" />
					<Text style={{color: 'black', marginLeft: 10}}>Sara Lopez{'\n'}
						<Text style={{color: 'gray'}}>Sara72</Text>
					</Text> 
				</View> 
				<Paragraph>"Seriously cannot stop thinking about the Turkish Mac n'Cheese!!"</Paragraph> 

			</Card.Content>

		</Card>

	)
} 

const Styles = StyleSheet.create({
	container :{ 
		alignContent:'center', 
		width: 225,
		height: 175,
	} 
})

export default TestimonialCard;