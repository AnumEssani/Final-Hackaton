import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';
import Students from './Students';
import StudentProfile from './StudentProfile'
import CompanyScreen from './CompanyScreen'
import VacaincyScreen from './VacaincyScreen'
import { TouchableOpacity ,Text} from 'react-native';
import * as firebase from 'firebase';


const AdminTab = createMaterialBottomTabNavigator();
const AdminStack = createStackNavigator()




export const AdminStackCompanyScreen = ({ navigation }) => {
    return (
        <AdminStack.Navigator initialRouteName="CompanyList" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <AdminStack.Screen name="CompanyList" component={CompanyScreen} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => firebase.auth().signOut()} >
                        <MaterialIcons size={30} color='#fff' name="logout" />
                    </TouchableOpacity>
                )
            }} />
            <AdminStack.Screen name="Vacainy" component={VacaincyScreen} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => firebase.auth().signOut()} >
                        <MaterialIcons size={30} color='#fff' name="logout" />
                    </TouchableOpacity>
                )
            }}  />
        </AdminStack.Navigator>
    )
}

export const ViewStudentProfile = ({ navigation }) => {
    return (
        <AdminStack.Navigator initialRouteName="ViewStudentProfile" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <AdminStack.Screen name="ViewStudentProfile" component={Students} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => firebase.auth().signOut()} >
                        <MaterialIcons size={30} color='#fff' name="logout" />
                    </TouchableOpacity>
                )
            }} />
            <AdminStack.Screen name="UpdateStudentProfile" component={StudentProfile} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => firebase.auth().signOut()} >
                        <MaterialIcons size={30} color='#fff' name="logout" />
                    </TouchableOpacity>
                )
            }} />
        </AdminStack.Navigator>
    )
}




export const AdminTabScreen = ({ navigation }) => {
    return (
        <AdminTab.Navigator initialRouteName="Profile"

            activeColor="#f0edf6"
            inactiveColor="grey"
            barStyle={{ backgroundColor: '#00acc1' }}
        >
            <AdminTab.Screen
                name="Students"
                component={ViewStudentProfile}
                options={{
                    tabBarLabel: 'Profile', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" color={color} size={26} />
                    ),
                }}
            />
            <AdminTab.Screen
                name="Company"
                component={AdminStackCompanyScreen}
                options={{
                    tabBarLabel: 'Company List', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="business" color={color} size={26} />
                    )
                }}
            />
        </AdminTab.Navigator>
    )
}




