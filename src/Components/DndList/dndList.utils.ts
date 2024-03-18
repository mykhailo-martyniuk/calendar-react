const dndListUtils = {
  findElementWithAttribute(
    element: Element,
    attributeName: string,
    maxDepth: number
  ): HTMLElement | Element | undefined {
    let currentEl: Element | null | undefined = element;
    for (let i = 0; i <= maxDepth; i++) {
      if (currentEl?.getAttribute(attributeName)) return currentEl;
      currentEl = currentEl?.parentElement;
    }
  },
};

export default dndListUtils;
