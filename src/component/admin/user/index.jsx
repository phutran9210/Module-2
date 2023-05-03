import {
  Form,
  Radio,
  Space,
  Switch,
  Table,
  Descriptions,
  Spin,
  Alert,
} from "antd";
import { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchApiDataUser } from "../../../redux/actions";
import {
  fetchUsers,
  updatePartialUser,
} from "../../../redux/actions/userAction";
import "./usersTable.css";
import EditUser from "./EditUser";

import SpinAlert from "../../notification/SpinAlert";
const columns = [
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Tên",
    dataIndex: "nickname",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "status",
  },
  {
    title: "Address",
    dataIndex: "residence",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];
const defaultExpandable = {
  expandedRowRender: (record) => (
    <>
      <Descriptions title="User Info">
        <Descriptions.Item label="Intro">{record.intro}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{record.phone}</Descriptions.Item>
        <Descriptions.Item label="Gender">{record.gender}</Descriptions.Item>
        <Descriptions.Item label="TimeRegister">
          {record.timeRegister}
        </Descriptions.Item>
        <Descriptions.Item label="Role">{record.role}</Descriptions.Item>
        <Descriptions.Item label="PrimaryId">
          {record.primaryId}
        </Descriptions.Item>
      </Descriptions>
    </>
  ),
};

const defaultTitle = () => "Here is title";
const defaultFooter = () => "Here is footer";

const UserTable = () => {
  const [editUser, setEditUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [bordered, setBordered] = useState(false);

  const [size, setSize] = useState("large");
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();
  const [userUpdated, setUserUpdated] = useState(false);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUsers());
    console.log("dang chạy");
    setUserUpdated(false);
  }, [userUpdated]);

  const handleEdit = (record) => {
    setEditUser(record);
    setEditModalVisible(true);
  };
  const handleEditOk = (values) => {
    const userId = editUser.id;

    dispatch(updatePartialUser(userId, values));
    setEditModalVisible(false);
    setUserUpdated(true);
  };
  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleBorderChange = (enable) => {
    setBordered(enable);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };
  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };
  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };
  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };
  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };
  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };
  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = [
    ...columns,
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a>
            <Space>
              More actions
              <DownOutlined />
            </Space>
          </a>
        </Space>
      ),
    },
  ].map((item) => ({
    ...item,
    ellipsis,
  }));

  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps = {
    bordered,

    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };
  return (
    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      >
        <Form.Item label="Bordered">
          <Switch checked={bordered} onChange={handleBorderChange} />
        </Form.Item>

        <Form.Item label="Title">
          <Switch checked={showTitle} onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Column Header">
          <Switch checked={showHeader} onChange={handleHeaderChange} />
        </Form.Item>
        <Form.Item label="Footer">
          <Switch checked={showfooter} onChange={handleFooterChange} />
        </Form.Item>
        <Form.Item label="Expandable">
          <Switch checked={!!expandable} onChange={handleExpandChange} />
        </Form.Item>
        <Form.Item label="Checkbox">
          <Switch
            checked={!!rowSelection}
            onChange={handleRowSelectionChange}
          />
        </Form.Item>
        <Form.Item label="Fixed Header">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item>
        <Form.Item label="Has Data">
          <Switch checked={!!hasData} onChange={handleDataChange} />
        </Form.Item>
        <Form.Item label="Ellipsis">
          <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
        </Form.Item>
        <Form.Item label="Size">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Scroll">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value={undefined}>Unset</Radio.Button>
            <Radio.Button value="scroll">Scroll</Radio.Button>
            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Layout">
          <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
            <Radio.Button value={undefined}>Unset</Radio.Button>
            <Radio.Button value="fixed">Fixed</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Top">
          <Radio.Group
            value={top}
            onChange={(e) => {
              setTop(e.target.value);
            }}
          >
            <Radio.Button value="topLeft">TopLeft</Radio.Button>
            <Radio.Button value="topCenter">TopCenter</Radio.Button>
            <Radio.Button value="topRight">TopRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Bottom">
          <Radio.Group
            value={bottom}
            onChange={(e) => {
              setBottom(e.target.value);
            }}
          >
            <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
            <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
            <Radio.Button value="bottomRight">BottomRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <>
        {loading && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Spin tip="Đang tải dữ liệu người dùng..." />
          </div>
        )}

        <Table
          {...tableProps}
          pagination={{
            position: [top, bottom],
          }}
          columns={tableColumns}
          dataSource={
            hasData ? users.map((user) => ({ ...user, key: user.id })) : []
          }
          scroll={scroll}
        />
        <EditUser
          visible={editModalVisible}
          user={editUser}
          onCancel={handleEditCancel}
          onOk={handleEditOk}
        />
      </>
    </>
  );
};

export default UserTable;
