import { useState } from 'react';
import { Coordinates } from '@/Components/UI/Modal/modal.types.ts';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState<Coordinates | undefined>();

  return { showModal, modalPosition, setShowModal, setModalPosition };
};

export default useModal;
