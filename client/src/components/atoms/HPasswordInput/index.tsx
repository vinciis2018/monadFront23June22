import React, { useCallback } from "react";
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { HPasswordInputContainer } from "./style";

interface IPropsType {
  onChange: (val: string) => void;
  onComplete?: (val: string) => void;
  onFocus?: () => void;
  password?: string;
  label?: string;
  labelAlign?: string;
  focused?: boolean;
  type?: string;
  autoFocus?: boolean;
}

const HPasswordInput = React.forwardRef<ReactCodeInput | null, IPropsType>(
  (
    {
      password = "",
      onChange,
      onComplete,
      onFocus,
      label = "",
      labelAlign = "center",
      focused = true,
      type = "",
      autoFocus,
    },
    ref
  ) => {
    const [code, setCode] = useState("");
    const [pinEye, setPinEye] = useState(false);
    const [textType, setTextType] = useState("password");

    const onClick = useCallback(() => {
      if (textType === "password") {
        setTextType("text");
      } else {
        setTextType("password");
      }
    }, [textType]);

    const onEditPin = useCallback(
      (value: string) => {
        setCode(value);
        onChange(value);
        if (value.length === 6 && onComplete) onComplete(value);
      },
      [onChange, onComplete]
    );

    return (
      <HPasswordInputContainer onClick={onClick}>
          <ReactCodeInput
            type="number"
            fields={6}
            name={""}
            inputMode={"tel"}
            onChange={onEditPin}
            autoFocus={autoFocus}
            ref={ref}
          />
          
      </HPasswordInputContainer>
    );
  }
);

export default HPasswordInput;
