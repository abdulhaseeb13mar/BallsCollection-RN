/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import WrapperScreen from '../Resuables/WrapperScreen';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../Resuables/RefNavigation';
import Image from 'react-native-fast-image';
import {setCurrentBallAction} from '../reduxStore/actions';

function Product(props) {
  const ball = props.ball;
  const [size, setSize] = useState(3);
  // const ball = {
  //   id: '1',
  //   catagoryId: '1',
  //   productName: 'Wilson Soft and Super Soft Play Volleyball',
  //   images: require('../pictures/product10.png'),
  //   categoryName: 'dvq art',
  //   discription:
  //     'For the beginners, or those just looking to have fun with some friends, the Soft Play is the ideal choice. The synthetic, sponge-backed cover provides a super-soft feel in a range of colors.',
  //   price: '51',
  // };
  const proceedToBookings = () => {
    props.setCurrentBallAction({
      size: size,
    });
    NavigationRef.Navigate('PersonalInfo');
  };

  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <View style={{height: Measurements.height * 0.58}}>
          <View style={styles.leftinner}>
            <TouchableOpacity
              onPress={goBack}
              style={{marginTop: Measurements.height * 0.03}}>
              <AntDesign name="arrowleft" size={Measurements.width * 0.07} />
            </TouchableOpacity>
            <View
              style={{
                width: '78%',
                marginTop: Measurements.height * 0.03,
              }}>
              <Text style={styles.prdName}>{ball.productName}</Text>
              <Text style={styles.discription}>{ball.discription}</Text>
            </View>
          </View>
          <View style={styles.rightInner}>
            <View style={styles.ImageWrapper}>
              <Image
                source={ball.images}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View style={styles.SchedulePickerWrapper}>
          <View style={styles.avilOuterWrap}>
            <Text style={styles.availSize}>Select Size</Text>
            <View style={styles.availInnerWrapp}>
              <TouchableOpacity onPress={() => setSize(3)}>
                <Text
                  style={{
                    ...styles.availSizeText,
                    color: size === 3 ? 'white' : colors.darkGray,
                    backgroundColor: size === 3 ? colors.primary : 'white',
                  }}>
                  3
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSize(4)}>
                <Text
                  style={{
                    ...styles.availSizeText,
                    color: size === 4 ? 'white' : colors.darkGray,
                    backgroundColor: size === 4 ? colors.primary : 'white',
                  }}>
                  4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSize(5)}>
                <Text
                  style={{
                    ...styles.availSizeText,
                    color: size === 5 ? 'white' : colors.darkGray,
                    backgroundColor: size === 5 ? colors.primary : 'white',
                  }}>
                  5
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ConfirmButtonWrapper}>
            <View style={styles.confmbtnInnerWrapper}>
              <View>
                <Text style={styles.price}>Total price</Text>
                <Text style={styles.dollar}>${ball.price}</Text>
              </View>
              <View>
                <Button
                  raised
                  title="Add to cart"
                  buttonStyle={styles.confirmButton}
                  titleStyle={styles.buttonText}
                  onPress={proceedToBookings}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    ball: state.currentBallReducer,
  };
};

export default connect(mapStateToProps, {setCurrentBallAction})(
  React.memo(Product),
);

const styles = StyleSheet.create({
  dollar: {
    fontSize: Measurements.width * 0.06,
    fontWeight: 'bold',
    color: colors.primary,
  },
  price: {
    fontSize: Measurements.width * 0.033,
    fontWeight: 'bold',
    color: colors.lightGrey1,
  },
  confmbtnInnerWrapper: {
    width: '88%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  availSizeText: {
    paddingVertical: Measurements.height * 0.026,
    paddingHorizontal: Measurements.width * 0.057,
    fontSize: Measurements.width * 0.048,
    fontWeight: 'bold',
    borderRadius: 5,
    borderColor: colors.lightGrey1,
    borderWidth: 1,
    textAlign: 'center',
    marginRight: Measurements.width * 0.04,
  },
  availInnerWrapp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  availSize: {
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: Measurements.height * 0.015,
    fontSize: Measurements.width * 0.04,
  },
  avilOuterWrap: {
    width: Measurements.width * 0.925,
  },
  discription: {
    marginTop: Measurements.height * 0.03,
    color: colors.lightGrey1,
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.032,
    lineHeight: Measurements.height * 0.027,
  },
  prdName: {
    fontSize: Measurements.width * 0.064,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  leftinner: {
    position: 'absolute',
    width: '55%',
    height: '100%',
    left: 0,
    paddingLeft: Measurements.width * 0.035,
  },
  image: {
    width: Measurements.width * 0.48,
    height: Measurements.height * 0.24,
  },
  ImageWrapper: {
    position: 'absolute',
    left: Measurements.width * -0.1,
    top: Measurements.height * 0.25,
  },
  rightInner: {
    position: 'absolute',
    width: '45%',
    height: '100%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 15,
    right: 0,
  },
  buttonText: {fontWeight: '500', color: 'white'},
  confirmButton: {
    width: Measurements.width * 0.45,
    paddingVertical: Measurements.height * 0.021,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  ConfirmButtonWrapper: {
    width: Measurements.width * 0.925,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Measurements.height * 0.04,
    paddingTop: Measurements.height * 0.05,
    paddingBottom: Measurements.height * 0.02,
    borderColor: colors.lightGrey1,
    borderTopWidth: 1,
  },
  SchedulePickerWrapper: {
    paddingTop: Measurements.height * 0.04,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
