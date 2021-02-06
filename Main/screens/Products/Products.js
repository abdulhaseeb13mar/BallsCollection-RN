import React from 'react';
import {ScrollView} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';

function Products(props) {
  return (
    <WrapperScreen>
      <ScrollView bounces={false}>
        <div>this is product screen</div>
      </ScrollView>
    </WrapperScreen>
  );
}

export default Products;
