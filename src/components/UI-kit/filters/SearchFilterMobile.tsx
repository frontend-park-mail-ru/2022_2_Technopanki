import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import ButtonPrimaryBigBlue from '../buttons/ButtonPrimaryBigBlue';
import styles from './filter.module.scss';
import { FilterPropsType } from './SearchFilter';
import CheckBox from '../buttons/Checkbox';
import RangeInput from '../forms/inputs/RangeInput/RangeInput';
import stylesInput from '../forms/inputs/input.module.scss';
import ButtonPrimaryBlue from '../buttons/ButtonPrimaryBlue';
import FilterIcon from '../../../static/icons/filter.svg';
import Svg from '../../Svg';

export default class SearchFilterMobile extends ReactsComponent<
    {
        filters: FilterPropsType[];
        onSubmit: Function;
    },
    { isOpen: boolean }
> {
    state = {
        isOpen: false,
    };

    toggle() {
        this.setState(state => ({ isOpen: !state.isOpen }));
    }

    render() {
        return (
            <div className={'flex column justify-content-end'}>
                <button
                    onClick={this.toggle.bind(this)}
                    className={styles['filter-button__mobile']}
                >
                    <Svg src={FilterIcon} height={24} />
                    <p>Фильтры</p>
                </button>
                <div
                    className={`${this.state.isOpen ? 'flex' : 'none'} ${
                        styles['filter-modal']
                    } align-items-end`}
                    onClick={this.toggle.bind(this)}
                >
                    <div
                        className={`screen-responsive w-100vw ${styles['modal']}`}
                    >
                        <h4 className={'mb-16'}>Фильтры</h4>
                        <form
                            className={'flex column g-24'}
                            onClick={(e: MouseEvent) => e.stopPropagation()}
                            onSubmit={(e: SubmitEvent) => {
                                this.toggle();
                                this.props.onSubmit(e);
                            }}
                        >
                            {this.props.filters.map(filter => (
                                <div className={'flex column g-12'}>
                                    <p>{filter.header}</p>
                                    {filter.type === 'toggle' ? (
                                        <div
                                            className={`flex column g-8 ${styles.filter_body}`}
                                        >
                                            {filter.options?.map(option => (
                                                <CheckBox name={filter.name}>
                                                    {option}
                                                </CheckBox>
                                            ))}
                                        </div>
                                    ) : filter.type === 'range' ? (
                                        <RangeInput
                                            min={filter.rangeMin as string}
                                            max={filter.rangeMax as string}
                                            name={filter.name}
                                        />
                                    ) : (
                                        <input
                                            className={`${stylesInput.input} ${styles.filter_input}`}
                                            id={filter.name}
                                            type={'text'}
                                            placeholder={filter.header}
                                            name={filter.name}
                                        />
                                    )}
                                </div>
                            ))}
                            <ButtonPrimaryBlue type={'submit'}>
                                Применить
                            </ButtonPrimaryBlue>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
