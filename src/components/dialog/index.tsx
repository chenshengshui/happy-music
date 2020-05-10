import React, { Component } from 'react';
import { createPortal, render } from 'react-dom';
import './style.less';

class Index extends Component<IProps> {
    node: HTMLElement;

    constructor(props: IProps) {
        super(props);
    }

    static confirm(props: IProps) {
        const container = document.createElement('div');
        document.body.appendChild(container);
        render(<Index getPopupContainer={() => container} {...props} />, container);
    }

    render() {
        const { title, getPopupContainer = () => document.body } = this.props;
        return createPortal(<div styleName="dialog">{title}</div>, getPopupContainer());
    }
}

interface IProps {
    title: string;
    getPopupContainer?: () => HTMLElement;
}

export default Index;
