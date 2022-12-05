import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import { ValidationFunc } from '../../../../utils/validation/formValidation';
import DownloadIcon from '../../../../static/icons/Download.svg';
import styles from '../inputs/input.module.scss';

type FormFileInputProps = {
    id: string;
    label: string;
    name: string;
    setError: Function;
    size: '3' | '4' | '6' | '12';
    onUpload?: Function;
    value?: string;
    required?: boolean;
    validation?: ValidationFunc[];
    getValue?: (value: any) => any;
    [key: string]: any;
};

export default class FormFileInput extends ReactsComponent<FormFileInputProps> {
    state = {
        previewSrc: '',
        error: false,
        errorMessage: '',
        drag: false,
    };

    validate = (file: File) => {
        let error = false;
        let errorMessage = '';

        this.props.getValue && this.props.getValue(file);

        if (this.props.validation) {
            this.props.validation.forEach(validate => {
                const [ok, message] = validate(file);
                if (!ok) {
                    error = true;
                    errorMessage = message;
                }
            });
        }

        this.props.setError(error, this.props.name);
        const previewUrl = URL.createObjectURL(file);
        this.props.onUpload && this.props.onUpload(previewUrl);

        this.setState(() => ({
            error,
            errorMessage: errorMessage,
            previewSrc: previewUrl,
        }));
    };

    onDrop = (e: DragEvent) => {
        e.preventDefault();
        // @ts-ignore
        const [file]: [File] = e.dataTransfer.files;
        this.validate(file);
    };

    onUpload = (e: InputEvent) => {
        e.preventDefault();
        // @ts-ignore
        const [file]: [File] = e.target.files;
        this.validate(file);
    };

    render() {
        return (
            <div className={'w-100'}>
                <label
                    className={`flex column g-12 cursor-pointer justify-content-center text-align-center
                    align-items-center border-dashed rounded-md p-40
                    ${this.state.drag ? 'shadow-blue border-blue' : ''}
                    ${
                        this.state.error
                            ? 'color-red border-red background-red'
                            : 'color-500 border-default background-0'
                    }`}
                    for={this.props.id}
                    onDragEnter={() =>
                        this.setState(state => ({ ...state, drag: true }))
                    }
                    onDragLeave={() =>
                        this.setState(state => ({ ...state, drag: false }))
                    }
                    onDragOver={(e: Event) => e.preventDefault()}
                    onDrop={this.onDrop}
                >
                    {this.state.previewSrc ? (
                        <img
                            height={64}
                            width={64}
                            src={this.state.previewSrc}
                        />
                    ) : (
                        <div
                            className={'inner-svg-h-24 pt-3'}
                            dangerouslySetInnerHTML={{ __html: DownloadIcon }}
                        ></div>
                    )}
                    <h6>{this.props.label}</h6>
                    <p className={'font-size-12'}>
                        Поддерживаемые форматы файлов: png, jgp, gif
                        <br />
                        Размер файла не должен превышать 1МБ
                    </p>
                </label>
                <input
                    id={this.props.id}
                    type={'file'}
                    name={this.props.id}
                    className={`none ${styles.file_input}`}
                    onChange={this.onUpload}
                />
            </div>
        );
    }
}
