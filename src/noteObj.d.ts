type NoteObj = {
    width: string;
    height: string;
    top: string;
    left: string;
    content: string;
    wrapperHTML: HTMLDivElement;
    textAreaHTML: HTMLTextAreaElement;
    noteIconHTML: HTMLElement;
    trashIconHTML: HTMLElement;
    startContainerHTML?: HTMLElement;
    endContainerHTML?: HTMLElement;
    isEnabled?: boolean;
};
export { NoteObj };
