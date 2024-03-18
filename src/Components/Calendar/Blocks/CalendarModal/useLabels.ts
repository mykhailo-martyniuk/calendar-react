import { Option } from '@/Components/UI/Form/Select/select.types.ts';
import { useState } from 'react';
import { LabelType, TaskType } from '@/Components/Calendar/calendar.types.ts';

function* numberGenerator(): Generator<number> {
  let count = 1;
  while (true) {
    yield count++;
  }
}

const getUniqueId = numberGenerator();

const useLabels = (allLabels: LabelType[], setup?: TaskType) => {
  const [showSelect, setShowSelect] = useState(false);
  const [createLabelData, setCreateLabelData] = useState<LabelType[]>([]);
  const [labels, setLabels] = useState<LabelType[]>(setup?.labels || []);
  const [deletedLabelsIds, setDeletedLabelsIds] = useState<number[]>([]);
  const [editedLabels, setEditedLabels] = useState<LabelType[]>([]);

  const uniqueLabels = allLabels.filter((obj2) => !labels.some((obj1) => obj1.id === obj2.id));

  const labelOptions: Option[] = uniqueLabels.map((label) => ({
    value: label.id.toString(),
    label: label.title,
  }));

  const handleInputLabelTitle = (id: number, value: string) => {
    const newLabelDataIndex = createLabelData.findIndex((el) => el.id === id);

    if (newLabelDataIndex === -1) return;
    setCreateLabelData((prevState) => {
      prevState[newLabelDataIndex].title = value;
      return [...prevState];
    });
  };

  const closeSelect = () => setShowSelect(false);

  const handleClickAttachLabel = () => {
    setShowSelect(true);
  };

  const handleClickCreateLabel = () => {
    setCreateLabelData((prevState) => [...prevState, { id: getUniqueId.next().value, title: '', color: '' }]);
  };

  const handleClickCloseCreateLabel = (id: number) => {
    setCreateLabelData((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleChangeColor = (id: number, color: string) => {
    const newLabelDataIndex = createLabelData.findIndex((el) => el.id === id);

    if (newLabelDataIndex === -1) return;
    setCreateLabelData((prevState) => {
      prevState[newLabelDataIndex].color = color;
      return [...prevState];
    });
  };

  const handleDetachLabel = (id: number) => {
    setLabels((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleSelect = (option: Option) => {
    const id = parseInt(option.value);
    const newLabel = uniqueLabels.find((el) => el.id === id);
    if (newLabel) {
      setLabels((prevState) => [...prevState, newLabel]);
      setShowSelect(false);
    }
  };

  const handleDeleteLabel = (id: number) => {
    setDeletedLabelsIds((prevState) => [...prevState, id]);
    handleDetachLabel(id);
  };

  const handleEditLabel = (label: LabelType) => {
    setEditedLabels((prevState) => [...prevState, label]);
  };

  const handleEditLabelTitle = (id: number, value: string) => {
    const editedLabelIndex = editedLabels.findIndex((el) => el.id === id);

    if (editedLabelIndex === -1) return;
    setEditedLabels((prevState) => {
      prevState[editedLabelIndex].title = value;
      return [...prevState];
    });
  };

  const handleEditLabelColor = (id: number, color: string) => {
    const editedLabelIndex = editedLabels.findIndex((el) => el.id === id);

    if (editedLabelIndex === -1) return;
    setEditedLabels((prevState) => {
      prevState[editedLabelIndex].color = color;
      return [...prevState];
    });
  };

  return {
    labels,
    createLabelData,
    labelOptions,
    showSelect,
    deletedLabelsIds,
    editedLabels,
    closeSelect,
    handleInputLabelTitle,
    handleClickAttachLabel,
    handleClickCreateLabel,
    handleClickCloseCreateLabel,
    handleChangeColor,
    handleDetachLabel,
    handleSelect,
    handleDeleteLabel,
    handleEditLabel,
    handleEditLabelTitle,
    handleEditLabelColor,
  };
};

export default useLabels;
