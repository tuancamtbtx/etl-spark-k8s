import { message, Form, Button, Col, Row, Input, Select } from 'antd'
import type { FormProps } from 'antd';
import { DatePicker } from "antd";
import YamlEditor from '../yaml/editor'
const { RangePicker } = DatePicker;

type FieldType = {
    name?: string;
    start?: string;
    manifest?: string;
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
            layout='vertical'
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 1000 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Spark Job Name"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                
                label="Manifset"
                name="manifest"
                rules={[{ required: true, message: 'Please input your START!' }]}
            >
                <YamlEditor yaml={""}/>
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