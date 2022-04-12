import instance from "./interceptor";

export const getProfiles = (nextUrl="/api/v1/users?offset=0&count=6") => instance.get(`${nextUrl}`);
export const getPositions = (positions = "/api/v1/positions") => instance.get(positions);
export const getToken = (token = '/api/v1/token') => instance.get(token); 


export const sendRegData = (regData, config, regLink = "/api/v1/users") => instance.post(regLink, regData, config); 
