import styled from "styled-components";

export const Container = styled.div(({ pending }) => {
  // console.log(props);
  return {
    cursor: pending ? "not-allowed" : "default",
    display: "flex",
    flexDirection: "column",
    // [`& input[checkbox]`]: {width: pending ? 50 : 10}
    [`button`]: { alignSelf: "end" },
    [`button.send`]: { alignSelf: 'start' }
  };
});
