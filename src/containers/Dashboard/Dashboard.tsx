import { Heading } from '@chakra-ui/react'
import Wrapper from '../../components/Wrapper/Wrapper'

const Dashboard = () => {
    return (
        <Wrapper>
            <Heading as="h2" size="xl">
                Dashboard
            </Heading>
            <p>Dashboard (Protected Route)</p>
        </Wrapper>
    )
}

export default Dashboard
