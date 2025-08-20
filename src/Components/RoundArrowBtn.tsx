import styled from 'styled-components';
import ArrowRight from "../Icons/ArrowRight.svg";

interface BtnProps {
    bgColor?: string;
    height?: string;
}

const Btn = styled.button<BtnProps>`
    margin: 0;
    padding: 0 1rem;
    width: 8rem;
    height: ${({ height }) => height || '3rem'};
    background-color: ${({ bgColor }) => bgColor || '#3B5AF7'};
    color: #fff;
    border: none;
    border-radius: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: ${({ bgColor }) => bgColor || '#3551de'};
    }
`;

const BtnText = styled.span<{ $fontSize?: string }>`
    font-size: ${({ $fontSize }) => $fontSize || '20px'};
    font-weight: 400;
    margin: 0;
    padding: 0;
    margin-right: 0.1rem;
`;

const ArrowIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;

interface RoundArrowBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    bgColor?: string;
    fontSize?: string;
    showArrow?: boolean;
    height?: string;
}

export default function RoundArrowBtn({
    children,
    bgColor,
    fontSize,
    showArrow = true,
    height,
    ...props
}: React.PropsWithChildren<RoundArrowBtnProps>) {
    return (
        <Btn bgColor={bgColor} height={height} {...props}>
            <BtnText $fontSize={fontSize}>{children}</BtnText>
            {showArrow && <ArrowIcon src={ArrowRight} alt="arrow" />}
        </Btn>
    );
}
