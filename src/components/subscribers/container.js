import styled from "styled-components";

export const Container = styled.div(({ pending }) => {
  // console.log(props);
  return {
    cursor: pending ? "not-allowed" : "default"
    // [`& input[checkbox]`]: {width: pending ? 50 : 10}
  };
});
