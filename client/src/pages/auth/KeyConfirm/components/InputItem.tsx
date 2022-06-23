import {Box, Text} from "@chakra-ui/react";
import styled from "styled-components";

export const InputItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box display="flex" alignItems="center" marginBottom="5px">
      <Text variant="body2" sx={{ color: "black", minWidth: "30px" }}>
        {label}.
      </Text>
      <StyledInput value={value} onChange={onChange} />
    </Box>
  );
};

export const StyledInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  border-bottom: 1px solid white;
  font-family: Sora;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: black;
  max-width: 86px;
  &:focus-visible {
    outline: none;
  }
`;
