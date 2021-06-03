import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import AuthContext  from '../../contexts/auth';

const SignIn: React.FC = () => {
    
    const { signed, signIn } = useContext(AuthContext);
    
    console.log(signed);

    async function handleSignIn() {
        await signIn();
        console.log('Logado');
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title='Sign In' onPress={handleSignIn} />
        </View>
    )
}

export default SignIn;