import { Component } from '../../../../Reacts';
import styles from './header.module.scss';
import MenuIcon from '../../../static/icons/menu.svg';
import Link from '../../Link/Link';
import ModalWindow from '../modalWindow/ModalWindow';
import HeaderProfile from './HeaderProfile';

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
                    <div className={'w-100 background-0 rounded-lg p-32'}>
                        <div
                            key={'items'}
                            id={'links-group'}
                            className={`flex column justify-content-center w-100 g-16`}
                        >
                            {/*TODO переделать на Link в роутере*/}
                            <p
                                key={'item1'}
                                id={'item1'}
                                className={`${styles.item__def} ${styles.item__active}`}
                                onClick={this.setActive}
                            >
                                Вакансии
                            </p>
                            <p
                                key={'item2'}
                                id={'item2'}
                                className={styles.item__def}
                                onClick={this.setActive}
                            >
                                Соискатели
                            </p>
                            <p
                                key={'item3'}
                                id={'item3'}
                                className={styles.item__def}
                                onClick={this.setActive}
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
