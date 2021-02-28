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
    const [companyName, setCompanyName] = React.useState('')
    const [established, setEstablished] = React.useState('')
    const [contactNumber, setContactNumber] = React.useState('')
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
                companyName, established, contactNumber
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
                            <Label>Company Name</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setCompanyName(text)} value={companyName} />
                        </Item>
                        <Item
                            floatingLabel
                        >
                            <Label>established</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setEstablished(text)} value={established} />
                        </Item>

                        <Item floatingLabel last>
                            <Label>contactNumber</Label>
                            <Input autoCapitalize="none" onChangeText={(text) => setContactNumber(text)} value={contactNumber} />
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
                            <Text>Company Name : {userProfile.companyName}</Text>
                            <Text>Phone: {userProfile.contactNumber}</Text>
                            <Text>Established : {userProfile.established}</Text>
                    </View>
                </View>}
                <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Button full style={{  marginTop: 30,marginBottom: 50, width: '90%', alignSelf: 'center' }}
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

