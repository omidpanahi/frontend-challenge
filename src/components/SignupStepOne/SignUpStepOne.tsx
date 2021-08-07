import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from "@chakra-ui/react"
import { Field, FieldAttributes, Form, Formik } from "formik"

interface IProps {
    initialValue: { name: string, age: number };
    onSubmit: (values: { name: string, age: number }) => void
}

function validateAge(value: string) {
    let error
    if (!value) {
        error = "Age is required"
    } else if (Number(value) < 18) {
        error = "Age must be greater than 18."
    }
    return error
}
function validateName(value: string) {
    let error
    if (!value) {
        error = "Name is required"
    } else if (value.trim().length < 3) {
        error = "Name must be at least 3 characters."
    }
    return error
}

const SignUpStepOne = ({ initialValue, onSubmit }: IProps) => {
    return (

        <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
                values.age = Number(values.age)
                onSubmit(values)
            }}
        >
            {(props) => (
                <Form>
                    <VStack spacing={8}>
                        <Field name="name" validate={validateName}>
                            {({ field, form }: FieldAttributes<any>) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input {...field} id="name" placeholder="name" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="age" validate={validateAge}>
                            {({ field, form }: FieldAttributes<any>) => (
                                <FormControl isInvalid={form.errors.age && form.touched.age} isRequired>
                                    <FormLabel htmlFor="age">Age</FormLabel>
                                    <NumberInput {...field} onChange={(val) =>
                                        form.setFieldValue(field.name, val)
                                    }>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{form.errors.age}</FormErrorMessage>
                                </FormControl>)}
                        </Field>
                        <HStack spacing={8} justifyContent="flex-end" width="100%">
                            <Button colorScheme="blue" isLoading={props.isSubmitting}
                                type="submit">Next</Button>
                        </HStack>
                    </VStack>
                </Form>
            )}
        </Formik>

    )
}

export default SignUpStepOne
