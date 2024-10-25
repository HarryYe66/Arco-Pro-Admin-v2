import { request } from '@/utils/lib/request';

/** 获取当前的用户 GET /user/currentUser */
export async function ruleAddAPI(params?: any) {
  return request.post('/admin/rule-add', params);
}
export async function ruleEditAPI(params?: any) {
  return request.put('/admin/rule-update', params);
}

export async function ruleListAPI(params: any) {
  return request.post('/admin/rules-list', params);
}
export async function ruleTypeAPI() {
  return request.post('/admin/rules-type-list', {});
}
export async function ruleDelAPI(params: any) {
  return request.delete('/admin/rule-delete', params);
}
