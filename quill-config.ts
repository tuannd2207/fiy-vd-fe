import { Component } from '@angular/core';
import Quill from 'quill';

// --- BẮT ĐẦU PHẦN TÙY CHỈNH QUILL ---

const Inline = Quill.import('blots/inline') as any;

class BoldBlot extends Inline {
    static blotName = 'bold';
    static tagName = 'span';

    static create() {
        const node = super.create();
        node.style.fontWeight = 'bold';
        return node;
    }

    static formats(domNode: HTMLElement) {
        return domNode.style.fontWeight === 'bold';
    }
}

class ItalicBlot extends Inline {
    static blotName = 'italic';
    static tagName = 'span';

    static create() {
        const node = super.create();
        node.style.fontStyle = 'italic';
        return node;
    }

    static formats(domNode: HTMLElement) {
        return domNode.style.fontStyle === 'italic';
    }
}

export { ItalicBlot, BoldBlot };
