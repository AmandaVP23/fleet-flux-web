import { buildClassName } from '../../utils/misc';

interface OwnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}

// variant
// size
// icon

function Button(props: OwnProps) {
    const { children, isLoading = false } = props;

    const classes = buildClassName('btn', {
        `$${className}`
    });

    const contentClass = buildClassName('btn__content', {
        hidden: isLoading,
    });

    return (
        <button>
            {isLoading && <span className="loader btn__loader" />}
            <span>{children}</span>
        </button>
    );
}
