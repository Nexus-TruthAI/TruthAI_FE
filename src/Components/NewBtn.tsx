import styled from 'styled-components';

interface BtnProps {
    bgColor?: string;
}

const Btn = styled.button<BtnProps>`
    margin: 0;
    padding: 0 1rem;
    width: 5.6rem;
    height: 2.25rem;
    background-color: rgb(255, 255, 255, 0.2);
    color: #fff;
    border: none;
    border-radius: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: rgb(255, 255, 255, 0.3);
    }
`;

const BtnText = styled.span<{ $fontSize?: string }>`
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    padding: 0;
    margin-right: 0.1rem;
`;

interface NewBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    bgColor?: string;
    fontSize?: string;
}

export default function NewBtn({
    children,
    fontSize,
    ...props
}: React.PropsWithChildren<NewBtnProps>) {
    return (
        <Btn {...props}>
            <BtnText $fontSize={fontSize}>{children}</BtnText>
        </Btn>
    );
}
