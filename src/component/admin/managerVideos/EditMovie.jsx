import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
const EditMovie = ({ visible, currentMovie, onCancel, onOk }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentMovie);
  }, [currentMovie, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <Modal
      open={visible}
      title="Chỉnh sửa thông tin phim"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="Title"
          label="Tên phim"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Videos"
          label="Link phim"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="VideoURL"
          label="Trailer"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        {/* Thêm các Form.Item khác ở đây nếu bạn muốn chỉnh sửa chúng */}
      </Form>
    </Modal>
  );
};

export default EditMovie;
