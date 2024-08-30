import { Button, Layout, Table, Modal, notification } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { deleteIssue, getAllIssues, Issue } from "./helpers/issues";
import AddEditIssueModal from "./AddEditIssue";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const { Content } = Layout;

function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [issueOnEdit, setIssueOnEdit] = useState<Issue | null>(null);

  const fetchIssues = async () => {
    setLoading(true);
    const { error, message, data } = await getAllIssues();
    setLoading(false);
    if (error) {
      notification.error({
        message: `Unable to get issues: ${message}`,
      });
      return;
    }
    setIssues(data || []);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const dismissModal = () => {
    setIssueOnEdit(null);
    setShowModal(false);
  };

  const handleDelete = (issue: Issue) => {
    Modal.confirm({
      title: `Are you sure you want to delete: ${issue.title}`,
      onOk: async () => {
        const { error, message } = await deleteIssue(issue.id);
        if (error) {
          notification.error({
            message: `Unable to delete issue: ${message}`,
          });
          return;
        }
        notification.success({
          message: "Issue deleted",
        });
        fetchIssues();
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, record: Issue) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            onClick={() => {
              setIssueOnEdit(record);
              setShowModal(true);
            }}
            type="primary"
          >
            <EditFilled />
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "2rem", minHeight: "100vh" }}>
      <Content>
        <h1>Issues</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem 0",
          }}
        >
          <Button type="primary" onClick={() => setShowModal(true)}>
            New Issue
          </Button>
        </div>
        <Table
          dataSource={issues}
          loading={loading}
          columns={columns}
          locale={{ emptyText: "No issues found" }}
        />

        <AddEditIssueModal
          issueOnEdit={issueOnEdit}
          visible={showModal}
          dismiss={dismissModal}
          refresh={fetchIssues}
        />
      </Content>
    </Layout>
  );
}

export default App;
