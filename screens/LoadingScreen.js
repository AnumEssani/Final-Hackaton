import React from "react";
import {Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Fire from './fire'

class LoadingScreen extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                firebase.database().ref(`users/${user.uid}/`).once('value',snapshot=>{
                    let data = snapshot.val();
                    this.props.getUserDetail(data)
                    this.props.navigation.navigate("App");
                })
            }
           this.props.navigation.navigate("Auth");
        })
    }
    setData
    render() {
        console.log('Name',this.props.name);
        return (
            <View style={style.container}>
                <View>
                    <Text>Campus Recruitment System</Text>
                </View>
                <View style={style.loader}>
                    <ActivityIndicator color="white" size="large"></ActivityIndicator>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    name:state.name,
    email:state.email,
    userType:state.userType
})

const mapDispatchToProps = dispatch => ({
    getUserDetail:(data)=>dispatch({type:'GETUSERDATA',payload:data})
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'gray'
    },
    loader: {
        margin: "10%"
    }
})

