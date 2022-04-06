import styled from "styled-components";

export const Add = styled.div({
  // textAlign: 'left',
  [`form`]: {
    display: "flex",
    width: "80%",
    flexDirection: "column",
    gap: 5,
    [`& label`]: {
      display: "flex",
      justifyContent: "space-between"
    },
    [`button`]: { alignSelf: "end", marginTop: 10 },
    [`& .error`]: { color: "red", alignSelf: "end", marginBottom: 10 }
  }
});
