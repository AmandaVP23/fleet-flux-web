export function buildClassName(
    baseClass: string,
    ...modifiers: (Record<string, boolean> | string | boolean | null | undefined)[]
): string {
    let res: string[] = [];

    const getClass = (cls: string) => {
        return cls.includes('$') ? cls.replace('$', '') : `${baseClass}--${cls}`;
    };

    for (const modifier of modifiers) {
        if (typeof modifier === 'object' && modifier !== null) {
            console.log(Object.entries(modifier));
            const classes = Object.entries(modifier)
                .filter(([, shouldHave]) => shouldHave)
                .map(([extraClass]) => getClass(extraClass));

            console.log('res', res);
            res.push(...classes);
        } else if (typeof modifier === 'string') {
            res.push(getClass(modifier));
        }
    }

    return `${baseClass} ${res.join(' ')}`.trim();
}
