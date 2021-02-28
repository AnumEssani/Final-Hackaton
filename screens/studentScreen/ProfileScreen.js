import React from 'react'
import {
    Container,
    Header,
    Form,
    Item,
    Input,
    Label,
    Button,
    Text,
    Picker,
    Icon, Content, Card, CardItem, Body
} from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View } from 'react-native';
import * as firebase from 'firebase';

const ProfileScreen = () => {
    const [age, setAge] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [qualification, setQualification] = React.useState('')
    const [skills, setSkills] = React.useState('')
    const [department, setDepartment] = React.useState('')

    const dispatch = useDispatch()
    const { userProfile, email, name, uid,userType } = useSelector(state => {
        return {
            userProfile: state.userProfile,
            email: state.email,
            name: state.name,
            uid: state.uid,
            userType:state.userType
        }
    })
    const submit = () => {
        let newProfile = {
            name,
            email,
            uid,
            profile:
            {
                age, phone, qualification, skills, department
            },
            userType

        }
        firebase.database().ref(`users/${uid}/`).set(newProfile)
        dispatch({ type: 'POSTUSERPROFILE', payload: newProfile })
    }
    console.log('userProfile', userProfile, email, name)
    return (
        <Container>
            <Content>
                <View>
                    <Text>Name : {name}</Text>
                    <Text>Email : {email}</Text>
                </View>
                {!userProfile?<View style={{ marginTop: 30 }}>
                    <Form>
                        <Item
                            floatingLabel
                        >
                            <Label>Age</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setAge(text)} value={age} />
                        </Item>
                        <Item
                            floatingLabel
                        >
                            <Label>Phone</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setPhone(text)} value={phone} />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Qualification</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setQualification(text)} value={qualification} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Skills</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setSkills(text)} value={skills} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Department</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setDepartment(text)} value={department} />
                        </Item>

                        <Button info
                            style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                            onPress={submit}
                        >
                            <Text style={{ width: '100%', textAlign: 'center' }}> Save</Text>
                        </Button>
                    </Form>
                </View>:
                <View style={{ marginTop: 30 }}>
                    <View>
                            <Text>Age : {userProfile.age}</Text>
                            <Text>Phone: {userProfile.phone}</Text>
                            <Text>Qualification : {userProfile.qualification}</Text>
                            <Text>Skills : {userProfile.skills}</Text>
                            <Text>Department : {userProfile.department}</Text>
                    </View>
                </View>}
                <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Button full style={{ marginBottom: 50, width: '90%', alignSelf: 'center' }}
                    onPress={() => { firebase.auth().signOut() }}
                >
                    <Text>SignOut</Text>
                </Button>
            </View>

            </Content>
           
        </Container>
    )
}

export default ProfileScreen

