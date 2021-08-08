import { Box, Flex, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import SignUpStepOne from '../../components/SignupStepOne/SignUpStepOne';
import SignUpStepTwo from '../../components/SignupStepTwo/SignUpStepTwo';
import Wrapper from '../../components/Wrapper/Wrapper';
import { IUser } from '../../models/User';
import { signUpUserAction } from '../../stores/auth/AuthActions';
import { useAuthDispatch, useAuthState } from '../../stores/auth/AuthProvider';

const Signup = () => {
    const location = useLocation();
    const [formData, setFormData] = useState<{
        name?: string,
        age?: number,
        newsletter?: string,
        email?: string
    }>({})
    const pathToRedirectAfterSignup = useRef<string>();
    const { path } = useRouteMatch();
    const history = useHistory()
    const toast = useToast()
    const authDispatch = useAuthDispatch()
    const authState = useAuthState()

    useEffect(() => {
        const { state }: { state: any } = location
        if (state?.from?.pathname) {
            pathToRedirectAfterSignup.current = state?.from?.pathname
        }
    }, [])

    useEffect(() => {
        if (authState.loggedIn) {
            toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            history.push(pathToRedirectAfterSignup.current || "/")
        }
    }, [authState.loggedIn])
    const stepTwoIsAvailable = typeof formData.age !== "undefined" && typeof formData.name !== "undefined";

    const handleSubmitStepOne = (values: { name: string, age: number }) => {
        setFormData(prev => ({ ...prev, ...values }));
        history.push(`${path}/step/2`);
    }


    const handleSubmitStepTwo = async (values: { email: string, newsletter: string }) => {
        const user: IUser = {
            name: formData.name!,
            age: formData.age!,
            newsletter: values.newsletter as IUser["newsletter"],
            email: values.email
        }
        setFormData(user);
            authDispatch(signUpUserAction(user))
    }

    const handleBackStepTwo = (values: { email: string, newsletter: string }) => {
        setFormData(prev => ({ ...prev, ...values }));
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
                            <SignUpStepOne initialValue={{ name: formData.name || "", age: formData.age || 18 }} onSubmit={handleSubmitStepOne} />
                        </Route>
                        {stepTwoIsAvailable && <Route path={`${path}/step/2`}>
                            <SignUpStepTwo initialValue={{ email: formData.email || "", newsletter: formData.newsletter || "" }} onSubmit={handleSubmitStepTwo} onBack={handleBackStepTwo} />
                        </Route>}
                        <Redirect to={`${path}/step/1`} />
                    </Switch>
                </Box>
            </Flex>
        </Wrapper>
    )
}

export default Signup
