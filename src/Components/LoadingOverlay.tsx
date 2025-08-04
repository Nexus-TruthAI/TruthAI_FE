import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  from { width: 0% }
  to { width: 100% }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 8px;
  background: #ccc;
  border-radius: 10px;
  overflow: hidden;

  & > div {
    height: 100%;
    background: #C2CCFD;
    animation: ${loadingAnimation} 2s linear;
  }
`;

const LoadingOverlay = () => {
  return (
    <LoadingBar>
      <div />
    </LoadingBar>
  );
}

export default LoadingOverlay;