import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, VStack } from "@chakra-ui/react"
import { Field, FieldAttributes, Form, Formik } from "formik"
import { IUser } from "../../models/User"
import { useAuthState } from "../../stores/auth/AuthProvider"

interface IProps {
    initialValue: { email: string, newsletter: string };
    onSubmit: (values: { email: string, newsletter: string }) => void;
    onBack: (values: { email: string, newsletter: string }) => void;
}

function validateNewsletter(value: string) {
    let error
    if (!value) {
        error = "Please select one of the options."
    }
    return error
}
function validateEmail(value: string) {
    const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let error
    if (!value) {
        error = "Email is required"
    } else if (!value.match(validRegex)) {
        error = "Enter a valid email address!"
    }
    return error
}

const NewsletterOptions: { label: string, value: IUser["newsletter"] }[] = [{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }, { value: "monthly", label: "Monthly" }]

const SignUpStepTwo = ({ onSubmit, onBack, initialValue }: IProps) => {
    const authState = useAuthState()

    return (
        <Formik
            initialValues={initialValue}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form>
                    <VStack spacing={8}>
                        <Field name="email" validate={validateEmail}>
                            {({ field, form }: FieldAttributes<any>) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="newsletter" validate={validateNewsletter}>
                            {({ field, form }: FieldAttributes<any>) => (
                                <FormControl isInvalid={form.errors.newsletter && form.touched.newsletter}>
                                    <FormLabel htmlFor="newsletter">Newsletter</FormLabel>
                                    <Select {...field} placeholder="Select option">
                                        {NewsletterOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                                    </Select>
                                    <FormErrorMessage>{form.errors.newsletter}</FormErrorMessage>
                                </FormControl>)}
                        </Field>
                        <HStack spacing={8} justifyContent="flex-end" width="100%">
                            <Button colorScheme="blue" variant="ghost" onClick={() => onBack(props.values)}>Back</Button>
                            <Button colorScheme="blue" isLoading={props.isSubmitting || authState.loading} disabled={!props.isValid || authState.loading}
                                type="submit">Submit</Button>
                        </HStack>
                    </VStack>
                </Form>
            )}
        </Formik>

    )
}

export default SignUpStepTwo
