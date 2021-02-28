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

const ProfileScreen = ({navigation,route}) => {
    const data = route.params.data
    const [age, setAge] = React.useState(data.profile.age)
    const [phone, setPhone] = React.useState(data.profile.phone)
    const [qualification, setQualification] = React.useState(data.profile.qualification)
    const [skills, setSkills] = React.useState(data.profile.skills)
    const [department, setDepartment] = React.useState(data.profile.department)
    const [name,setName]=React.useState(data.name);
    const [email,setEmail] = React.useState(data.email)
    const dispatch = useDispatch()
    console.log(route.params)
    const submit = () => {
        let newProfile = {
            name,
            email,
            uid:data.uid,
            profile:
            {
                age, phone, qualification, skills, department
            },
            userType:data.userType

        }
        firebase.database().ref(`users/${data.uid}/`).set(newProfile)
        navigation.navigate('ViewStudentProfile')
    }
    return (
        <Container>
            <Content>
                    <Form>
                    <Item
                            floatingLabel
                        >
                            <Label>Name</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setName(text)} value={name} />
                        </Item>
                        <Item
                            floatingLabel
                        >
                            <Label>Email</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setEmail(text)} value={email} />
                        </Item>
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
            </Content>
           
        </Container>
    )
}

export default ProfileScreen

