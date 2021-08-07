import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, VStack } from "@chakra-ui/react"
import { Field, FieldAttributes, Form, Formik } from "formik"
import { IUser } from "../../models/User"

interface IProps {
    initialValue: { email: string, newslater: string };
    onSubmit: (values: { email: string, newslater: string }) => void;
    onBack: (values: { email: string, newslater: string }) => void;
}

function validateNewslater(value: string) {
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

const NewslaterOptions: { label: string, value: IUser["newsletter"] }[] = [{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }, { value: "monthly", label: "Monthly" }]

const SignUpStepTwo = ({ onSubmit, onBack, initialValue }: IProps) => {
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
                                <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="newsletter" validate={validateNewslater}>
                            {({ field, form }: FieldAttributes<any>) => (
                                <FormControl isInvalid={form.errors.newsletter && form.touched.newsletter} isRequired>
                                    <FormLabel htmlFor="newsletter">Newsletter</FormLabel>
                                    <Select {...field} defaultValue={props.values.newslater} placeholder="Select option">
                                        {NewslaterOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                                    </Select>
                                    <FormErrorMessage>{form.errors.newsletter}</FormErrorMessage>
                                </FormControl>)}
                        </Field>
                        <HStack spacing={8} justifyContent="flex-end" width="100%">
                            <Button colorScheme="blue" variant="ghost" onClick={() => onBack(props.values)}>Back</Button>
                            <Button colorScheme="blue" isLoading={props.isSubmitting}
                                type="submit">Submit</Button>
                        </HStack>
                    </VStack>
                </Form>
            )}
        </Formik>

    )
}

export default SignUpStepTwo
