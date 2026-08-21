import type { ButtonSize, ButtonVariant } from '../../types/button';
import { buildClassName } from '../../utils/misc';
import LoaderElement from './LoaderElement';

interface OwnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: boolean;
}

function Button(props: OwnProps) {
    const { children, variant = 'primary', size = 'md', icon = false, isLoading = false } = props;

    const classes = buildClassName('btn', variant, size, icon && 'icon', isLoading && 'loading');

    return (
        <button className={classes}>
            {isLoading && <LoaderElement />}
            <span className="btn__content">{children}</span>
        </button>
    );
}

export default Button;
