import styles from './header.module.scss';
import MenuIcon from '../../../static/icons/menu.svg';
import ModalWindow from '../modalWindow/ModalWindow';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class HeaderModal extends ReactsComponent {
    render() {
        return (
            <ModalWindow
                content={
                    <div
                        className={`flex g-24 w-100 justify-content-end ${styles.menu_icon}`}
                        dangerouslySetInnerHTML={{
                            __html: MenuIcon,
                        }}
                    ></div>
                }
                hidden={
                    <div className={'flex w-100 background-0 rounded-lg p-32'}>
                        <div
                            id={'links-group'}
                            className={`flex column justify-content-center w-100 g-16`}
                        >
                            <p
                                id={'item1'}
                                className={`${styles.item__def} ${styles.item__active}`}
                            >
                                Вакансии
                            </p>
                            <p id={'item2'} className={styles.item__def}>
                                Соискатели
                            </p>
                            <p id={'item3'} className={styles.item__def}>
                                Создать резюме
                            </p>
                        </div>
                    </div>
                }
            />
        );
    }
}
