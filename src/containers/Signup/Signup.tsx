import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import SignUpStepOne from '../../components/SignupStepOne/SignUpStepOne';
import SignUpStepTwo from '../../components/SignupStepTwo/SignUpStepTwo';
import Wrapper from '../../components/Wrapper/Wrapper';
import { IUser } from '../../models/User';

const Signup = () => {
    const location = useLocation();
    const [formData, setFormData] = useState<Partial<IUser>>({})
    const { path, url } = useRouteMatch();
    const history = useHistory()
    // let { from } = location.state || { from: { pathname: "/" } };
    const stepTwoIsAvailable = typeof formData.age !== "undefined" && typeof formData.name !== "undefined";


    const handleSubmitStepOne = (values: { name: string, age: number }) => {
        setFormData(prev => ({...prev, ...values}));
        history.push(`${path}/step/2`);
    }
    const handleSubmitStepTwo = async (values: { email: string, newslater: string }) => {
        setFormData(prev => ({...prev, ...values}));
        console.log({...formData, ...values})
        await new Promise((res) => {
            setTimeout(res, 3000)
        })
    }
    const handleBackStepTwo = (values: { email: string, newslater: string }) => {
        setFormData(prev => ({...prev, ...values}));
        history.goBack()
    }
    return (
        <Wrapper>
            <Heading as="h2" size="xl">
                Sign Up
            </Heading>

            <Flex justifyContent="center" mt={4}>
                <Box width="sm" borderWidth="1px" borderRadius="lg" padding={4}>
                    <Switch>
                        <Route path={`${path}/step/1`}>
                            <SignUpStepOne initialValue={{name: formData.name || "", age: formData.age || 18}} onSubmit={handleSubmitStepOne} />
                        </Route>
                        {stepTwoIsAvailable && <Route path={`${path}/step/2`}>
                            <SignUpStepTwo initialValue={{email: formData.email || "", newslater: formData.newsletter || ""}} onSubmit={handleSubmitStepTwo} onBack={handleBackStepTwo} />
                        </Route>}
                        <Redirect to={`${path}/step/1`} />
                    </Switch>
                </Box>
            </Flex>
        </Wrapper>
    )
}

export default Signup
