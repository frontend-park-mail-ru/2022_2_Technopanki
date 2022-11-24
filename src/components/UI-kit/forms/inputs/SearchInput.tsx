import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './input.module.scss';
import Loupe from '../../../../static/icons/loupe.svg';
import SearchArrow from '../../../../static/icons/search_arrow.svg';
import Line from '../../../../static/icons/search_line.svg';
import ButtonSearchBlue from '../../buttons/ButtonSearchBlue';

export default class SearchInput extends ReactsComponent {
    render() {
        return (
            <form className={'flex column relative screen-responsive'}>
                <div className={'relative'}>
                    <input
                        className={`w-100 absolute ${styles.input}`}
                        type={'text'}
                        placeholder={'Поиск...'}
                    />
                    <div className={`absolute flex row ${styles.menu}`}>
                        <div className={'flex row g-8'}>
                            <p className={`cursor-pointer ${styles.menu_data}`}>
                                Вакансии
                            </p>
                            <div
                                className={`cursor-pointer ${styles.search_arrow}`}
                                dangerouslySetInnerHTML={{ __html: SearchArrow }}
                            />
                        </div>
                        <div className={`${styles.search_line} ${styles.menu_data}`}
                             dangerouslySetInnerHTML={{ __html: Line }}
                        />
                        <div
                            className={`cursor-pointer ${styles.icon}`}
                            dangerouslySetInnerHTML={{ __html: Loupe }}
                        />
                    </div>
                    <div className={`absolute pt-4 r-0-4`}>
                        <ButtonSearchBlue>
                            Найти
                        </ButtonSearchBlue>
                    </div>
                </div>
            </form>
        );
    }
}
