import {URL} from '../Const/Const'

export const loginToServer = async (email: string, password: string) => {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Correo: email, Contrasenia: password})
    })
    return response.json();
}

export const signUpToServer = async (name: string, email: string, password: string) => {
    const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Nombre: name, Correo: email, Contrasenia: password})
    })
    return response.json();
}