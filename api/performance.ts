import http from "./http";

export async function getPerformance() {
    return http.get('/performance');
}
