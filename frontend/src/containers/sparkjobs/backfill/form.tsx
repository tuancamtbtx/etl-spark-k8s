import { message, Form, Button, Col, Row, Input, Select } from 'antd'
import type { FormProps } from 'antd';
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

type FieldType = {
    name?: string;
    start?: string;
    end?: string;
    remember?: string;
  };
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    message.success('Backfill Created Successfully!');
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
const FormBackfill:React.FC = () => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ name: 'ETL JOB'}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
            label="ETL Name"
            name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
            label="Date Range"
            name="start"
            rules={[{ required: true, message: 'Please input your START!' }]}
            >
                <RangePicker/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
    </Form>
    )
}
export default FormBackfill