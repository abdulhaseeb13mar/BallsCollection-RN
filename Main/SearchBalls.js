/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../Resuables/searchingBar';
import Data from '../dummyData';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import NavigationRef from '../Resuables/RefNavigation';
import {ProductTiles} from './Home';
import {connect} from 'react-redux';
import {setCurrentBallAction} from '../reduxStore/actions';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? null : RenderTiles(SearchedItems);
  };

  const TilePressed = (item) => {
    props.setCurrentBallAction({
      ...item,
      catagoryName: Data.catagory[parseInt(item.catagoryId) - 1],
    });
    NavigationRef.Navigate('Products');
  };

  const RenderTiles = (BannerArr) => {
    return BannerArr.map((item) => (
      <ProductTiles key={item.id} item={item} TilePressed={TilePressed} />
    ));
  };

  const goBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign
              name="arrowleft"
              color={colors.darkGray}
              size={Measurements.width * 0.08}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.SearchBarWrapper}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
        <View style={styles.PaintingTilesWrapper}>
          {searchText !== '' ? RenderSearchedResult() : null}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export default connect(null, {setCurrentBallAction})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Measurements.width * 0.03,
    paddingVertical: Measurements.height * 0.018,
  },
  PaintingTilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.003,
  },
  container: {flex: 1},
});
