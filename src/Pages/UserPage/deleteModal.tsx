import { Modal } from "antd";
import React from "react";

interface Props {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
  onDeleteHandle: (item: any) => void;
  item: any;
}

const DeleteModal: React.FC<Props> = ({
  isDeleteModalOpen,
  onDeleteHandle,
  setIsDeleteModalOpen,
  item,
}) => {
  return (
    <div>
      <Modal
        title="Delete User"
        centered
        open={isDeleteModalOpen}
        onOk={() => onDeleteHandle(item)}
        onCancel={() => setIsDeleteModalOpen(false)}
        width={600}
      >
        <p className="text-red-500">
          Are you sure you want to delete this user?
        </p>
      </Modal>
    </div>
  );
};

export default DeleteModal;
