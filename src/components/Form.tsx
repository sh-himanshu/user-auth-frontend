import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const Form = () => {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="first-name">First name</FormLabel>
      <Input id="first-name" placeholder="First name" />
    </FormControl>
  );
};

export default Form;
