import { Card } from 'antd';
import styled from 'styled-components';

const secondaryColor = process.env.REACT_APP_SECONDARY_COLOR;

export const StyledCard = styled(Card)`
    height: 100%;
    width: 100%;

    .ant-card-body {
        padding-left: 0;
        padding-right: 2.5rem
    }

    .section {
        text-align: right;
        
        .value {
            font-size: clamp(1.5rem, 1.75vw, 1.75rem);
            font-weight: 900;
        }

        .label {
            font-size: clamp(0.75rem, 1vw, 1rem);
        }

        &:not(:last-child) {
            &::after {
                position: absolute;
                content: "";
                width: 0.25rem;
                height: 100%;
                background-color: ${secondaryColor};
                top: 0;
                right: -1.5rem;
                transform: translate(-50%, 0);
            }
        }
    }
`;