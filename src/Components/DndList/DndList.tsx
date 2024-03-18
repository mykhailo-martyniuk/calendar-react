import { useRef, useState } from 'react';
import { CSSObject } from 'styled-components';
import dndListUtils from '@/Components/DndList/dndList.utils.ts';
import DndListContainerStyled from '@/Components/DndList/styles/DndListContainer.styled.tsx';

type DndListProps<RecordType> = {
  data: RecordType[];
  keyExtractor: (item: RecordType) => string | number;
  ListItem: (props: React.ComponentProps<'div'> & { item: RecordType }) => JSX.Element;
  containerDataName: string;
  containerDataValue: string;
  styles: CSSObject;
  isItemDraggable: (item: RecordType) => boolean;
  isItemClickable: (item: RecordType) => boolean;
  onDragEnd: (records: RecordType[]) => void;
  onItemClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: RecordType) => void;
  onItemDroppedAnotherDndList: (item: RecordType, date: Date) => void;
};

const DndList = <RecordType,>({
  data,
  keyExtractor,
  ListItem,
  containerDataName,
  containerDataValue,
  isItemDraggable,
  isItemClickable,
  styles,
  onDragEnd,
  onItemClick,
  onItemDroppedAnotherDndList,
}: DndListProps<RecordType>) => {
  const [isDragging, setIsDragging] = useState<number>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const detectLeftBtn = (e: React.PointerEvent<HTMLDivElement>) => {
    e.persist();

    return 'buttons' in e && e.buttons === 1;
  };

  const dragStart = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    if (!containerRef.current || !detectLeftBtn(e)) return;

    setIsDragging(index);

    const container = containerRef.current;
    const items = [...container.childNodes] as HTMLElement[];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter((_, i) => i !== index);
    const dragData = data[index];
    let newData = [...data];

    const dragBoundingRect = dragItem.getBoundingClientRect();

    const space =
      items.length === 1 ? 0 : items[1].getBoundingClientRect().top - items[0].getBoundingClientRect().bottom;

    dragItem.style.position = 'fixed';
    dragItem.style.zIndex = '1000';
    dragItem.style.width = dragBoundingRect.width + 'px';
    dragItem.style.height = dragBoundingRect.height + 'px';
    dragItem.style.top = dragBoundingRect.top + 'px';
    dragItem.style.left = dragBoundingRect.left + 'px';
    dragItem.style.cursor = 'grabbing';

    const div = document.createElement('div');
    div.id = 'div-temp';
    div.style.width = dragBoundingRect.width + 'px';
    div.style.height = dragBoundingRect.height + 'px';
    div.style.pointerEvents = 'none';
    container.appendChild(div);

    const distance = dragBoundingRect.height + space;

    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    const x = e.clientX;
    const y = e.clientY;

    const dragMove = (e: PointerEvent) => {
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      dragItem.style.transform = `translate(${posX}px, ${posY}px)`;

      notDragItems.forEach((item) => {
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        const isOverlapping = rect1.y < rect2.y + rect2.height / 2 && rect1.y + rect1.height / 2 > rect2.y;

        if (isOverlapping) {
          if (item.getAttribute('style')) {
            item.style.transform = '';
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }

          newData = data.filter((item) => keyExtractor(item) !== keyExtractor(dragData));
          newData.splice(index, 0, dragData);
        }
      });
    };
    document.onpointermove = dragMove;

    const dragEnd = () => {
      const overlappingEl = document.elementFromPoint(
        dragItem.getBoundingClientRect().x,
        dragItem.getBoundingClientRect().y
      );
      if (overlappingEl) {
        const containerElement = dndListUtils.findElementWithAttribute(overlappingEl, containerDataName, 3);
        const dataAttributeValue = containerElement?.getAttribute(containerDataName);
        if (dataAttributeValue && dataAttributeValue !== containerDataValue) {
          onItemDroppedAnotherDndList(dragData, new Date(dataAttributeValue));
        }
      }

      document.onpointerup = null;
      document.onpointermove = null;
      setIsDragging(undefined);
      dragItem.style.cssText = '';
      container.removeChild(div);

      items.forEach((item) => (item.style.cssText = ''));

      onDragEnd(newData);
    };
    document.onpointerup = dragEnd;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    const id = setTimeout(() => {
      dragStart(e, index);
      setTimeoutId(null);
    }, 100);
    setTimeoutId(id);
  };

  const handlePointerUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: RecordType) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      onItemClick(event, item);
      setTimeoutId(null);
    }
  };

  return (
    <DndListContainerStyled $styles={styles} ref={containerRef}>
      {data.map((item, index) => (
        <ListItem
          className={isDragging === index ? 'dragging' : ''}
          key={keyExtractor(item)}
          onPointerDown={
            isItemDraggable(item)
              ? (e: React.PointerEvent<HTMLDivElement>) => handlePointerDown(e, index)
              : isItemClickable(item)
                ? (e) => onItemClick(e, item)
                : undefined
          }
          onPointerUp={isItemDraggable(item) ? (e) => handlePointerUp(e, item) : undefined}
          item={item}
        />
      ))}
    </DndListContainerStyled>
  );
};

export default DndList;
