import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
  Message,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser, IconLoop } from '@arco-design/web-react/icon';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import axios from 'axios';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { generateUUID } from '@/utils/lib/utils';
import { currentUser, login } from '@/utils/services/api';
import { getFakeImageCaptcha } from '@/utils/services/api';
import { getAccessToken, setAccessToken } from '@/utils/lib/cache';
const deviceId = generateUUID();

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      const newparams = {
        username: params.username,
        password: params.password,
      };
      setLoginParams(JSON.stringify(newparams));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = '/';
  }

  async function loginHandler(params) {
    setErrorMessage('');
    setLoading(true);

    try {
      const response: any = await login({
        ...params,
        deviceId,
        type: 'account',
      });
      console.log(response, 'response11');

      if (response) {
        // 登录成功处理逻辑
        setAccessToken(response.accessToken);
        const user = await currentUser();
        if (user) {
          Message.success('登录成功！');
          afterLoginSuccess(params);
        }
      }
    } catch (error) {
      setErrorMessage(`登录失败: ${error}`);
      formRef.current.setFieldsValue({ captcha: '' });

      onGetImageCaptcha(); // 登录失败时刷新验证码
    } finally {
      setLoading(false);
    }
  }

  function onSubmitClick() {
    formRef.current
      .validate()
      .then((values) => {
        console.log(values, 'values');

        loginHandler(values); // 调用登录方法
      })
      .catch((error) => {
        // 捕获验证错误并设置错误信息
        setErrorMessage('表单验证失败，请检查输入内容。');
      });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  const onGetImageCaptcha = useCallback(async () => {
    try {
      const result: any = await getFakeImageCaptcha({ deviceId });

      if (result) setImageUrl(result);
    } catch (error) {
      Message.error(`获取验证码失败:${error}`);
    }
  }, [deviceId]);

  useEffect(() => {
    onGetImageCaptcha();
  }, []);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {t['login.form.title']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="username"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="captcha"
          rules={[{ required: true, message: '请输入验证码!' }]}
        >
          <Input
            prefix={<IconLoop />}
            placeholder="验证码"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size="large"
            style={{ padding: 0 }}
            onClick={onGetImageCaptcha}
          >
            <div style={{ verticalAlign: 'middle' }}>
              <div
                style={{ padding: '4px' }}
                dangerouslySetInnerHTML={{ __html: imageUrl }}
              />
            </div>
          </Button>
        </div>

        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
          >
            {t['login.form.register']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
