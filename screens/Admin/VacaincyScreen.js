import React from 'react'
import * as firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, ScrollView } from 'react-native';
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

const VacaincyScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        firebase.database().ref('jobpost').on('value', snapshot => {
            let data = Object.values(snapshot.val())
            dispatch({ type: "ADDJOBPOST", payload: data })
        })
    },[])
    const { companyVacancies } = useSelector(state => {
        return {
            companyVacancies: state.companyVacancies,
        }
    })
    return (
        <ScrollView>
            <Container>
                <Content>
                    {
                        companyVacancies.length > 0 ? companyVacancies.map((data, i) => {
                          if(data.uid===route.params.uid){
                              return(
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
                          }
                        })
                            :
                            <Text>No Job Found</Text>
                    }

                </Content>
            </Container>
        </ScrollView>
    )
}

export default VacaincyScreen
