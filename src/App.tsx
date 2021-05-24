import { Button, Image, Form, Upload } from 'antd';
import { useState } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
function App() {
  const [imgSrc, setimgSrc] = useState(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  );

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Image width={200} src={imgSrc} />
      <Button>123</Button>

      <Form>
        <Form.Item>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <HeartTwoTone twoToneColor="#eb2f96" />
              </p>
              <p className="ant-upload-text">点击该区域上传图片</p>
              <p className="ant-upload-hint">支持拖动上传</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>7</Button>
    </div>
  );
}

export default App;
