import { request } from '@/utils/lib/request';

//获取支付代币列表
export async function getPayTokenlist(params?: any) {
  return request.post('/pay/admin/pay-list', params);
}

//获取商品列表
export async function getPayGoodslist(params?: any) {
  return request.post('/pay/admin/goods-list', params);
}

//获取商品列表
export async function editGoods(params?: any) {
  return request.post('/pay/admin/goods-edit', params);
}

//获取商品列表
export async function creatGoods(params?: any) {
  return request.post('/pay/admin/goods-create', params);
}

//获取订单列表
export async function getPayOrderslist(params?: any) {
  return request.post('/pay/admin/orders-list', params);
}
