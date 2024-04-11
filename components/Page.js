import React from 'react';
import { Image, View, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const Page = ({ backgroundColor, iconName, title, subtitle, subtitle2 }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
      }}
    >
      {/*<Icon name={iconName} size={172} color="white" />*/}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 }}>
          {title}
        </Text>
      <Image style={{resizeMode: 'cover'}}source={require('../assets/Mono-LittleLemon-1.png')} alt="logo"/>
      <View style={{ marginTop: 16 }}>

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
          {subtitle}
        </Text> 
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
          {subtitle2}
        </Text>                 
      </View>
    </View>
  );
};

export default Page;