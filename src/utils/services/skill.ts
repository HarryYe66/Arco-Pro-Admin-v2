import { request } from '@/utils/lib/request';

export async function skillList(params: any) {
  return request.post('/skill/skill-list', params);
}

export async function skillCondition(params: any) {
  return request.get('/skill/skill-prerequisites', params);
}

export async function skillEffect(params: any) {
  return request.get('/skill/skill-effectlist', params);
}
