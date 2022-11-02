import { Component } from '../../../../../Reacts';
import DownloadIcon from '../../../../static/icons/Download.svg';
import styles from './input.module.scss';

export default class FileInput extends Component<{
    id: string;
    label: string;
    onUpload?: Function;
}> {
    render() {
        return (
            <div className={'w-100'}>
                <label
                    key={'label'}
                    className={
                        'flex row g-12 pointer justify-content-center align-items-center background-0 border-dashed border-default rounded-md p-40'
                    }
                    for={this.props.id}
                >
                    <div
                        key={'icon'}
                        className={'inner-svg-h-24 pt-3'}
                        dangerouslySetInnerHTML={{ __html: DownloadIcon }}
                    ></div>
                    <p key={'text'}>{this.props.label}</p>
                </label>
                <input
                    key={'input'}
                    id={this.props.id}
                    type={'file'}
                    className={styles.file_input}
                    onChange={this.props.onUpload}
                />
            </div>
        );
    }
}
