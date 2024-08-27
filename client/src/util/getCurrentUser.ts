import { jwtDecode } from 'jwt-decode'

export default function getCurrentUser() {
    const token = localStorage.getItem('jwt')
    if (token) return jwtDecode<{
        id: string,
        verified: boolean
    }>(token)
}