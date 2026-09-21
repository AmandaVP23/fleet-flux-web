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

            res.push(...classes);
        } else if (typeof modifier === 'string') {
            res.push(getClass(modifier));
        }
    }

    return `${baseClass} ${res.join(' ')}`.trim();
}

export function buildRoute(
    baseRoute: string,
    params: Record<string, string | number | null | undefined>,
): string {
    let result = baseRoute;

    Object.entries(params).forEach(([param, value]) => {
        const routeKey = `{${param}}`;
        if (!baseRoute.includes(routeKey)) {
            // todo - add a devLog - only show when is dev
            console.error(`Route key: ${routeKey} is not present in ${baseRoute}`);
            return;
        }

        if (value === null || value === undefined) {
            return;
        }

        result = result.replace(routeKey, encodeURIComponent(value));
    });

    return result;
}
