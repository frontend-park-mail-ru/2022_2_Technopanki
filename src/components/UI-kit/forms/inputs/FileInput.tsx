import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import DownloadIcon from '../../../../static/icons/Download.svg';
import styles from './input.module.scss';

export default class FileInput extends ReactsComponent<{
    id: string;
    label: string;
    onUpload?: Function;
}> {
    render() {
        return (
            <div className={'w-100'}>
                <label
                    className={
                        'flex row g-12 cursor-pointer justify-content-center align-items-center background-0 border-dashed border-default rounded-md p-40'
                    }
                    for={this.props.id}
                >
                    <div
                        className={'inner-svg-h-24 pt-3'}
                        dangerouslySetInnerHTML={{ __html: DownloadIcon }}
                    ></div>
                    <p>{this.props.label}</p>
                </label>
                <input
                    id={this.props.id}
                    type={'file'}
                    name={this.props.id}
                    className={styles.file_input}
                    onChange={this.props.onUpload}
                />
            </div>
        );
    }
}
