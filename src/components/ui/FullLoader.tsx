import { buildClassName } from '../../utils/misc';
import LoaderElement from './LoaderElement';

interface OwnProps {
    show: boolean;
    className?: string;
    fullScreen?: boolean;
}

function FullLoader(props: OwnProps) {
    const { show, className = '', fullScreen = true } = props;

    if (!show) {
        return null;
    }

    const classes = buildClassName('loader-full', `$${className}`, fullScreen && 'full-screen');

    return (
        <div className={classes}>
            <LoaderElement />
        </div>
    );
}

export default FullLoader;
