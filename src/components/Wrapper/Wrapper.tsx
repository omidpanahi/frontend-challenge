import { ReactNode } from "react"
import { Container, useBreakpointValue } from "@chakra-ui/react";

type Props = {
    children: ReactNode
}
const Wrapper = ({ children }: Props) => {
    const maxWidth = useBreakpointValue({
        sm: "30em",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
    })
    return (
        <Container maxWidth={maxWidth} padding={8}>
            {children}
        </Container>
    )
}

export default Wrapper
