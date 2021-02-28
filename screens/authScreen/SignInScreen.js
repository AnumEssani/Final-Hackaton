import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast,Icon } from 'native-base';
import { Image, Dimensions } from 'react-native'
import * as firebase from 'firebase';
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [checkEmailValid, setEmailValid] = React.useState(false)

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
        if (email !== "" && password !== ""&&checkEmailValid) {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(error => setError(error.message))
        }
    }

    return (
        <Container>
            <Header style={{ backgroundColor: '#00acc1' }} >
                <Text style={{ color: 'white', paddingTop: 15, fontSize: 20 }}>Compus Recruitment System</Text>
            </Header>
            <Content>
                <Form>
                    <Item floatingLabel  {...props => () => checkEmailValid ? success : error}>
                        <Label>Email</Label>
                        <Input textContentType="emailAddress" onChangeText={text => setEmail(text)} autoCapitalize="none" value={email} />
                        {checkEmailValid ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' />}
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input textContentType="password" secureTextEntry onChangeText={text => setPassword(text)} autoCapitalize="none" value={password} />
                    </Item>
                    <Button info
                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                        onPress={onSubmit}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Sign In </Text>
                    </Button>
                    <Button bordered
                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                        onPress={()=>navigation.navigate('SignUpScreen')}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Sign Up </Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default LoginScreen