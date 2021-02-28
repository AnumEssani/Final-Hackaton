import React from 'react'
import * as firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux'
import {StudentTabScreen} from './studentScreen/studensStack';
import {CompanyTabScreen} from './companyScreen/CompanyStack';
import {AdminTabScreen} from './Admin/AdminStack'


const HomeStackScreen = ({ navigation }) => {
    const{userType} = useSelector(state=>{return{
        userType:state.userType
    }})
    console.log('userType', userType)
    return (
        <>
        
        {userType === 'Student' && (<StudentTabScreen/>) ||userType === 'Company' && (<CompanyTabScreen/>) ||userType === 'Admin' && (<AdminTabScreen/>)}
        </>
    )
}
export default HomeStackScreen
