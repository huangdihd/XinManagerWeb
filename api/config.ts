/*
 *   Copyright (C) 2025 huangdihd
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import http from "./http";

export interface Config {
    bbtt_fetch_interval: number;
    bots_fetch_interval: number;
}

export async function getConfig() {
    return http.get('/config');
}

export async function patchBbttFetchInterval(value: number) {
    return http.patch('/config/bbtt_fetch_interval', {
        value
    });
}

export async function patchBotsFetchInterval(value: number) {
    return http.patch('/config/bots_fetch_interval', {
        value
    });
}

export async function resetConfig() {
    return http.get('/config/reset');
}
