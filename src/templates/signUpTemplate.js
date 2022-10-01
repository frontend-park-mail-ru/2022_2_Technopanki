export const signUpTemplate = `
<div class="menu">
    <div class="menu__wrapper">
        <div class="toggle">
            <div
                id="applicant_toggle"
                class="toggle__active toggle__element"
            >
                <div class="toggle__element-content">
                    <h5>Я соискатель</h5>
                    <p>Зарегистрироваться как соискатель</p>
                </div>
                <div
                    class="toggle__element-icon toggle__element-icon_active"
                >
                    <img src="img/icon.svg" alt="✓" />
                </div>
            </div>
            <div id="employer_toggle" class="toggle__element">
                <div class="toggle__element-content">
                    <h5>Я работодатель</h5>
                    <p>Зарегистрироваться как работодатель</p>
                </div>
                <div
                    class="toggle__element-icon toggle__element-icon_disabled"
                >
                    <img src="img/icon.svg" alt="✓" />
                </div>
            </div>
        </div>
        <form
            id="signup_form"
            action="/employers"
            class="menu__form"
            method="post"
        >
            <h4>Зарегистрироваться</h4>
            <div class="form__input">
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="example@email.ru"
                    required
                />
            </div>
            <div class="form__input">
                <label>Пароль</label>
                <input
                    name="password"
                    type="password"
                    placeholder="*****"
                    required
                />
            </div>
            <div class="form__input">
                <label>Имя</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Иван"
                    required
                />
            </div>
            <div class="form__input">
                <label>Фамилия</label>
                <input
                    name="surname"
                    type="text"
                    placeholder="Иванов"
                    required
                />
            </div>
            <button type="submit" class="form__submit-button">
                Создать аккаунт →
            </button>
            <p class="form__question">
                Уже есть аккаунт?
                <a href="/auth" class="form__question_a">Войти</a>
            </p>
        </form>
    </div>
</div>
<div class="description">
    <div class="description__container">
        <img
            class="description__logo"
            alt="Jobflow"
            src="img/Logo.svg"
            height="16"
        />
        <h3 class="description__header">
            Создай свою команду<br />Найди свою миссию
        </h3>
        <p class="description__text">
            На нашем сайте вы можете найти вакансии от лучших
            работодателей, а также узнать последние новости рынка
            труда. Если вы уже определились, вакансии каких
            специальностей вас интересуют, вам остаётся только
            зарегистрироваться и приступать к поиску работы мечты!
        </p>
    </div>
    <div class="description__img-wrapper">
        <img
            class="description__img"
            alt="Rectangle"
            src="img/Illustration.svg"
        />
    </div>
</div>
`;