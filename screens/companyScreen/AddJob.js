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
import * as firebase from 'firebase'
import {useDispatch,useSelector} from 'react-redux'
import {Dimensions} from 'react-native'


const ProfileScreen = ({navigation}) => {
    const [jobName, setJobName] = React.useState('')
    const [jobDesc, setJobDesc] = React.useState('')
    const [salary, setSalary] = React.useState('')
    const dispatch = useDispatch()
    const {uid} = useSelector(state=>{
        return{
            uid:state.uid
        }
    })

    const submit = ()=>{
        if(jobName!==""&&jobDesc!==''&&salary!==""){
            let jobPost = {
                jobName,jobDesc,salary,uid
            }
            firebase.database().ref('jobpost').push(
                jobPost
            )
            dispatch({type:'ADDJOBPOST',payload:jobPost})
            navigation.navigate('JobList')
        }
    }
    return (
        <Container>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Job Name</Label>
                        <Input onChangeText={text => setJobName(text)} value={jobName} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Job Description</Label>
                        <Input onChangeText={text => setJobDesc(text)} value={jobDesc} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Salary</Label>
                        <Input onChangeText={text => setSalary(text)} value={salary} />
                    </Item>
                    <Button  info
                     style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                        onPress={submit}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Add Job Post </Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default ProfileScreen

