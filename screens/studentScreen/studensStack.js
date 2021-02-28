import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import CompanyScreen from './CompanyScreen';
import JobDescription from './JobDescription'
import VacaincyScreen from './VacaincyScreen';

const StudentTab = createMaterialBottomTabNavigator();
const StudentStack = createStackNavigator()




export const StudentStackCompanyScreen = ({ navigation }) => {
    return (
        <StudentStack.Navigator initialRouteName="CompanyList" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <StudentStack.Screen name="CompanyList" component={CompanyScreen} />
            <StudentStack.Screen name="Vacainy" component={VacaincyScreen} />
            <StudentStack.Screen name="Job" component={JobDescription} />
        </StudentStack.Navigator>
    )
}

export const StudentStackProfileScreen = ({ navigation }) => {
    return (
        <StudentStack.Navigator initialRouteName="CompanyList" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <StudentStack.Screen name="Profile" component={ProfileScreen} />
        </StudentStack.Navigator>
    )
}



export const StudentTabScreen = ({ navigation }) => {
    return (
        <StudentTab.Navigator initialRouteName="Profile"

            activeColor="#f0edf6"
            inactiveColor="grey"
            barStyle={{ backgroundColor: '#00acc1' }}
        >
            <StudentTab.Screen
                name="Profile"
                component={StudentStackProfileScreen}
                options={{
                    tabBarLabel: 'Profile', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" color={color} size={26} />
                    ),
                }}
            />
            <StudentTab.Screen
                name="Company"
                component={StudentStackCompanyScreen}
                options={{
                    tabBarLabel: 'Company List', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="business" color={color} size={26} />
                    )
                }}
            />
        </StudentTab.Navigator>
    )
}




