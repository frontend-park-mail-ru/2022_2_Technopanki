import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import RangeInput from '../forms/inputs/RangeInput/RangeInput';
import styles from './filter.module.scss'
import stylesInput from '../forms/inputs/input.module.scss'
import CheckBox from '../buttons/Checkbox';
import ButtonPrimaryBlue from '../buttons/ButtonPrimaryBlue';
import { Input } from 'postcss';

type FilterPropsType = {
    type: string;
    header: string;
    name: string;
    options?: string[];
    rangeMin?: string;
    rangeMax?: string;
}

export default class SearchFilter extends ReactsComponent<{
    filters: FilterPropsType[];
    onSubmit: Function;
}
> {
    render() {
        return (
            <form
                onSubmit={this.props.onSubmit}
            >
                <div className={'flex column g-24'}>
                    {this.props.filters.map((filter) => (
                        <div className={'flex column g-12'}>
                            <p>{filter.header}</p>
                            {filter.type === 'toggle' ? (
                                <div className={`flex column g-8 ${styles.filter_body}`}>
                                    {filter.options?.map((option) => (
                                        <CheckBox
                                            name={filter.name}
                                        >
                                            { option }
                                        </CheckBox>
                                    ))}
                                </div>
                            ) : filter.type === 'range' ? (
                                <RangeInput
                                    min={filter.rangeMin}
                                    max={filter.rangeMax}
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
                            )
                            }
                        </div>
                    ))}
                    <ButtonPrimaryBlue
                        type={'submit'}
                    >
                        Применить
                    </ButtonPrimaryBlue>
                </div>
            </form>
        )
    }
}