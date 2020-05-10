import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './components/dialog';
import './style/index.less';

class Hello extends React.Component {
    render() {
        return (
            <div
                onClick={() => {
                    Dialog.confirm({
                        title: 'hhh'
                    });
                }}
            >
                ssdd
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));
