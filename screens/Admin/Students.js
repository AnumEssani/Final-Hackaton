import React from 'react'
import { Container, Header, Content, Card, CardItem, Body, Text ,Button} from 'native-base';
import * as firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'


const Students = ({navigation}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        if (loading) {
            firebase.database().ref('users/').on('value', snapshot => {
                let data = Object.values(snapshot.val())
                let newData = data.filter(obj => obj.userType === "Student" ? obj : null)
                dispatch({ type: "STUDENTPROFILE", payload: newData })
                setLoading(false)
            })
        }
    }, [loading])
    const { studentProfiles } = useSelector(state => {
        return {
            studentProfiles: state.studentProfiles
        }
    })
    console.log(studentProfiles, 'Students')
    return (
        <ScrollView>
            <Container>
                <Content>
                    {
                        studentProfiles.length > 0 ? studentProfiles.map(data => {
                            return (
                                <Card key={data.uid}>
                                    <CardItem header>
                                        <Text>Name : {data.name}</Text>
                                        <Text>Email : {data.email}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>Age : {data.profile.age}</Text>
                                            <Text>Phone: {data.profile.phone}</Text>
                                            <Text>Qualification : {data.profile.qualification}</Text>
                                            <Text>Skills : {data.profile.skills}</Text>
                                            <Text>Department : {data.profile.department}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer>
                                            <Button 
                                            style={{margin:10}}
                                            onPress={()=>navigation.navigate('UpdateStudentProfile',{data})}>
                                                <Text>Update Info</Text>
                                            </Button>
                                            <Button
                                            style={{margin:10}}
                                            onPress={()=>firebase.database().ref(`users/${data.uid}`).remove()}>
                                                <Text>Delete Info</Text>
                                            </Button>
                                    </CardItem>
                                </Card>
                            )
                        })
                            :
                            <Text>No Student Found</Text>
                    }
                    
                </Content>
            </Container>
        </ScrollView>
    );
}

export default Students
