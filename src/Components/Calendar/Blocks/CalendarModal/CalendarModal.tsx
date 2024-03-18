import Modal from '@/Components/UI/Modal/Modal.tsx';
import Input from '@/Components/UI/Form/Input/Input.tsx';
import { useEffect, useState } from 'react';
import { LabelType, TaskType } from '@/Components/Calendar/calendar.types.ts';
import Select from '@/Components/UI/Form/Select/Select.tsx';
import FlexStyled from '@/Components/UI/Styles/Flex.styled';
import ColorPicker from '@/Components/UI/Form/ColorPicker/ColorPicker';
import CloseButton from '@/Components/UI/Butons/CloseButton/CloseButton';
import UiButtonStyled from '@/Components/UI/UiButton/UiButton.styled';
import useLabels from '@/Components/Calendar/Blocks/CalendarModal/useLabels.ts';
import DeleteButton from '@/Components/UI/Butons/DeleteButton/DeleteButton.tsx';
import { Coordinates } from '@/Components/UI/Modal/modal.types.ts';
import EditButton from '@/Components/UI/Butons/EditButton/EditButton.tsx';

type CalendarModalProps = {
  onClose: () => void;
  onSave: (
    title: string,
    labels: LabelType[],
    createdLabels: LabelType[],
    deletedLabelsIds: number[],
    editedLabels: LabelType[]
  ) => void;
  setup?: TaskType;
  allLabels: LabelType[];
  position: Coordinates | undefined;
};

const CalendarModal = ({ onClose, onSave, setup, allLabels, position }: CalendarModalProps) => {
  const [taskTitle, setTaskTitle] = useState(setup?.title);
  const [error, setError] = useState('');

  const handleInputTaskTitle = (value: string) => {
    setTaskTitle(value);
  };

  const {
    labels,
    createLabelData,
    labelOptions,
    showSelect,
    deletedLabelsIds,
    editedLabels,
    closeSelect,
    handleInputLabelTitle,
    handleClickAttachLabel,
    handleDetachLabel,
    handleClickCreateLabel,
    handleClickCloseCreateLabel,
    handleChangeColor,
    handleSelect,
    handleDeleteLabel,
    handleEditLabel,
    handleEditLabelTitle,
    handleEditLabelColor,
  } = useLabels(allLabels, setup);

  const handleSave = () => {
    if (taskTitle) {
      onSave(taskTitle, labels, createLabelData, deletedLabelsIds, editedLabels);
      onClose();
    }
    setError('Min length = 1');
  };

  useEffect(() => {
    if (error && taskTitle && taskTitle.length > 1) setError('');
  }, [taskTitle]);

  return (
    <Modal
      onClose={onClose}
      title={setup ? 'Edit Task' : 'Add Task'}
      height={500}
      width={400}
      position={position}
      footer={
        <UiButtonStyled $variant="primary" onClick={handleSave}>
          Save
        </UiButtonStyled>
      }
    >
      <FlexStyled $direction="column" $gap="10px">
        <Input onChange={handleInputTaskTitle} defaultValue={setup?.title} placeholder="Title" />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {labels.map((label) => (
          <FlexStyled key={label.id}>
            {editedLabels.map((el) => el.id).includes(label.id) ? (
              <FlexStyled $gap="10px">
                <Input
                  placeholder="Label title"
                  defaultValue={label.title}
                  onChange={(value) => handleEditLabelTitle(label.id, value)}
                />
                <ColorPicker defaultColor={label.color} onChange={(color) => handleEditLabelColor(label.id, color)} />
              </FlexStyled>
            ) : (
              <>
                <div style={{ color: label.color }}>{label.title}</div>
                <CloseButton onClick={() => handleDetachLabel(label.id)} />
                <EditButton onClick={() => handleEditLabel(label)} />
                <DeleteButton onClick={() => handleDeleteLabel(label.id)} />
              </>
            )}
          </FlexStyled>
        ))}
        {showSelect && (
          <FlexStyled $gap="10px">
            <Select options={labelOptions} onSelect={handleSelect} placeholder="Select label" isFocus={true} />
            <CloseButton onClick={closeSelect} />
          </FlexStyled>
        )}
        {createLabelData.map((data) => (
          <FlexStyled $gap="10px" key={data.id}>
            <Input placeholder="Label title" onChange={(value) => handleInputLabelTitle(data.id, value)} />
            <ColorPicker onChange={(color) => handleChangeColor(data.id, color)} />
            <CloseButton onClick={() => handleClickCloseCreateLabel(data.id)} />
          </FlexStyled>
        ))}
        <FlexStyled $isEqualChildren $gap="10px">
          {labelOptions.length > 0 && !showSelect && (
            <UiButtonStyled $variant="primary" onClick={handleClickAttachLabel}>
              Add label
            </UiButtonStyled>
          )}
          <UiButtonStyled $variant="primary" onClick={handleClickCreateLabel}>
            New label
          </UiButtonStyled>
        </FlexStyled>
      </FlexStyled>
    </Modal>
  );
};

export default CalendarModal;
