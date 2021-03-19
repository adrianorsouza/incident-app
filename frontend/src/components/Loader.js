import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 35px;

  div {
    position: absolute;
    top: 20px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cccccc;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    &:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const Loader = ({ show }) => {
  if (!show) {
    return null;
  }
  return (
    <Wrapper>
      <div />
      <div />
      <div />
      <div />
    </Wrapper>
  );
};

export default Loader;
