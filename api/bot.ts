import http from "./http";
import {type BotStatus} from "./BotStatus";
export async function getBots() {
    return http.get<BotStatus[]>('/bots');
}

export async function addBot(url: string, token: string){
    return http.post('/bots/create', {
        url: url,
        token: token,
    })
}

export async function deleteBot(id: number){
    console.log(id);
    return http.delete(`/bots/${id}`);
}

export async function getBot(id: number) {
    return http.get<BotStatus>(`/bots/${id}`);
}
