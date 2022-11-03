import { Component } from '../../../../Reacts';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
import { AvatarSettings, Password, SocialNetworks } from '../../Employer/Profile/ProfileSettings';
import Header from '../../../components/UI-kit/header/Header';
import SettingsHat from '../../../components/hats/SettingsHat';
import CancelSaveButtons from '../../../components/CancelSaveButtons/CancelSaveButtons';
import Input from '../../../components/UI-kit/forms/inputs/Input';
import Textarea from '../../../components/UI-kit/forms/inputs/Textarea';
import Chips from '../../../components/UI-kit/chips/Chips';

class AboutResume extends Component {
    render() {
        return (
            <div className={'columns g-16'}>
                <div className={'col-12 col-md-8'}>
                    <Input
                        id={'title'}
                        type={'text'}
                        placeholder={'Название'}
                        label={'Название'}
                        name={'title'}
                    />
                </div>
                <div className={'col-12 col-md-8'}>
                    <Textarea
                        label={'О себе'}
                        placeholder={'О себе'}
                    />
                </div>
                <div className={'col-12'}>
                    <Skills />
                </div>
            </div>
        )
    }
}

class Skills extends Component<
    {},
    {
        chipsData: string[];
    }
    > {

    state = {
        chipsData: ['JavaScript', 'Git', 'CSS3', 'HTML5', 'React', 'Redux', '+'],
    };

    render() {
        return(
            <div className={'flex column'}>
                <p className={'color-600'}>Профессиональные навыки</p>
                <div className={'flex row g-8 flex-wrap'}>
                    {this.state.chipsData.map(item => (
                        <Chips>{item}</Chips>
                    ))}
                </div>
            </div>
        )
    }
}

export default class ResumeSettings extends Component<
    {},
    { section: FormSectionType[] }
    >{
    state = {
        sections: [
            {
                header: '',
                content: <AboutResume />
            },
        ]
    };

    submitForm = () => {};

    render() {
        return (
            <div
                className={'screen-responsive relative'}
            >
                <Header />
                <div class={'column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={'./'}
                            name={'Захар'}
                            surname={'Урванцев'}
                            description={'Студент МГТУ, разработчик и просто хороший человек'}
                            to={'/vacancy'}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки резюме</h3>
                    <div className={'col-12 col-md-6'}>
                        <Form
                            sections={this.state.sections}
                            submitComponent={
                                <CancelSaveButtons
                                    onCancel={() => {}}
                                    onSave={() => {}}
                                />
                            }
                            onSubmit={this.submitForm}
                        />
                    </div>
                </div>
            </div>
        )
    }
}