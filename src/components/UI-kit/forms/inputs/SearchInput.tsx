import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './input.module.scss';
import Loupe from '../../../../static/icons/loupe.svg';
import SearchArrow from '../../../../static/icons/search_arrow.svg';
import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';

export default class SearchInput extends ReactsComponent {
    render() {
        return (
            <form className={'flex column relative'}>
                <input
                    className={`w-100 ${styles.input} ${styles.icon_cursor} ${styles.search_input}`}
                    type={'text'}
                    placeholder={'Поиск...'}
                />
                <div
                    className={`absolute ${styles.icon}`}
                    dangerouslySetInnerHTML={{ __html: Loupe }}
                />
                <div className={`absolute flex row g-16 ${styles.menu}`}>
                    <p className={styles.menu_data}>|</p>
                    <p className={`cursor-pointer ${styles.menu_data}`}>
                        Вакансии
                    </p>
                    <div
                        className={`cursor-pointer ${styles.search_arrow}`}
                        dangerouslySetInnerHTML={{ __html: SearchArrow }}
                    />
                </div>
                <div
                    className={`absolute w-100 flex row justify-content-space-between ${styles.search_input}`}
                ></div>
            </form>
        );
    }
}
