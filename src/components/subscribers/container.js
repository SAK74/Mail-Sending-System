import styled from "styled-components";

export const Container = styled.div({
  color: (prop) => (prop.color === "blue" ? "blue" : "black")
});
