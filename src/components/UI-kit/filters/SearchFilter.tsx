import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import RangeInput from '../forms/inputs/RangeInput/RangeInput';
import styles from './filter.module.scss'
import CheckBox from '../buttons/Checkbox';

type FilterPropsType = {
    type: string;
    header: string;
    options?: string[];
    rangeMin?: string;
    rangeMax?: string;
}

export default class SearchFilter extends ReactsComponent<{
    filters: FilterPropsType[];
}
> {
    render() {
        return (
            <div className={'flex column g-24'}>
                {this.props.filters.map((filter) => (
                    <div className={'flex column g-12'}>
                        <p>{filter.header}</p>
                        {filter.type === 'toggle' ? (
                            <div className={`flex column g-8 ${styles.filter_body}`}>
                                {filter.options?.map((option) => (
                                    <CheckBox
                                        name={'checkbox'}
                                    >
                                        { option }
                                    </CheckBox>
                                ))}
                            </div>
                        ) : (
                            <RangeInput
                                min={filter.rangeMin}
                                max={filter.rangeMax}
                            />
                        )
                        }
                    </div>
                ))}
            </div>
        )
    }
}