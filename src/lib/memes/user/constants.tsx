import React from 'react';
import {
  Button,
  Avatar,
  Typography,
  Badge,
  Link,
  Switch,
  Popover,
  Space,
} from '@arco-design/web-react';
import ContextMenu from '@arco-materials/context-menu';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import { convertTimestampToDate, getFirstLetter } from '@/utils/System';
const { Text } = Typography;

export const ExpType = ['正常', '升序', '降序'];
export const StatusType = ['正常', '拉黑'];
export const RrecoverType = ['正常', '拉黑'];
export const VerifyType = ['默认', '验证成功', '验证失败'];

export const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t['searchTable.columns.id'],
      dataIndex: 'userId',
      align: 'center' as const, // 确保符合ColumnProps的align属性类型
      render: (_, value) => {
        return (
          <Space>
            <Avatar size={32}>
              {value.avater_url ? (
                <img alt="avatar" src={value.avater_url} />
              ) : (
                <Text bold>{getFirstLetter(value.nickname)}</Text>
              )}
            </Avatar>
            <Badge status="success" text={value.userId}></Badge>
          </Space>
        );
      },
    },

    {
      title: t['searchTable.columns.username'],
      dataIndex: 'nickname',
      render: (value) => value,
    },
    {
      title: t['searchTable.columns.Telegramid'],
      dataIndex: 'telegramId',
      render: (value) => {
        if (value === null) {
          return <Badge text={t['searchTable.columns.verifynull']}></Badge>;
        } else {
          return <Text>{value}</Text>;
        }
      },
    },

    {
      title: t['searchTable.columns.TwitterId'],
      dataIndex: 'twitterId',
      render: (value) => {
        return <Text>{value}</Text>;
      },
    },

    {
      title: t['searchTable.columns.status'],
      dataIndex: 'status',
      render: (value) => {
        return (
          <Switch
            checked={!value}
            checkedText="正常"
            uncheckedText="拉黑"
            type="round"
          />
        );
      },
    },

    {
      title: t['searchTable.columns.ip'],
      dataIndex: 'ip_address',

      render: (_, record) => {
        // return x;
        let StatusLevel: 'success' | 'warning' | 'error' = 'success';
        let NewConunt = record.ip_count;
        if (
          record.ip_count == 0 ||
          record.ip_count === undefined ||
          record.ip_count === null
        ) {
          StatusLevel = 'success';
        }
        if (record.ip_count >= 1 && record.ip_count < 15) {
          StatusLevel = 'success';
        } else if (record.ip_count >= 10 && record.ip_count < 99) {
          StatusLevel = 'warning';
        } else {
          NewConunt = '99+';
          StatusLevel = 'error';
        }
        return (
          <Popover
            content={
              <span>
                <p>
                  检测到：
                  <Link
                    hoverable={false}
                    status={StatusLevel}
                    onClick={() => callback(record.ip_address, 'ip_address')}
                  >
                    ({record.ip_count})
                  </Link>
                  个相同IP
                </p>
              </span>
            }
          >
            <Space>
              {record.ip_address === null ? (
                <Badge text={t['searchTable.columns.verifynull']}></Badge>
              ) : (
                <Space>
                  <Badge status={StatusLevel} text={record.ip_address}></Badge>
                  <Link
                    hoverable={false}
                    status={StatusLevel}
                    onClick={() => callback(record.ip_address, 'ip_address')}
                  >
                    {' '}
                    ({NewConunt}){' '}
                  </Link>
                </Space>
              )}
            </Space>
          </Popover>
        );
      },
    },
    {
      title: 'os',
      dataIndex: 'os',
      render: (_, record) => {
        if (
          record.os === null ||
          record.os === undefined ||
          record.os === 'null'
        ) {
          return <Badge text={t['searchTable.columns.error']}></Badge>;
        }
        return <Text>{record.os}</Text>;
      },
    },
    {
      title: t['searchTable.columns.Balance'],
      dataIndex: 'gold',
      render: (_, record) => <Text>{record.gold}</Text>,
    },

    {
      title: t['searchTable.columns.createTime'],
      dataIndex: 'create_time',
      render: (_, record) => {
        console.log('record.time');
        return convertTimestampToDate(record.create_time);
      },
    },
  ];
}
