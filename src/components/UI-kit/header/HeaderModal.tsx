import { Component } from '../../../../Reacts';
import styles from './header.module.scss';
import MenuIcon from '../../../static/icons/menu.svg';
import ModalWindow from '../modalWindow/ModalWindow';

export default class HeaderModal extends Component {
    render() {
        return (
            <ModalWindow
                key={'navIcon'}
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
                            key={'items'}
                            id={'links-group'}
                            className={`flex column justify-content-center w-100 g-16`}
                        >
                            <p
                                key={'item1'}
                                id={'item1'}
                                className={`${styles.item__def} ${styles.item__active}`}
                            >
                                Вакансии
                            </p>
                            <p
                                key={'item2'}
                                id={'item2'}
                                className={styles.item__def}
                            >
                                Соискатели
                            </p>
                            <p
                                key={'item3'}
                                id={'item3'}
                                className={styles.item__def}
                            >
                                Создать резюме
                            </p>
                        </div>
                    </div>
                }
            />
        );
    }
}
