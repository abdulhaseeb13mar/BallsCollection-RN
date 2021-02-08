/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
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
        <Text
          style={{
            marginVertical: Measurements.height * 0.01,
            marginHorizontal: Measurements.width * 0.04,
            fontSize: Measurements.width * 0.05,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Recommended
        </Text>
        <Looping
          data={tabProducts}
          renderItem={({item}) => (
            <FooterTiles item={item} TilePressed={TilePressed} />
          )}
        />
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export const FooterTiles = ({item, TilePressed}) => {
  return (
    <View style={styles.bookingDetailsCenterOverlay}>
      <View style={styles.bookingDetailsWrapper}>
        <ImageBackground
          source={item.images}
          style={styles.TileImage}
          imageStyle={{borderRadius: 10}}
          resizeMode="contain"
        />
        <View style={styles.DetailWrapper}>
          <Text style={styles.ProductName}>{item.productName}</Text>
          <View style={styles.detailInner2}>
            <Text style={styles.detailprice}>${item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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
  TileImage: {
    width: Measurements.width * 0.3,
    height: Measurements.width * 0.35,
  },
  ProductName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    width: Measurements.width * 0.35,
  },
  DetailWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: Measurements.width * 0.06,
    position: 'relative',
  },
  detailprice: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: '700',
  },
  detailInner2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: Measurements.width * 0.35,
  },
  bookingDetailsCenterOverlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Measurements.width * 0.03,
  },
  bookingDetailsWrapper: {
    borderColor: '#edeef0',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: Measurements.height * 0.01,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tilesWrapper: {},
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: Measurements.width * 0.08,
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
    width: '78%',
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
