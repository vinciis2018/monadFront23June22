import { useQueryParam, StringParam, withDefault } from "use-query-params";
// ui
import { Flex, Text } from "@chakra-ui/react";
import { ToggleButtonGroup, ToggleButton } from "components/buttons";

export function TimeFilter() {
  const [timeframe, setTimeframe] = useQueryParam<string>("t", withDefault(StringParam, "1y"));

  const onTimeframeChange = (newValue: string) => {
    setTimeframe(newValue, "replaceIn");
  };

  return (
    <Flex justify="end" align="center">
      <Text p="2" color="violet.900" fontSize="sm" fontWeight="600">Last </Text>
      <ToggleButtonGroup size="xs" value={timeframe} defaultValue={timeframe} onChange={onTimeframeChange} name="timeframe" isAttached variant="outline" aria-label="Change timeframe">
        <ToggleButton bgColor="violet.200" value="24h" aria-label="24 hours" children="24h" />
        <ToggleButton bgColor="violet.200"  value="1w" aria-label="1 week" children="1w" />
        <ToggleButton bgColor="violet.200" value="1m" aria-label="1 month" children="1m" />
        <ToggleButton bgColor="violet.200" value="1y" aria-label="1 year" children="1y" />
        <ToggleButton bgColor="violet.200" value="all" aria-label="all time" children="all" />
      </ToggleButtonGroup>
    </Flex>
  );
}
