import {Stack, Flex, Text } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'
export function Rating(props: any) {
  const { rating, numReviews, caption } = props;
  return (
    <Stack align="center" p="1" rounded="md" bg="green.500" color="white">
      {caption ? (
        <Text fontSize="sm">{caption}</Text>
      ) : (
        <Flex align="center" justify="space-between">
          <Text fontSize="sm">{numReviews}</Text>
          <StarIcon fontSize="10"
          />
        </Flex>

      )}
        
      
    </Stack>
  );
}