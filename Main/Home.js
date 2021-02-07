/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';
import WrapperScreen from '../Resuables/WrapperScreen';
import Data from '../dummyData';
import {connect} from 'react-redux';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Looping from '../Resuables/looping';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setCurrentBallAction} from '../reduxStore/actions';
import NavigationRef from '../Resuables/RefNavigation';

function Home(props) {
  useEffect(() => {
    changeTab(Data.catagory[0]);
  }, []);
  const [categories, setCategories] = useState(Data.catagory);
  const [currentCat, setCurrentCat] = useState(Data.catagory[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const changeTab = (tab) => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.catagoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  const TilePressed = (item) => {
    props.setCurrentBallAction({
      ...item,
      catagoryName: currentCat.catagoryName,
    });
    NavigationRef.Navigate('Products');
  };

  const GotoSearch = () => NavigationRef.Navigate('SearchBalls');

  return (
    <WrapperScreen>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.HeaderBarWrapper}>
          <View style={styles.HeaderBarInnerWrapper}>
            <Text style={styles.HeaderText}>Sports Store</Text>
            <TouchableOpacity
              onPress={GotoSearch}
              style={{
                padding: 7,
                borderRadius: 12,
              }}>
              <FontAwesome name="search" size={28} color={colors.lightGrey3} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listingWrapper}>
          <Looping
            data={categories}
            renderItem={({item}) => (
              <HomeTabs
                item={item}
                currentCat={currentCat}
                changeTab={changeTab}
              />
            )}
          />
        </View>
        <View style={styles.tilesWrapper}>
          <Looping
            data={tabProducts}
            renderItem={({item}) => (
              <ProductTiles item={item} TilePressed={TilePressed} />
            )}
          />
        </View>
        <View style={styles.footerWrapper}>
          <Text style={styles.footerCat}>{currentCat.catagoryName}</Text>
          <View style={styles.footerimgWrap}>
            <Image
              source={currentCat.icon}
              style={styles.footerimg}
              resizeMode="cover"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export const ProductTiles = ({item, TilePressed}) => {
  return (
    <TouchableOpacity
      onPress={() => TilePressed(item)}
      style={styles.outerTileWrapper}>
      <View style={styles.leftinner}>
        <View style={{width: '70%'}}>
          <Text style={styles.prdName}>{item.productName}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View style={styles.avilOuterWrap}>
          <Text style={styles.availSize}>Available Size</Text>
          <View style={styles.availInnerWrapp}>
            <Text style={styles.availSizeText}>3</Text>
            <Text style={styles.availSizeText}>4</Text>
            <Text style={styles.availSizeText}>5</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.rightInner,
          backgroundColor: colors.primary,
        }}>
        <View style={styles.ImageWrapper}>
          <Image
            source={item.images}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeTabs = ({item, currentCat, changeTab}) => {
  return (
    <TouchableOpacity style={styles.TabOuterWrapper}>
      <TouchableOpacity
        style={styles.HomeTabsWrapper}
        onPress={() => changeTab(item)}>
        <Image source={item.icon} style={styles.tabIcon} resizeMode="contain" />
        <Text
          style={{
            ...styles.HomeTabsText,
            color:
              item.catagoryName === currentCat.catagoryName
                ? 'black'
                : colors.lightGrey3,
          }}>
          {item.catagoryName}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default connect(null, {setCurrentBallAction})(Home);

const styles = StyleSheet.create({
  footerimg: {
    width: Measurements.width * 0.4,
    height: Measurements.height * 0.2,
    opacity: 0.3,
  },
  footerimgWrap: {
    position: 'absolute',
    top: Measurements.height * 0.01,
    right: -Measurements.width * 0.05,
  },
  footerCat: {
    marginHorizontal: Measurements.width * 0.05,
    fontSize: Measurements.width * 0.08,
    fontWeight: 'bold',
    fontStyle: 'italic',
    opacity: 0.3,
  },
  footerWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: Measurements.height - Measurements.height * 0.814,
  },
  tilesWrapper: {
    marginVertical: Measurements.height * 0.03,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: Measurements.width * 0.1,
    fontStyle: 'italic',
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Measurements.width * 0.88,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Measurements.height * 0.01,
  },
  container: {flex: 1},
  image: {
    width: Measurements.width * 0.4,
    height: Measurements.height * 0.2,
  },
  ImageWrapper: {
    position: 'absolute',
    left: Measurements.width * -0.1,
    top: Measurements.height * 0.09,
  },
  rightInner: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: colors.primary,
    right: 0,
    borderRadius: 15,
  },
  availSizeText: {
    paddingVertical: Measurements.height * 0.012,
    paddingHorizontal: Measurements.width * 0.028,
    fontSize: Measurements.width * 0.041,
    color: colors.darkGray,
    fontWeight: 'bold',
    borderRadius: 5,
    borderColor: colors.lightGrey1,
    borderWidth: 1,
    textAlign: 'center',
  },
  availInnerWrapp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  availSize: {
    fontWeight: 'bold',
    color: colors.lightGrey1,
    marginBottom: Measurements.height * 0.015,
  },
  avilOuterWrap: {
    marginBottom: Measurements.height * 0.02,
    width: '88%',
  },
  price: {
    marginTop: Measurements.height * 0.019,
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.048,
  },
  prdName: {
    fontSize: Measurements.width * 0.056,
    fontWeight: 'bold',
  },
  leftinner: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    left: 0,
    paddingLeft: Measurements.width * 0.02,
    paddingTop: Measurements.height * 0.017,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  outerTileWrapper: {
    marginVertical: Measurements.height * 0.04,
    marginHorizontal: Measurements.width * 0.09,
    width: Measurements.width * 0.8,
    height: Measurements.height * 0.43,
    borderRadius: 15,
    overflow: 'visible',
    position: 'relative',
  },
  tabIcon: {
    height: Measurements.height * 0.02,
    width: Measurements.width * 0.04,
  },
  TabOuterWrapper: {
    marginVertical: Measurements.height * 0.02,
    paddingVertical: Measurements.height * 0.027,
    borderColor: colors.lightGrey2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  HomeTabsText: {
    fontWeight: '700',
    marginLeft: Measurements.width * 0.025,
  },
  HomeTabsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Measurements.width * 0.07,
    borderColor: colors.lightGrey1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
});
