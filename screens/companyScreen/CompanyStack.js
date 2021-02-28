import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';
import AddJob from './AddJob';
import CompanyDetail from './CompanyDetail';
import ViewJobs from './ViewAllJobs'
import Students from './Students'

const CompanyTab = createMaterialBottomTabNavigator();
const CompanyStack = createStackNavigator()




export const CompanyStackCompanyScreen = ({ navigation }) => {
    return (
        <CompanyStack.Navigator initialRouteName="JobList" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }

        }}>
            <CompanyStack.Screen name="JobList" component={ViewJobs} options={{
                headerRight: () => (
                    <MaterialIcons size={30} color='#fff' name="add" onPress={() => navigation.navigate('AddJob')} />
                )
            }} />
            <CompanyStack.Screen name="AddJob" component={AddJob} />
        </CompanyStack.Navigator>
    )
}

export const CompanyStackProfileScreen = ({ navigation }) => {
    return (
        <CompanyStack.Navigator initialRouteName="CompanyDetail" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <CompanyStack.Screen name="CompanyDetail" component={CompanyDetail} />
        </CompanyStack.Navigator>
    )
}
export const ViewStudentProfile = ({ navigation }) => {
    return (
        <CompanyStack.Navigator initialRouteName="ViewStudentProfile" screenOptions={{
            headerStyle: {
                backgroundColor: '#00acc1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <CompanyStack.Screen name="ViewStudentProfile" component={Students} />
        </CompanyStack.Navigator>
    )
}



export const CompanyTabScreen = ({ navigation }) => {
    return (
        <CompanyTab.Navigator initialRouteName="Profile"
            activeColor="#f0edf6"
            inactiveColor="grey"
            barStyle={{ backgroundColor: '#00acc1' }}
        >
            <CompanyTab.Screen
                name="Profile"
                component={CompanyStackProfileScreen}
                options={{
                    tabBarLabel: 'Profile', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" color={color} size={26} />
                    ),
                }}
            />
            <CompanyTab.Screen
                name="JobPost"
                component={CompanyStackCompanyScreen}
                options={{
                    tabBarLabel: 'Job Post', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" color={color} size={26} />
                    ),
                }}
            />
            <CompanyTab.Screen
                name="Students"
                component={ViewStudentProfile}
                options={{
                    tabBarLabel: 'Students List', tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" color={color} size={26} />
                    ),
                }}
            />
        </CompanyTab.Navigator>
    )
}




