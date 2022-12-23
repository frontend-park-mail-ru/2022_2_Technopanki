import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './input.module.scss';
import Loupe from '../../../../static/icons/loupe.svg';
import SearchArrow from '../../../../static/icons/search_arrow.svg';
import SearchArrowUp from '../../../../static/icons/search_arrow_up.svg';
import Line from '../../../../static/icons/search_line.svg';
import ButtonSearchBlue from '../../buttons/ButtonSearchBlue';
import SearchDropdownButton from '../../buttons/SearchDropdownButton'
import ButtonPrimary from '../../buttons/ButtonPrimary';
import Dropdown from '../../dropdown/Dropdown';
import DropdownMenu from './SearchDropdownMenu';
import Link from '../../../Link/Link';
import Svg from '../../../Svg';
import { SEARCH_PATHS } from '../../../../utils/routerConstants';

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

    options = [
        {
            key: 'vacancy',
            name: 'Вакансии'
        },
        {
            key: 'applicant',
            name: 'Соискатели',
        },
        {
            key: 'employer',
            name: 'Работодатели',
        },
        {
            key: 'resume',
            name: 'Должности',
        }
    ];

    handleMenu = () => {
        this.setState(state => ({
            ...state,
            isOpen: !this.state.isOpen,
        }));
    };

    render() {
        return (
            <div className={'grid columns g-24 relative'}>
                <div className={styles.search}>
                    <DropdownMenu
                        hidden={
                            <div
                                className={
                                    `flex hidden column g-0 background-0 rounded-md shadow-md ${styles.dropdown}`
                                }
                            >
                                <div className={'flex row border-tb-light align-items-center justify-content-center p-12'}>
                                    <div className={'flex column justify-content-center'}>
                                        {this.options.map(option => (
                                            <Link
                                                to={SEARCH_PATHS.SEARCH + option.key}
                                                content={
                                                    <p
                                                        className={`${styles.dropdown_options}`}
                                                    >
                                                        {option.name}
                                                    </p>
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                        content={
                            <SearchDropdownButton
                                onClick={this.handleMenu}
                            >
                                <div className={`flex row g-8 align-items-center justify-content-center w-100 ${styles.dropdown_button}`}>
                                    <p
                                        id={'searchOption'}
                                        className={`cursor-pointer`}
                                    >
                                        {
                                            this.options.map(option => {
                                                if (option.key === location.pathname.split('/').at(-1))
                                                    return option.name
                                            })
                                        }
                                    </p>
                                    {this.state.isOpen
                                        ? (
                                            <Svg
                                                src={SearchArrowUp}
                                                height={6}
                                            />
                                        ) : (
                                            <Svg
                                                src={SearchArrow}
                                                height={6}
                                            />
                                        )
                                    }
                                </div>
                            </SearchDropdownButton>
                        }
                        direction={'left'}
                        isOpen={this.state.isOpen}
                    />
                </div>
                <form onSubmit={this.props.onSubmitSearch} className={'col-12 col-md-10'}>

                        <div
                            className={`cursor-pointer absolute ${styles.icon}`}
                            dangerouslySetInnerHTML={{ __html: Loupe }}
                        />
                        <input
                            id={'search'}
                            className={`col-12 col-md-10 w-100 ${styles.input} ${styles.search_input}`}
                            type={'text'}
                            placeholder={'Поиск...'}
                        />

                </form>
            </div>
        );
    }
}
