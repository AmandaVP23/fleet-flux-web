export function buildClassName(
    baseClass: string,
    ...modifiers: Record<string, boolean>[] | (string | undefined | false | null)[]
): string {
    let res: string[] = [];
    if (typeof modifiers[0] === 'object' && modifiers[0] !== null) {
        res = Object.entries(modifiers[0] || {})
            .filter((value) => value)
            .map(([extraClass, shouldHave]) => {
                if (!shouldHave) return '';
                return extraClass.includes('$')
                    ? extraClass.replace('$', '')
                    : `${baseClass}--${extraClass}`;
            });
    } else {
        res = modifiers.map((modifier) => {
            if (typeof modifier !== 'string') return '';

            return modifier.includes('$') ? modifier.replace('$', '') : `${baseClass}--${modifier}`;
        });
    }

    return `${baseClass} ${res.join(' ')}`.trim();
}
