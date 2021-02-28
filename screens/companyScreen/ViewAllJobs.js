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
import { Dimensions, View ,ScrollView} from 'react-native';
import * as firebase from 'firebase';

const VeiwAllJob = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    const { companyVacancies, uid } = useSelector(state => {
        return {
            companyVacancies: state.companyVacancies,
            uid: state.uid
        }
    })
    console.log('Job Post',companyVacancies)
    React.useEffect(() => {
            firebase.database().ref('jobpost').on('value', snapshot => {
                let data = Object.values(snapshot.val())
                let newData = data.filter(obj => obj.uid === uid ? obj : null)
                console.log(newData)
                dispatch({ type: "ADDJOBPOST", payload: newData })

            })
    }, [])
   
    return (
        <ScrollView>
        <Container>
            <Content>
                {
                    companyVacancies.length > 0 ? companyVacancies.map((data,i)=> {
                        return (
                            <Card key={`${data.uid}+${i}`}>
                                <CardItem>
                                    <Body>
                                        <Text>Job Name : {data.jobName}</Text>
                                        <Text>Job Desc: {data.jobDesc}</Text>
                                        <Text>Salary : {data.salary}</Text>
                                    </Body>
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
    )
}

export default VeiwAllJob

