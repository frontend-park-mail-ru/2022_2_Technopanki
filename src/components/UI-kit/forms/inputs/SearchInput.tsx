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
import Link from '../../../Link';

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
        console.log('handle menu')
        this.setState(state => ({
            ...state,
            isOpen: !this.state.isOpen,
        }));
    };

    // closeMenu = (e: MouseEvent) => {
    //     console.log('close menu')
    //     this.props.onSwitch(e);
    //     this.handleMenu();
    // };

    // switchPage = (e: MouseEvent) => {
    //     console.log('switched')
    //     this.props.onSwitch(e);
    //
    //     console.log(this.state)
    // }

    componentDidUpdate() {
        console.log('update input');
    }

    render() {
        return (
            <div className={'flex row g-24 relative'}>
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
                                        <p
                                            className={`${styles.dropdown_options}`}
                                            // onClick={this.props.onSwitch}
                                        >
                                            <Link
                                                to={`/search/${option.key}`}
                                                content={option.name}
                                            />
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    content={
                        <SearchDropdownButton
                            onClick={this.handleMenu}
                        >
                            <div className={`flex row g-8 align-items-center justify-content-center ${styles.dropdown_button}`}>
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
                                        <div
                                            className={`cursor-pointer ${styles.search_arrow}`}
                                            dangerouslySetInnerHTML={{ __html: SearchArrowUp }}
                                        />
                                    ) : (
                                        <div
                                            className={`cursor-pointer ${styles.search_arrow}`}
                                            dangerouslySetInnerHTML={{ __html: SearchArrow }}
                                        />
                                    )
                                }
                            </div>
                        </SearchDropdownButton>
                    }
                    direction={'left'}
                    isOpen={this.state.isOpen}
                />
                <form onSubmit={this.props.onSubmitSearch}>
                    <div>
                        <div
                            className={`cursor-pointer absolute ${styles.icon}`}
                            dangerouslySetInnerHTML={{ __html: Loupe }}
                        />
                        <input
                            id={'search'}
                            className={`w-75 absolute ${styles.input} ${styles.search_input}`}
                            type={'text'}
                            placeholder={'Поиск...'}
                        />
                    </div>
                </form>
            </div>
        );
    }
}
