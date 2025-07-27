import styled from 'styled-components';
import ArrowRight from "../Icons/ArrowRight.svg";

interface BtnProps {
    bgColor?: string;
}

const Btn = styled.button<BtnProps>`
    margin: 0;
    padding: 0 1rem;
    width: 8rem;
    height: 3rem;
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
`;

const BtnText = styled.span`
    font-size: 20px;
    font-weight: 0;
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
}

export default function RoundArrowBtn({
    children,
    bgColor,
    ...props
}: React.PropsWithChildren<RoundArrowBtnProps>) {
    return (
        <Btn bgColor={bgColor} {...props}>
            <BtnText>{children}</BtnText>
            <ArrowIcon src={ArrowRight} alt="arrow" />
        </Btn>
    );
}
