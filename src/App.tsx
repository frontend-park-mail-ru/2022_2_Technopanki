import { Component } from '../Reacts';
import router from './router/navigator';
import Test from './Test';
import Link from './components/Link';
import Button from './components/UI-kit/buttons/Button';

class App extends Component {
    render() {
        return (
            <div>
                <p>Hello from main page!</p>
                <Link
                    to={'/test'}
                    content={
                        <Button>
                            <p>Go to test page</p>
                        </Button>
                    }
                />
            </div>
        );
    }
}

class NotFound extends Component {
    render() {
        return (
            <div>
                <p>404 page not found</p>
            </div>
        );
    }
}

router.addNewPath('/', <App />);
router.addNewPath('/test', <Test />);
router.setFallback('/404', <NotFound />);
console.log(location.pathname);
router.navigate(location.pathname);
