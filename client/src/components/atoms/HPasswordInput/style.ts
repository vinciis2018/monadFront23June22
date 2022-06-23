import styled, { css } from "styled-components";

export const HPasswordInputContainer = styled.div`
  display: flex;
  padding: 0 25px;
  flex-direction: column;
  flex: 1;
  background: violet.500;

  .pin-area {
    display: flex;
    flex-direction: row;

    .pin-eye {
      width: 40px;
      display: flex;
      justify-content: flex-end;
    }
    .react-code-input {
      display: flex !important;
      flex: 1;
      justify-content: space-between;
      input {
        font-family: Montserrat Sans, sans-serif !important;
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        border: 1px solid #fff !important;
        background: teal.500;
        background: #f5f5f526 !important;
        outline: transparent solid 2px;
        -webkit-outline: transparent solid 2px;
        -moz-outline: transparent solid 2px;
        font-size: 24px !important;
        font-weight: 400 !important;
        line-height: 24px !important;
        text-align: center !important;
        margin: 0 !important;
        padding: 0 !important;
        text-align: center !important;
      }
    }
  }
  .pin-area-focus {
    .react-code-input input {
      outline: #5ed9d1 solid 2px !important;
      -webkit-outline: #5ed9d1 solid 2px !important;
      -moz-outline: #5ed9d1 solid 2px !important;

      &:focus {
        color: transparent !important;
      }
    }
  }
  .pin-area-no-eye {
    .react-code-input input {
      border: 1px solid #5ed9d1 !important;
    }
    ${createCSS()};
  }
  .pin-area-eye {
    .react-code-input input {
      border: 1px solid #5ed9d1 !important;
    }
    ${createEyeCSS()};
  }
  .colorWhite {
    color: white !important;
  }
  .colorGreen {
    color: green.200 !important;
  }
`;

function createCSS() {
  let styles = "";

  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= i; j++) {
      styles += `
        &.code_ct_${i} .react-code-input input:nth-child(${j}) {
          background-color: green.400 !important;
          border: 1px solid green.400 !important;
          color: transparent !important;
        }
      `;
    }
  }

  return css`
    ${styles}
  `;
}

function createEyeCSS() {
  let styles = "";

  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= i; j++) {
      styles += `
        &.code_ct_${i} .react-code-input input:nth-child(${j}) {
          background-color: transparent !important;
          border-color: transparent !important;
          outline-color: transparent !important;
          color: green.400 !important;
        }
      `;
    }
  }

  return css`
    ${styles}
  `;
}
