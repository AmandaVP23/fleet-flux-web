import type { ButtonSize, ButtonVariant } from '../../types/button';
import { buildClassName } from '../../utils/misc';

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

    const classes = buildClassName('btn', variant, size, icon && 'icon');

    const contentClass = buildClassName('btn__content', {
        hidden: isLoading,
    });

    return (
        <button className={classes}>
            {isLoading && <span className="loader btn__loader" />}
            <span className={contentClass}>{children}</span>
        </button>
    );
}

export default Button;
