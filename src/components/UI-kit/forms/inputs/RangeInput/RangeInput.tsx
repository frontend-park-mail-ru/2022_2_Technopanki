import { ReactsComponent } from '../../../../../../Reacts/reacts/src/Component';
import styles from './range.module.scss'
import { Input } from 'postcss';

export default class RangeInput extends ReactsComponent<
    {
        min: string | Function;
        max: string | Function;
    }
>{
    handleFromInput = (fromSlider, fromInput, toInput, slider) => {
        const [from, to] = [parseInt(fromInput.value), parseInt(toInput.value)];
        this.fillSlider(fromInput, toInput, slider, '#dadae0', '#1C34EC');
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromSlider.value = from;
        }
    }

    handleToInput = (toSlider, fromInput, toInput, slider) => {
        const [from, to] = [parseInt(fromInput.value), parseInt(toInput.value)];
        this.fillSlider(fromInput, toInput, slider, '#dadae0', '#1C34EC');
        this.handleCollision(toInput);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
        }
    }

    handleFromSlider = (fromSlider, toSlider, fromInput) => {
        const [from, to] = [parseInt(fromSlider.value), parseInt(toSlider.value)];
        this.fillSlider(fromSlider, toSlider, toSlider, '#dadae0', '#1C34EC')
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromInput.value = from;
        }
    }

    handleToSlider = (fromSlider, toSlider, toInput) => {
        const [from, to] = [parseInt(fromSlider.value), parseInt(toSlider.value)];
        this.fillSlider(fromSlider, toSlider, toSlider, '#dadae0', '#1C34EC')
        this.handleCollision(toSlider)
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
            toSlider.value = from;
        }
    }

    handleCollision = (target) => {
        const toSlider = document.getElementById('toSlider');
        if (Number(target.value) <= 0) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }

    fillSlider = (from, to, slider, sliderColor, rangeColor) => {
        const rangeDist = to.max - to.min;
        const fromPos = from.value - to.min;
        const toPos = to.value - to.min;
        slider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPos / rangeDist) * 100}%,
        ${rangeColor} ${(fromPos / rangeDist) * 100}%,
        ${rangeColor} ${(toPos / rangeDist) * 100}%,
        ${sliderColor} ${(toPos / rangeDist) * 100}%,
        ${sliderColor} 100%)`;
    }

    handleRangeInput = () => {
        const fromSlider = document.getElementById('fromSlider');
        const toSlider = document.getElementById('toSlider');
        const fromInput = document.getElementById('fromInput');
        const toInput = document.getElementById('toInput');
        this.fillSlider(fromSlider, toSlider, toSlider, '#dadae0', '#1C34EC');
        this.handleCollision(toSlider);

        fromSlider.oninput = () => this.handleFromSlider(fromSlider, toSlider, fromInput);
        toSlider.oninput = () => this.handleToSlider(fromSlider, toSlider, toInput);
        fromInput.oninput = () => this.handleFromInput(fromSlider, fromInput, toInput, toSlider);
        toInput.oninput = () => this.handleToInput(toSlider, fromInput, toInput, toSlider);
    }

    // getMaxValue = () => {
    //     if (document.getElementById('toInput')) {
    //         console.log(document.getElementById('toInput').value)
    //         return (document.getElementById('toInput').value
    //             ? document.getElementById('toInput').value
    //             : '1000')
    //     }
    // }
    // getMinValue = () => {
    //     if (document.getElementById('fromInput')) {
    //         return (document.getElementById('fromInput').value
    //             ? document.getElementById('fromInput').value
    //             : '0')
    //     }
    // }

    render() {
        return (
            <div className={'flex column g-8'}>
                <div className={'flex row justify-content-space-between'}>
                    <input id={'fromInput'} type={'number'} placeholder={'0'} className={`${styles.range_input}`} />
                    <input id={'toInput'} type={'number'} placeholder={'Не указано'} className={`text-align-center ${styles.range_input}`} />
                </div>
                <div className={'relative flex row align-items-center'}>
                    <input
                        id={'fromSlider'}
                        type={'range'}
                        min={this.props.min}
                        max={this.props.max}
                        value={(parseInt(this.props.min) + parseInt(this.props.max)) / 2}
                        step={'10000'}
                        className={`${styles.slider} ${styles.from_slider}`}
                        onClick={this.handleRangeInput}
                    />
                    <input
                        id={'toSlider'}
                        type={'range'}
                        min={this.props.min}
                        max={this.props.max}
                        value={(parseInt(this.props.min) + parseInt(this.props.max)) / 2}
                        step={'10000'}
                        className={`${styles.slider}`}
                        onClick={this.handleRangeInput}
                    />
                </div>
            </div>
        )
    }
}