import React, { useContext } from 'react'
import { Button, View } from 'react-native'
import AuthContext from '../../contexts/auth';

export default function Dashboard() {
    const { signed, signOut } = useContext(AuthContext);
    
    console.log(signed);

    async function handleSignOut() {
        await signOut();
        console.log('Saiu');
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title='Sign Out' onPress={handleSignOut} />
        </View>
    )
}
