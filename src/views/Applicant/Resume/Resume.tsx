import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import styles from '../../Employer/Vacancy/vacancy.module.scss';
import ResumeHat from '../../../components/hats/ResumeHat';
import TextBlock from '../../../components/UI-kit/text/TextBlock';
import Education from '../../../components/UI-kit/education/Education';
import ResumeSidebar from '../../../components/sidebars/ResumeSidebar';

export default class Resume extends Component{
    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div className={styles.header_substrate}></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12`}>
                        <ResumeHat
                            imgSrc={'./'}
                            name={'Захар'}
                            surname={'Урванцев'}
                            description={'Студент МГТУ'}
                        />
                    </div>
                    <h3 className={'col-12'}>JavaScript разработчик</h3>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'О себе'}
                            content={
                                'В последние годы проходил обучение без возможности работать. Владею продвинутыми знаниями Bootstrap, Javascript, Vue.js. Работал с нативным PHP, MVC-фреймворком Laravel, Android Studio\n' +
                                'Мой GitHub: https://github.com/IvanProtsenko\n' +
                                'Реализовал проект в рамках Школы IT-решений. Проходил месячную стажировку в КРОК инкорпорейтед\n' +
                                'Более года работал с проектами на node.js,\n' +
                                'Работал с mongodb, web-socket, express.js, участвовал в исправлении npm-модуля\n' +
                                'Имеется опыт работы с школьниками, читаю лекции в технопарке МАИ\n' +
                                'Дважды призёр Rucode'
                                }
                        />
                        <Education
                            university={'Московский государственный технический университет им. Н.Э."Баумана, Москва"'}
                            faculty={'Информационное управление, Информационные системы и технологии'}
                            status={'Неоконченное высшее'}
                        />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <ResumeSidebar />
                    </div>
                </div>
            </div>
        )
    }
}