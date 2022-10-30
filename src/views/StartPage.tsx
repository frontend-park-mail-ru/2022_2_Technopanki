import { Component } from '../../Reacts';

export default class StartPage extends Component {
    render() {
        return (
            <div
                className={
                    'grid columns g-24 justify-content-space-evenly screen-responsive'
                }
            >
                <div className={'col-6 flex column g-32 content'}>
                    <div className={'flex column g-16'}>
                        <h3>Начни строить свою карьеру прямо сейчас!</h3>
                        <p>
                            На нашем сайте вы всегда можете узнать последние
                            новости рынка труда, а также изучить свежий обзор
                            зарплат, с помощью которого легко оценить, на какие
                            должности стоит нацелиться.
                        </p>
                    </div>
                </div>
                <div className={'col-6'}>
                    <p>Some text</p>
                </div>
            </div>
        );
    }
}
