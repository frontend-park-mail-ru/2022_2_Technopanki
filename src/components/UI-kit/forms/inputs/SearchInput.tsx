import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './input.module.scss';
import Loupe from '../../../../static/icons/loupe.svg';
import SearchArrow from '../../../../static/icons/search_arrow.svg';
import SearchArrowUp from '../../../../static/icons/search_arrow_up.svg';
import Line from '../../../../static/icons/search_line.svg';
import ButtonSearchBlue from '../../buttons/ButtonSearchBlue';
import Dropdown from '../../dropdown/Dropdown';
import DropdownMenu from './SearchDropdownMenu';

export default class SearchInput extends ReactsComponent<
    {
        onSubmitSearch: Function;
        onSwitch: Function;
    },
    { isOpen: boolean }
> {
    state = {
        isOpen: false,
    };

    options = ['Вакансии', 'Соискатели', 'Работодатели', 'Должности'];

    handleMenu = () => {
        this.setState(state => ({
            ...state,
            isOpen: !this.state.isOpen,
        }));
    };

    closeMenu = (e: MouseEvent) => {
        this.props.onSwitch(e);
        this.handleMenu();
    };

    componentDidUpdate() {
        console.log('update input');
    }

    render() {
        return (
            <div className={`flex column relative ${styles.form}`}>
                <form onSubmit={this.props.onSubmitSearch}>
                    <div className={'relative'}>
                        <input
                            id={'search'}
                            className={`w-100 absolute l-220 ${styles.input} ${styles.search_input}`}
                            type={'text'}
                            placeholder={'Поиск...'}
                        />
                        <DropdownMenu
                            hidden={
                                <div
                                    className={`flex hidden column g-0 background-0 rounded-md shadow-md ${styles.dropdown}`}
                                >
                                    <div
                                        className={
                                            'flex row border-tb-light align-items-center justify-content-space-between p-4'
                                        }
                                    >
                                        <div className={'flex column'}>
                                            {this.options.map(option => (
                                                <p
                                                    className={`transition-fast ${styles.dropdown_options}`}
                                                    onClick={this.closeMenu}
                                                >
                                                    {option}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                            content={
                                <div
                                    className={`absolute flex row ${styles.menu}`}
                                >
                                    <div
                                        className={'flex row g-8'}
                                        onClick={this.handleMenu}
                                    >
                                        <p
                                            id={'searchOption'}
                                            className={`cursor-pointer ${styles.menu_data}`}
                                        >
                                            Вакансии
                                        </p>
                                        {this.state.isOpen ? (
                                            <div
                                                className={`cursor-pointer ${styles.search_arrow}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: SearchArrowUp,
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className={`cursor-pointer ${styles.search_arrow}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: SearchArrow,
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`${styles.search_line} ${styles.menu_data}`}
                                        dangerouslySetInnerHTML={{
                                            __html: Line,
                                        }}
                                    />
                                    <div
                                        className={`cursor-pointer ${styles.icon}`}
                                        dangerouslySetInnerHTML={{
                                            __html: Loupe,
                                        }}
                                    />
                                </div>
                            }
                            direction={'left'}
                            mt={'50'}
                            isOpen={this.state.isOpen}
                        />
                        <div
                            className={`absolute r-0-4 ${styles.search_button}`}
                        >
                            <ButtonSearchBlue type={'submit'}>
                                Найти
                            </ButtonSearchBlue>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
