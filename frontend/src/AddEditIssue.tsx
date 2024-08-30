import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { createIssue, Issue, updateIssue } from "./helpers/issues";
import { Button, Form, Input, Modal, notification } from "antd";

const { TextArea } = Input;

interface AddEditIssueModalProps {
  issueOnEdit: Issue | null;
  visible: boolean;
  dismiss: () => void;
  refresh: () => void;
}

const blankIssue: Omit<Issue, "id"> = {
  title: "",
  description: "",
};

const AddEditIssueModal: FunctionComponent<AddEditIssueModalProps> = ({
  visible,
  dismiss,
  refresh,
  issueOnEdit,
}) => {
  const [formData, setFormData] = useState({ ...blankIssue });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof Issue, value: unknown) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    setFormData({ ...blankIssue, ...(issueOnEdit || {}) });
  }, [issueOnEdit, visible]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const handler = issueOnEdit
      ? updateIssue({ ...issueOnEdit, ...formData })
      : createIssue({ ...formData });
    setIsSaving(true);
    const { error, message } = await handler;
    setIsSaving(false);
    if (error) {
      notification.error({
        message: `Unable to ${
          issueOnEdit ? "update" : "create"
        } issues: ${message}`,
      });
      return;
    }
    notification.success({
      message: `Issue ${issueOnEdit ? "updated" : "created"}`,
    });
    dismiss();
    refresh();
    return;
  };

  return (
    <Modal open={visible} onCancel={dismiss} footer={null}>
      <h2>{issueOnEdit ? "Update" : "Create"} Issue</h2>
      <form onSubmit={onSubmit}>
        <Form.Item>
          <label>Title</label>
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item>
          <label>Description</label>
          <TextArea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            rows={6}
          />
        </Form.Item>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Button onClick={dismiss}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditIssueModal;
