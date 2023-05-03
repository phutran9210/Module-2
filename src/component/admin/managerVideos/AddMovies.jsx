import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Switch,
  Select,
} from "antd";
import PreviewComponent from "./PreviewComponent";
import { useEffect, useState } from "react";
import MultipleUpload from "../../uploadForm/MultipleUpload";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../../redux/actions";
const { Option } = Select;

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const AddMovies = () => {
  // const [posters, setPosters] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const dispatch = useDispatch();
  const dataMovie = useSelector((state) => state.apiData.data);
  const handleReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    dispatch(fetchApiData());
  }, []);

  const handlePreview = () => {
    const values = form.getFieldsValue();
    console.log("Preview values:", values);
    setPreviewData(values);
    setPreviewVisible(true);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handleChange = ({ fileList: newFileList, base64 }) => {
    setFileList(newFileList);
  };
  // useEffect(() => {
  //   console.log(posters);
  // }, [posters]);
  useEffect(() => {
    form.setFieldsValue({ Videos: [""] });
    form.setFieldsValue({ Images: [""] });
  }, [form]);

  const handleFinish = (values) => {
    console.log("Form data: ", values);
  };
  return (
    <>
      <Form
        onFinish={handleFinish}
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        validateMessages={validateMessages}
        style={{
          maxWidth: "100%",
        }}
      >
        <Form.Item
          label="Tên phim"
          name="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Năm sản xuất" name="Year">
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item label="Phát hành" name="Released">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Kiểm duyệt" name="Rated">
          <Input />
        </Form.Item>
        <Form.Item label="Thời lượng phim" name="Runtime">
          <Input />
        </Form.Item>
        <Form.Item label="Diễn viên" name="Actors">
          <Input />
        </Form.Item>
        <Form.Item label="Đạo diễn" name="Director">
          <Input />
        </Form.Item>
        <Form.Item label="Kịch bản" name="Writer">
          <Input />
        </Form.Item>
        {/* <Form.Item label="Thể loại" name="Genre">
          <Input />
        </Form.Item> */}
        <Form.Item label="Thể loại" name="Genre">
          <Select
            mode="tags"
            showSearch
            placeholder="Chọn thể loại"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            tokenSeparators={[","]}
          >
            <Option value="action">Hành động</Option>
            <Option value="comedy">Hài hước</Option>
            <Option value="drama">Tâm lý</Option>
            <Option value="horror">Kinh dị</Option>
            <Option value="sci-fi">Khoa học viễn tưởng</Option>
            <Option value="romance">Lãng mạn</Option>
            <Option value="documentary">Tài liệu</Option>
            <Option value="animation">Hoạt hình</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ngôn Ngữ" name="Language">
          <Input />
        </Form.Item>
        <Form.Item label="Quốc gia" name="Country">
          <Input />
        </Form.Item>
        <Form.Item label="Giải thưởng" name="Awards">
          <Input />
        </Form.Item>
        <Form.Item label="Ảnh Poster" name="PosterInput">
          <Input />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <MultipleUpload fileList={fileList} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Video Trailer" name="VideoURL">
          <Input />
        </Form.Item>
        {/* <Form.Item label="Link phim" name="Video">
          <Input />
        </Form.Item> */}
        <Form.List name="Videos">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={`Link phim ${index + 1}`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Input placeholder="Nhập link phim" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button
                      type="link"
                      onClick={() => remove(field.name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Xóa
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm link phim
                  </Button>
                </Form.Item>
              </div>
            </>
          )}
        </Form.List>
        <Form.Item label="Số tập" name="NumberOfFilm">
          <InputNumber />
        </Form.Item>
        <Form.Item valuePropName="checked" label="Hiển thị" name="isVisible">
          <Switch />
        </Form.Item>

        <Form.Item
          label="ID phim (imdbID)"
          name="imdbID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả phim" name="Plot">
          <TextArea rows={8} />
        </Form.Item>
        {/* <Form.Item label="Ảnh trong phim" name="Images">
          <Input />
        </Form.Item> */}
        <Form.List name="Images">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={`Ảnh trong phim ${index + 1}`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Input placeholder="Nhập ảnh phim" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button
                      type="link"
                      onClick={() => remove(field.name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Xóa
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm ảnh phim
                  </Button>
                </Form.Item>
              </div>
            </>
          )}
        </Form.List>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button onClick={handleFinish} type="primary" htmlType="submit">
            Đồng ý
          </Button>
          <Button onClick={handleReset} style={{ marginRight: "10px" }}>
            Reset
          </Button>
          <Button onClick={handlePreview} style={{ marginLeft: "10px" }}>
            Preview
          </Button>
        </Form.Item>
      </Form>
      <PreviewComponent
        data={previewData}
        visible={previewVisible}
        onCancel={handleCancel}
      />
    </>
  );
};
export default AddMovies;
