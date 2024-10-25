import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Message,
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import { getColumns } from '@/lib/memes/user/constants';
import UserInfo from './info';
import { getUserListAPI } from '@/utils/services/user';
import ContextMenuWrapper from '@/components/ContextMenuWrapper';

function User() {
  const t = useLocale(locale);
  const [userrecord, setuserrecord] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 50,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [Visible, setVisible] = useState(false);
  const [formParams, setFormParams] = useState({});
  const [contextMenuVisible, setContextMenuVisible] = useState(false); //右击开关
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  }); //右击坐标
  const [currentRecord, setCurrentRecord] = useState(null); //右击当前行数据

  // 右键菜单数据
  const menuData = [
    { key: 'open', text: '打开详情' },
    { key: 'copy', text: '复制ID' },
    {
      key: 'more',
      text: '操作到',
      children: [
        { key: 'email', text: '编辑' },
        { key: 'lark', text: '回收站' },
      ],
    },
  ];

  const tableCallback = async (record, type) => {
    if (type === 'view') {
      setuserrecord(record);
      setVisible(!Visible);
    }
    if (type === 'ip_address') {
      setFormParams({ ip_address: record });
    }
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  async function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    const result: any = await getUserListAPI({
      current,
      pageSize,
      ...formParams,
    });
    const { data, total } = result;
    setData(data);
    setPatination({
      ...pagination,
      current,
      pageSize,
      total,
    });
    setLoading(false);
  }

  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    setFormParams(params);
  }

  function handVisible(params: boolean) {
    setVisible(params);
  }

  const handleRowContextMenu = (event, record) => {
    event.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setCurrentRecord(record);
  };

  const handleMenuClick = (key) => {
    Message.info(`点击了 ${key} 菜单项，操作对象是: ${currentRecord.userId}`);
    setContextMenuVisible(false);
  };

  return (
    <>
      <UserInfo onVisible={handVisible} Visible={Visible} info={userrecord} />
      <Card>
        <SearchForm froms={formParams} onSearch={handleSearch} />
        <Table
          rowKey="userId"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
            },
          }}
          onRow={(record) => ({
            onContextMenu: (event) => handleRowContextMenu(event, record),
          })}
          renderPagination={(paginationNode) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Space>
                <span>Selected {selectedRowKeys.length}</span>
                <Button size="mini">拉黑/恢复</Button>
                <Button size="mini">回收/恢复</Button>
              </Space>
              {paginationNode}
            </div>
          )}
        />
      </Card>

      {/* 使用封装的 ContextMenuWrapper */}
      <ContextMenuWrapper
        visible={contextMenuVisible}
        position={contextMenuPosition}
        onMouseLeave={() => setContextMenuVisible(false)}
        menuData={menuData} // 传入菜单数据
        onMenuClick={handleMenuClick} // 处理菜单点击事件
      />
    </>
  );
}

export default User;
