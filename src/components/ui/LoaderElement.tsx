import { buildClassName } from '../../utils/misc';

interface OwnProps {
    className?: string;
}

function LoaderElement(props: OwnProps) {
    const { className = '' } = props;

    const classes = buildClassName('loader', `$${className}`);

    return (
        <div className={classes}>
            <span className="loader__bar"></span>
            <span className="loader__bar"></span>
            <span className="loader__bar"></span>
        </div>
    );
}

export default LoaderElement;
