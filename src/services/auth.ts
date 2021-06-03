
export function signIn(): Promise<any> {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve({
                token: 'ksfdpkfopsdkfopksdopfksodpkfposdkfopskpfokdopskfopskfopskdpf',
                user: {
                    name: 'Neverson',
                    email: 'neversonbs13@gmail.com'
                }
            })
        }, 2000);
    })
}