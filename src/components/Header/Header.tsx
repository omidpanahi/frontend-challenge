import { Box, Button, Flex, Link, Stack } from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom"
import Wrapper from "../Wrapper/Wrapper";

const Header = () => {
    return (
        <Flex align="center" bg="blue.500" color="white" height={50} position="sticky" top={0}>
            <Wrapper>
                <Stack direction="row" spacing={8} align="center">
                    <Link to="/" as={RouterLink}>
                        Home
                    </Link>
                    <Link to="/dashboard" as={RouterLink}>
                        Dashboard
                    </Link>
                    <Box marginInlineStart="auto !important">
                        <RouterLink to="/signup">
                            <Button size="sm" colorScheme="whiteAlpha">Sign Up</Button>
                        </RouterLink>
                    </Box>
                </Stack>
            </Wrapper>
        </Flex>
    )
}

export default Header
