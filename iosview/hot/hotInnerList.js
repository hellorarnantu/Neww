import React,{Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    RefreshControl,
    TouchableHighlight,
    Image,
    Text,
    highlightRow
} from 'react-native';

const hotNewsUrl = 'http://47.93.39.190/ineww/news?page=';


class HotInnerList extends React.Component {
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds,
            dataSource: ds.cloneWithRows([]),
            isRefreshing:true
        }
    }
    //get Hot News List
    _getHotNews = ()=>{
        let number = Math.round(Math.random()*100)
        let url = hotNewsUrl+number;
        // console.log(number);
        fetch(url,{
            method:'GET',
            cache:'default'
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            let resArray = responseJson.data.result;
            setTimeout(()=>{
                this.setState({
                    dataSource:this.state.ds.cloneWithRows(resArray),
                    isRefreshing:false
                });
            },500);
        })
        .catch(error=>{
            console.warn(error);
        })
    }

    componentWillMount = () => {
        this._getHotNews();
    }
    
    _renderRow = (rowData,sectionID,rowID,highlightRow)=>{
        let row = rowData;
        let imgStyle,titleStyle,keywordStyle,sourceStyle,source;
        // let self = this;
        if(row.image===""){
            source = null;
            imgStyle = {};
            titleStyle = styles.titleFull;
            keywordStyle = styles.keywordFull;
            sourceStyle = styles.sourceFull;
        }else{
            source = {uri:row.image};
            imgStyle = styles.thumb;
            titleStyle = styles.title;
            keywordStyle = styles.keywords;
            sourceStyle = styles.source;
        }
        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#eee'}
                onPress={()=>{
                    highlightRow(sectionID,rowID);
                    this.props.pressItem(rowData.news_id);
                }
                }>
                <View>
                    <View style={styles.row}>
                            <Image style={imgStyle} source={source}/>
                            <Text style={titleStyle}>{rowData.title}</Text>
                            <Text style={keywordStyle}>{'关键词：'+rowData.keywords}</Text>
                            <Text style={sourceStyle}>{'来源：'+rowData.source+'  作者：'+rowData.author}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _onRefresh = ()=>{
        this.setState({isRefreshing:true});
        this._getHotNews();
    }

    render(){
        return(
            <ListView
            style={styles.hotListStyle}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections = {true}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                    tintColor="#000000"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                />
            }>
            </ListView>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingTop:10,
        paddingLeft:10,
        paddingRight:6,
        paddingBottom:2,
        minHeight:120,
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    thumb: {
        width: 100,
        height: 100,
        margin:10,
        position:'absolute',
    },
    title: {
        fontSize:16,
        marginLeft:110,
        textAlign:'left',
        lineHeight:24,
        fontWeight:'bold',
    },
    titleFull: {
        fontSize:16,
        marginLeft:0,
        textAlign:'left',
        lineHeight:24,
        fontWeight:'bold',
    },
    keywords: {
        color:'#888',
        fontSize:13,
        marginLeft:110,
        marginTop:10,
    },
    keywordFull: {
        color:'#888',
        fontSize:13,
        marginLeft:0,
        marginTop:10,
    },
    source: {
        color: '#888',
        fontSize:12,
        marginLeft:110,
        marginTop:10,
        marginBottom:5,
    },
    sourceFull: {
        color: '#888',
        fontSize:12,
        marginLeft:0,
        marginTop:10,
        marginBottom:5,
    },
    hotListStyle: {
        marginTop: 42,
        backgroundColor:'#fff',
    }
});

module.exports = HotInnerList;
