import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Button,
  Avatar,
  Upload,
  Skeleton,
  Descriptions,
  List,
  Typography,
  Spin,
  Badge,
  Switch,
} from '@arco-design/web-react';

import {
  IconCamera,
  IconPlus,
  IconCaretUp,
  IconCaretDown,
} from '@arco-design/web-react/icon';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import styles from './style/info.module.less';
const { Text } = Typography;

function Info(props: {
  onVisible: (values: boolean) => void;
  Visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
}) {
  const t = useLocale(locale);
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState([]);
  const [ExpData, setExpData] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(<Spin loading={true} />);
  function onAvatarChange(_, file) {
    setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '');
  }

  const loadingImg = (
    <Skeleton
      text={{ rows: 0 }}
      style={{ width: '100px', height: '100px' }}
      animation
    />
  );

  async function fetchData(currentPage: any) {
    setScrollLoading(<Spin loading={true} />);
  }

  async function fetchUserData() {
    setLoading(true);
  }

  async function onStatusChange(res) {}

  async function onRecoverChange(res) {}

  useEffect(() => {
    setExpData([]);
    fetchUserData();
    fetchData(1);
  }, [props.info.badge_id]);

  useEffect(() => {
    setAvatar('https://avatars.githubusercontent.com/u/94030933?v=4');

    // fetchUserData()
  });

  return (
    <div>
      <Drawer
        width={400}
        title={<span>{t['info.title.userinfo']} </span>}
        visible={props.Visible}
        className={styles['arco-drawer-body']}
        footer={null}
        onCancel={() => {
          props.onVisible(false);
        }}
      >
        <div className={styles['info-avatar']}>
          <Upload showUploadList={false} onChange={onAvatarChange}>
            {loading ? (
              loadingImg
            ) : (
              <Avatar
                size={100}
                triggerIcon={<IconCamera />}
                className={styles['info-avatar']}
              >
                {avatar ? <img src={avatar} /> : <IconPlus />}
              </Avatar>
            )}
          </Upload>
          <div className={styles['info-username']}>
            <Text copyable>{props.info.uname}</Text>
          </div>
        </div>
        <div className={styles['info-descriptions']}>
          <Descriptions
            column={1}
            data={UserData}
            style={{ marginBottom: 20 }}
            labelStyle={{ paddingRight: 36 }}
          />
        </div>
        {/* <div className={styles['info-exp-list']}>
  
        </div> */}
        <div className={styles['info-exp-list']}>
          <div>经验值记录</div>
          <List
            style={{ width: 600, maxHeight: 320 }}
            dataSource={ExpData}
            scrollLoading={scrollLoading}
            onReachBottom={(currentPage) => fetchData(currentPage)}
            render={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  // avatar={<Avatar shape="square">A</Avatar>}
                  avatar={
                    item.type === 1 ? (
                      <Avatar shape="square">+</Avatar>
                    ) : (
                      <Avatar shape="square">-</Avatar>
                    )
                  }
                  // title={item.exp + ' exp'}
                  title={
                    item.type === 1 ? (
                      <span>
                        {item.exp + ' exp'}
                        <IconCaretUp
                          style={{ fontSize: 18, color: 'rgb(var(--green-6))' }}
                        />
                      </span>
                    ) : (
                      <span>
                        {item.exp + ' exp'}
                        <IconCaretDown
                          style={{ fontSize: 18, color: 'rgb(var(--red-6))' }}
                        />
                      </span>
                    )
                  }
                  description={
                    item.at === 0
                      ? '系统添加 ' + item.time
                      : item.at === 1
                      ? '邀请奖励 ' + item.time
                      : '签到奖励 ' + item.time
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default Info;
