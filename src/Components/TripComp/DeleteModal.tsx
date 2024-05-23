import { Modal } from "antd";
import React from "react";

interface Props {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
    onDeleteHandle: (trip_id: any) => void;
    trip_id: any;
}

const DeleteModal: React.FC<Props> = ({isDeleteModalOpen, onDeleteHandle, setIsDeleteModalOpen, trip_id}) => {
  return (
    <div>
      <Modal
        title="Delete Trip"
        centered
        open={isDeleteModalOpen}
        onOk={() => onDeleteHandle(trip_id)}
        onCancel={() => setIsDeleteModalOpen(false)}
        width={600}
      >
        <p className="text-red-500">
          Are you sure? All the trips related to this package will also be deleted.
        </p>
      </Modal>
    </div>
  );
};

export default DeleteModal;
