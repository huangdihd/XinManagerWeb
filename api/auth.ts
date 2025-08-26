import http from "./http";

export async function login(password:string) {
    return http.post('/auth/login', {
        password: password,
    })
}

export async function check() {
    return http.get('/auth/check')
}

export async function logout() {
    return http.post('/auth/logout', {})
}
