import React,{Component} from 'react';
import {
    Text,
    Navigator,
    TouchableHighlight,
    WebView,
    ListView,
    View,
    StyleSheet,
    Image,
    Animated,
    FlatList
} from 'react-native';

// import RCD from '../common/refreshControl';
// import {
//     FooterComponent,
//     HeaderComponent,
//     ItemComponent,
//     PlainInput,
//     SeparatorComponent,
//     genItemData,
//     getItemLayout,
//     pressItem,
//     renderSmallSwitchOption
// } from '../common/ListControl';
// import FlatListExample from '../common/FlatListExample';

import HotInnerList from './hotInnerList';

export default class HotPage extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }
    
    render(){
        return (
            <Navigator
            initialRoute={{title:'热门1',index:0}}
            renderScene={(route,navigator)=>
                <HotInnerList/>
            }
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton:(route,navigator,index,navState)=>
                  {
                      return (<Text onPress={()=>{
                          console.debug(123)
                        }} style={{fontSize:15,lineHeight:36,fontWeight:'bold',marginLeft:10}}>返回</Text>)
                  },
                  RightButton:(route,navigator,index,navState)=>
                  {
                      return(<Text></Text>);
                  },
                  Title:(route,navigator,index,navState)=>
                  {
                      return(<Text style={{fontSize:18,lineHeight:36,fontWeight:'bold'}}>热门</Text>);
                  },
                }}
                style={{backgroundColor:'#eee'}}
              />
            }
          />
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor:'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
    hotStyle: {
        marginTop: 45
    }
})