import { getAccessToken } from '@/utils/lib/cache';
import { PageResult, request } from '@/utils/lib/request';
import { API } from '@/types/typings';

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser(params?: string) {
  const access = params ? params : getAccessToken();

  return request.get<API.CurrentUser>('/admin/currentUser', {
    accessToken: access,
  });
}

/** 登录接口 POST /login/list */
export async function login(body: API.LoginParams) {
  return request.post(`/admin/login`, body);
}

/** 退出登录接口 POST /login/outLogin */
export async function outLogin() {
  return request.get('/login/outLogin', { accessToken: getAccessToken() });
}

export async function getFakeImageCaptcha(params: Partial<API.CaptchaParams>) {
  return request.post('/admin/create/image', params);
}

export async function getFakeSmsCaptcha(params: Partial<API.CaptchaParams>) {
  return request.post('/captcha/create/sms', params);
}

export async function updateUser(params: Partial<API.User>) {
  return request.put('/user/update', params);
}

export async function addUser(params: Partial<API.User>) {
  return request.post('/user/save', params);
}

export async function removeUser(params: { ids: number[] }) {
  return request.delete('/user/delete', params);
}

export async function fetchUserPage(params: {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 任务名称 */
  name?: string;
}) {
  return request.post<PageResult<API.User>>('/admin/user-list', params);
}
