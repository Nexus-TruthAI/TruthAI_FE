import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const Container = styled.div`
  width: 200px;
  height: 8px;
  background: #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const Progress = styled.div<{ $done?: boolean }>`
  height: 100%;
  background: #C2CCFD;
  width: ${({ $done }) => ($done ? "100%" : "0%")};
  animation: ${({ $done }) => ($done ? "none" : loadingAnimation)} 2s linear infinite;
  transition: width 0.3s ease;
`;

interface LoadingBarProps {
  done?: boolean;
}

const LoadingOverlay = ({ done }: LoadingBarProps) => {
  return (
    <Container>
      <Progress $done={!!done} />
    </Container>
  );
};

export default LoadingOverlay;