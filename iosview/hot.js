import React,{Component} from 'react';
import {
    Text,
    Navigator,
    TouchableHighlight,
    WebView,
    ListView,
    View,
    StyleSheet,
    Image
} from 'react-native';

import RefreshableListView from 'react-native-refreshable-listview';

export default class NavigatorOfHot extends Component {
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
                <RefreshableListView
                    style={{marginTop:42}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>{
                        return (<TouchableHighlight onPress={() => {
                            //this._pressRow(rowID);
                            //highlightRow(sectionID, rowID);
                            }}>
                            <View>
                            <View style={styles.row}>
                                <Image style={styles.thumb} source={require('./image.jpg')} />
                                <Text style={styles.text}>
                                {rowData}
                                </Text>
                            </View>
                            </View>
                        </TouchableHighlight>);
                    }}
                ></RefreshableListView>
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
})