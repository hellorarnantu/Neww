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

import HotInnerList from './hotInnerList';
import HotArticlePage from './hotArticlePage';

class HotPage extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const routes = [
            {component:HotInnerList,title:'热门',left:'',index:0}
        ];
        return (
            <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            renderScene={(route,navigator)=>{
                return (
                    <route.component
                        pressItem={function(news_id){
                            navigator.push({
                                title:'',
                                component:HotArticlePage,
                                left:'返回',
                                index:1,
                                params:{articleIndex:news_id}
                            });
                        }}
                        {...route.params}
                    />
                );
            }}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton:(route,navigator,index,navState)=>
                  {
                      return (<Text onPress={()=>{
                          navigator.pop();
                      }} style={{fontSize:15,lineHeight:36,fontWeight:'bold',marginLeft:10}}>{route.left}</Text>)
                  },
                  RightButton:(route,navigator,index,navState)=>
                  {
                      return(<Text></Text>);
                  },
                  Title:(route,navigator,index,navState)=>
                  {
                      return(<Text style={{fontSize:18,lineHeight:36,fontWeight:'bold'}}>{route.title}</Text>);
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

module.exports = HotPage;