import React, { useContext } from 'react';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Grid,
} from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import {
  ExpType,
  StatusType,
  RrecoverType,
  VerifyType,
} from '../../../lib/memes/user/constants';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearch: (values: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  froms: any;
}) {
  const { lang } = useContext(GlobalContext);

  const t = useLocale(locale);
  const [form] = useForm();
  // console.log(props.froms,'froms')
  if (props.froms['ip_address'] !== undefined) {
    form.setFieldValue('ip_address', props.froms['ip_address']);
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const colSpan = lang === 'zh-CN' ? 12 : 12;

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={t['searchTable.columns.id']} field="id">
              <Input placeholder={t['searchForm.id.placeholder']} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['searchTable.columns.username']} field="name">
              <Input
                allowClear
                placeholder={t['searchForm.name.placeholder']}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t['searchTable.columns.Telegramid']}
              field="Telegramid"
            >
              <Input
                allowClear
                placeholder={t['searchForm.Telegramid.placeholder']}
              />
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
              label={t['searchTable.columns.InvitationCode']}
              field="InvitationCode"
            >
              <Input
                allowClear
                placeholder={t['searchForm.inviter.placeholder']}
              />
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item label={t['searchTable.columns.status']} field="status">
              <Select
                placeholder={t['searchForm.status.placeholder']}
                options={StatusType.map((item, index) => ({
                  label: item,
                  value: index,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item label={t['searchTable.columns.ip']} field="ip_address">
              <Input allowClear placeholder={t['searchForm.ip.placeholder']} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t['searchTable.form.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t['searchTable.form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
