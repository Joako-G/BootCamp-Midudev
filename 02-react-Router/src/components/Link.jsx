import { Link as RRLink } from "react-router"

export function Link ({href, children, ...restOfProps}) {
    return (
        <RRLink to={href} {...restOfProps}>
            {children}
        </RRLink>
    )
}