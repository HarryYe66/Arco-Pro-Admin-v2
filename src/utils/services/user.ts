import { request } from '@/utils/lib/request';

/** 获取当前的用户 GET /user/currentUser */
export async function languageListAPI(params?: any) {
  return request.post('/telegram/locale/list', params);
}
export async function replyListAPI(params?: any) {
  return request.post('/telegram/replytriggers/list', params);
}
export async function enableLanguageAPI(params?: any) {
  return request.post('/telegram/locale/openlist', params);
}
export async function addReplyTriggerAPI(params?: any) {
  return request.post('/telegram/replytriggers/add', params);
}

export async function delReplyTriggerAPI(params?: any) {
  return request.post('/telegram/replytriggers/del', params);
}

export async function updateReplyTriggerAPI(params?: any) {
  return request.post('/telegram/replytriggers/update', params);
}

export async function ruleListAPI(params: any) {
  return request.post('/admin/rules-list', params);
}
export async function ruleDelAPI(params: any) {
  return request.delete('/admin/rule-delete', params);
}

export async function getUserListAPI(params: any) {
  return request.post('/admin/user/user-list', params);
}
