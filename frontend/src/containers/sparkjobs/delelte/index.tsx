import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Remove: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button danger onClick={showModal}>
        Remove
      </Button>
      <Modal title="Confirm Remove" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to remove it?</p>
      </Modal>
    </>
  );
};

export default Remove;