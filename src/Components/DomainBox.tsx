import styled from "styled-components";
import type { ReactNode } from "react";

interface DomainButtonProps {
  icon: ReactNode;
  name: string;
  selected?: boolean;
  onClick: () => void;
}

const StyledButton = styled.button<{ selected?: boolean }>`
  display: flex;
  padding: 11px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;

  background: ${({ selected }) =>
    selected ? "rgba(194, 204, 253, 0.9)" : "rgba(255, 255, 255, 0.20)"};
  color: ${({ selected }) => (selected ? "#000" : "#fff")};

  &:hover {
    background: ${({ selected }) =>
      selected ? "rgba(194, 204, 253, 1)" : "rgba(255, 255, 255, 0.35)"};
  }
`;

const DomainBox = ({ icon, name, selected, onClick }: DomainButtonProps) => {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {icon}
      {name}
    </StyledButton>
  );
};

export default DomainBox;