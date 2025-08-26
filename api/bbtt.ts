import http from "./http";

export async function getbbtt(){
    return http.get('/bbtt')
}

export async function updatebbtt(){
    return http.get('/bbtt/update')
}