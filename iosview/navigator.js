import React,{Component} from 'react';
import {
    Text,
    Navigator,
    TouchableHighlight,
    WebView
} from 'react-native';

export default class NavigatorOfHot extends Component {
    render(){
        return (
            <Navigator
            renderScene={(route,navigator)=>
                <WebView
                    source={require('./page/hot.html')}
                    style={{top:45,height:200}}
                />
            }
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton:(route,navigator,index,navState)=>
                  {return(<Text></Text>);},
                  RightButton:(route,navigator,index,navState)=>
                  {return(<Text></Text>);},
                  Title:(route,navigator,index,navState)=>
                  {return(<Text style={{fontSize:18,lineHeight:36,fontWeight:'bold'}}>热门</Text>);},
                }}
                style={{backgroundColor:'#eee'}}
              />
            }
          />
        )
    }
}