import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker, Icon } from 'native-base';
import { Image, Dimensions } from 'react-native'
import * as firebase from 'firebase';


const LoginScreen = ({navigation}) => {
    const [name,setName] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [checkEamilValid, setEmailValid] = React.useState(false)

    React.useEffect(() => {
        validate()
    }, [email])
    const validate = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            (false)
        }
        else {
            setEmailValid(true)
        }
    }


    const onSubmit = () => {
        if (name!==""&&email !== "" && password !== "" && confirmPassword !== "" && userType !== '') {
           if(password===confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                let newUser  = {
                    name,
                    email:userCredential.user.email,
                    uid:userCredential.user.uid,
                    userType
                }
               firebase.database().ref(`users/${newUser.uid}`).set(newUser)
            }).catch(err => alert(err))
           }
           else{
               alert('password not Matched')
           }
        }
        else {
            alert('All fields Must be Required')
        }
    }

    return (
        <Container>
            <Header style={{ backgroundColor: '#00acc1' }} >
                <Text style={{ color: 'white', paddingTop: 15, fontSize: 20 }}>Compus Recruitment System</Text>
            </Header>
            <Content>
                <Form>
                    <Item
                        floatingLabel
                    >
                        <Label>User Name</Label>
                        <Input textContentType="user" onChangeText={text => setName(text)} autoCapitalize="none" value={name} />
                    </Item>
                    <Item
                        floatingLabel
                        {...props => () => checkEamilValid ? success : error}
                    >
                        <Label>Email</Label>
                        <Input textContentType="emailAddress" onChangeText={text => setEmail(text)} autoCapitalize="none" value={email} />
                        {checkEamilValid ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' />}
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input textContentType="password" secureTextEntry onChangeText={text => setPassword(text)} autoCapitalize="none" value={password} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Confirm Password</Label>
                        <Input textContentType="password" secureTextEntry onChangeText={text => setConfirmPassword(text)} autoCapitalize="none" value={confirmPassword} />
                    </Item>
                    <Text style={{marginLeft:10,marginTop:20}}>
                        Select User Type
                    </Text>
                   <Picker 
                        note
                        mode="dropdown"
                        selectedValue={userType}
                        onValueChange={(value)=>setUserType(value)}
                        placeholder="Select User Type"
                    >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Student" value="Student" />
                        <Picker.Item label="Company" value="Company" />
                        <Picker.Item label="Admin" value="Admin" />
                    </Picker>
                    <Button info
                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                        onPress={onSubmit}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Sign Up </Text>
                    </Button>
                    <Button bordered
                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                        onPress={()=>navigation.navigate('SignInScreen')}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Sign In </Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default LoginScreen