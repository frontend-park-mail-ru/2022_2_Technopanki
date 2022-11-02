import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import styles from './userPage.module.scss';
import Button from '../../../components/UI-kit/buttons/Button';
import ButtonIcon from '../../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../../static/icons/phone.svg';
import MailIcon from '../../../static/icons/mail.svg';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import TextBlock from '../../../components/UI-kit/text/TextBlock';
import ArrowButtonWithText from '../../../components/UI-kit/buttons/ArrowButtonWithText';
import Footer from '../../../components/UI-kit/footer/Footer';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import EmployerProfileSideBar from '../../../components/sidebars/EmployerProfileSideBar';
import Link from '../../../components/Link/Link';

export default class Profile extends Component {
    render() {
        return (
            <div className={'screen-responsive flex column g-40'}>
                <Header />
                <ProfileHeader
                    bannerSrc={'./'}
                    avatarSrc={'./'}
                    name={'VK'}
                    description={'Место встречи профессионалов'}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon icon={PhoneIcon} />
                            <ButtonIcon icon={MailIcon} />
                            <ButtonPrimary>Хочу здесь работать</ButtonPrimary>
                            <Link
                                to={'/employer/settings'}
                                content={<Button>Настройки</Button>}
                            />
                        </div>
                    }
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'Описание'}
                            content={
                                'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.\n' +
                                '\n' +
                                'Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.\n' +
                                '\n' +
                                'Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.'
                            }
                        />
                        <div className={'flex column g-16'}>
                            <h6>Вакансии</h6>
                            <div className={'flex column g-16'}>
                                <button className={styles.vacancies_button}>
                                    <ArrowButtonWithText>
                                        Добавить вакансию
                                    </ArrowButtonWithText>
                                </button>
                                <div>
                                    <Link
                                        to={'/vacancy'}
                                        content={<p>asad</p>}
                                    />
                                    <Link
                                        to={'/applicant/settings'}
                                        content={<p>profile</p>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <EmployerProfileSideBar />
                    </div>
                </div>
                {/*<Footer />*/}
            </div>
        );
    }
}
