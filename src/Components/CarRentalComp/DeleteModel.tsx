import { Modal } from "antd";
import React from "react";

interface Props {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
    onDeleteHandle: (packageItem: any) => void;
    packageItem: any;
}

const DeleteModel: React.FC<Props> = ({isDeleteModalOpen, onDeleteHandle, setIsDeleteModalOpen, packageItem}) => {
  return (
    <div>
      <Modal
        title="Delete Car"
        centered
        open={isDeleteModalOpen}
        onOk={() => onDeleteHandle(packageItem)}
        onCancel={() => setIsDeleteModalOpen(false)}
        width={600}
      >
        <p className="text-red-500">
          Are you sure? All the bookings of this car will also be deleted.
        </p>
      </Modal>
    </div>
  );
};

export default DeleteModel;
