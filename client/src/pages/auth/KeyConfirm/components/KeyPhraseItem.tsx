import { InputItem } from "./InputItem";
import { Item } from "components/atoms/CryptoBoard";

type PropsType = Readonly<{
  label: string;
  keyword: string;
  isInput: boolean;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>;
export const KeyPhraseItem: React.FC<PropsType> = ({
  label,
  keyword,
  isInput,
  onInputChange,
  inputValue,
}) => {
  if (isInput) {
    return (
      <InputItem
        label={label}
        key={keyword}
        value={inputValue}
        onChange={onInputChange}
      />
    );
  }

  return <Item label={label} key={keyword} title={keyword} />;
};
