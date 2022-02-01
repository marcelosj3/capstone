import { ReactNode } from "react";
import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";

interface IRadioCardProps extends UseRadioProps {
  children: ReactNode;
}

export const RadioCard = ({ children, ...rest }: IRadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio({ ...rest });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#FFB703",
          color: "black",
          borderColor: "#FFB703",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};
