//  Base backend URL
export const API = "http://localhost:5000";

export async function apiFetch(path, method='GET', token=null, body=null){
  const opts = { method, headers: {} };
  if(token) opts.headers['x-auth-token'] = token;
  if(body){
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(API + path, opts);
  const data = await res.json().catch(()=>null);
  if(!res.ok) throw new Error(data?.msg || 'Request failed');
  return data;
}

export function login(email,password){ return apiFetch('/api/auth/login','POST',null,{email,password}); }
export function register(name,email,password){ return apiFetch('/api/auth/register','POST',null,{name,email,password}); }
export function createMood(token,payload){ return apiFetch('/api/moods','POST',token,payload); }
export function getMoods(token){ return apiFetch('/api/moods','GET',token); }
export function getToday(token){ return apiFetch('/api/moods/today','GET',token); }
