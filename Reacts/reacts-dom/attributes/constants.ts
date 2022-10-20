export const events: { [key: string]: keyof HTMLElementEventMap } = {
    // Clipboard Events
    onCopy: 'copy',
    onCut: 'cut',
    onPaste: 'paste',
    // Composition Events
    // TODO
    // Keyboard Events
    onKeyDown: 'keydown',
    onKeyPress: 'keypress',
    onKeyUp: 'keyup',
    // Focus events
    onFocus: 'focus',
    onBlur: 'blur',
    // Form events
    onChange: 'change',
    onInput: 'input',
    onInvalid: 'invalid',
    onReset: 'reset',
    onSubmit: 'submit',
    // Mouse events
    onClick: 'click',
    onContextMenu: 'contextmenu', // right click
    onDoubleClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragEnter: 'dragenter',
    onDragLeave: 'dragleave',
    onDragOver: 'dragover',
    onDragStart: 'dragstart',
    onDrop: 'drop',
    onMouseDown: 'mousedown',
    onMouseEnter: 'mouseenter',
    onMouseLeave: 'mouseleave',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
};

export const attributes: { [key: string]: string } = {
    className: 'class',
    id: 'id',
    lang: 'lang',
    align: 'align',
    dir: 'dir',
    style: 'style',
};
