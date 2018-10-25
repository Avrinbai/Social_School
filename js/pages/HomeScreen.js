'use strict';
import React from 'react';
import {
  View, 
  Text, 
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Theme from '../utils/Theme';
import TimelinePage from './TimelinePage';
import TrendingPage from './TrendingPage';
import API from '../utils/API_v1';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { IconFont, MyToast } from '../components';

/* Do this out of render method to avoid re-render when switching tabs */
const _TrendingPage = withNavigation(TrendingPage);
const _TimelinePage = withNavigation(TimelinePage);

export default class HomeScreenTab extends React.Component {
  
  static navigationOptions = {
    title: '首页',
    header: null,
  }

  state = {
    index: 0,
    routes: [
      { key: 'first', title: '关注' },
      { key: 'second', title: '推荐' },
    ],
  };

  renderTabBar = (props) => {
    return (
      <View style={{flexDirection: 'row', height: Theme.headerHeight, backgroundColor: Theme.themeColor, elevation: 1, shadowOpacity: 0}}>
        <View style={{flex: 4, alignItems: 'flex-start', justifyContent:'center'}} >
          <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Common_SearchPage')}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', height: Theme.headerHeight, alignItems:'center', width:48, padding: 8, backgroundColor:Theme.themeColor}}>
              <IconFont color='#fff' size={21} icon='&#xe623;' />
            </View>
          </TouchableHighlight>
        </View>
        <TabBar 
          {...props}
          layout={{width: 160, height: Theme.headerHeight, measured: true}}
          style={styles.tabBar} 
          labelStyle={styles.tabLabel}
          indicatorStyle={styles.tabIndicator}
          useNativeDriver={true}
        />
        <View style={{flex: 4, alignItems: 'flex-end', justifyContent:'center'}} >
          <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Status_NewStatusPage', {type:API.Status.USERSTATUS})}} >
            <View style={{flexDirection: 'row', justifyContent: 'center', height: Theme.headerHeight, alignItems:'center', padding: 8, backgroundColor:Theme.themeColor}}>
              <Text style={{fontSize: 15, color: '#fff', lineHeight: 22}}>发表</Text>
              <IconFont color='#fff' size={24} icon='&#xe66c;' />
            </View>
          </TouchableHighlight>
        </View>
      </View>  
    );
  }

  render() {
    const _this = this;
    return (
      <TabView 
        navigationState={this.state}
        renderScene={SceneMap({
          first: _TimelinePage,
          second: _TrendingPage,
        })}
        onIndexChange={(idx)=>this.setState({index: idx})}
        renderTabBar={this.renderTabBar}
        initialLayout={Dimensions.get('window')}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    width: 160 + 40 + 40, 
    elevation: 0, 
    shadowOpacity: 0,
    paddingLeft: 40,
    paddingRight: 40,
  },
  tabIndicator: {
    backgroundColor: '#fff', 
    width: 30,
    marginLeft: 25 + 40, 
    borderRadius: 1.5, 
    height: 3, 
    marginBottom: 3
  },
  tabLabel: {
    fontSize: 18, 
    lineHeight: 18, 
    paddingTop: 2,
  },
});
