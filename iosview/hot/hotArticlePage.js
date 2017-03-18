import React,{Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    Text
} from 'react-native';

import HtmlView from '../common/htmlview/index';

const articleUrl = 'http://47.93.39.190/ineww/news/';

class HotArticlePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content:''
        }
    }

    _getHotNews = (articleIndex)=>{
        let number = Math.round(Math.random()*100)
        let url = articleUrl+articleIndex;
        fetch(url,{
            method:'GET',
            cache:'default'
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            let resArray = responseJson.data;
            this.state.content = resArray.content;
            this.setState({});
        })
        .catch(error=>{
            console.warn(error);
        })
    }
    componentWillMount=()=>{
        this._getHotNews(this.props.articleIndex);
    }
    render(){
        return (
            <ScrollView style={styles.scroll}>
                <HtmlView
                    value={this.state.content}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll:{
        backgroundColor:'#fff',
    }
});

module.exports = HotArticlePage;