import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';

function Home(props) {
  return (
    <WrapperScreen>
      <ScrollView bounces={false}>
        <View>
          <Text>this is home screen</Text>
          <Text>this is home screen</Text>
          <Text>this is home screen</Text>
          <Text>this is home screen</Text>
          <Text>this is home screen</Text>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

export default Home;
