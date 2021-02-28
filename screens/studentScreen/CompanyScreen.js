import React from 'react'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import * as firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView,TouchableOpacity,View } from 'react-native'


const Company = ({navigation}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        if (loading) {
            firebase.database().ref('users/').on('value', snapshot => {
                let data = Object.values(snapshot.val())
                let newData = data.filter(obj => obj.userType === "Company" ? obj : null)
                dispatch({ type: "COMPANYPROFILE", payload: newData })
                setLoading(false)
            })
        }
    }, [loading])
    const { companyProfiles } = useSelector(state => {
        return {
            companyProfiles: state.companyProfiles
        }
    })
    console.log(companyProfiles, 'Company')
    return (
        <ScrollView>
            <Container>
                <Content>
                    {
                        companyProfiles.length > 0 ? companyProfiles.map(data => {
                            return (
                                <TouchableOpacity  onPress={()=>navigation.navigate('Vacainy',{uid:data.uid})}>
                                    <Card key={data.uid}>
                                    <CardItem>
                                        <Body>
                                        <Text>Company Name : {data.profile.companyName}</Text>
                                        <Text>Email : {data.email}</Text>
                                            <Text>Contact Person : {data.name}</Text>
                                            <Text>Phone: {data.profile.contactNumber}</Text>
                                            <Text>established : {data.profile.established}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                                </TouchableOpacity>
                            )
                        })
                            :
                            <Text>No Company Found</Text>
                    }
                    
                </Content>
            </Container>
        </ScrollView>
    );
}

export default Company

