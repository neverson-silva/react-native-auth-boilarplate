import React, {createContext, useContext, useEffect, useState} from 'react';
import { AsyncStorage, View, ActivityIndicator } from 'react-native';
import api from '../services/api';
import * as auth from '../services/auth';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean,
    signIn(): Promise<void>;
    signOut(): Promise<void>;
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadStoragedDate() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

            if (storagedUser && storagedUser) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);

        }
        loadStoragedDate();
    }, []);

    async function signIn(): Promise<void> {
        const response = await auth.signIn();

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user) );
        await AsyncStorage.setItem('@RNAuth:token', JSON.stringify(response.token) );

        setUser(response.user);
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        setLoading(false);
    }
    async function signOut(): Promise<void> {
        AsyncStorage.clear().then(() => setUser(null) );
    }

    const initialState = {
        signed: !!user,
        user,
        signIn,
        signOut,
        loading
    };


    return (
        <AuthContext.Provider value={initialState}>
            { children }
        </AuthContext.Provider>
    );
}
export default AuthContext;

export function useAuth() {

    const context = useContext(AuthContext);

    return context;
}