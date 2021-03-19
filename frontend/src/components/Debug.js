import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  pre {
    z-index: 9000;
    background-color: #ff0;
    color: #000;
    font-size: 11px;
    height: 100%;
    overflow: scroll;

    button {
      position: absolute;
      right: 0;
    }

    @media (min-width: 576px) {
      max-width: 300px;
      position: fixed;
      top: -1px;
      right: 0;

      &.right {
        right: 0 !important;
      }
      &.left {
        left: 0;
      }
      &.bottom {
        max-height: 250px;
        width: 100%;
        top: auto;
        left: auto;
        right: auto;
        bottom: 0;
      }
    }
  }
`;

class Debug extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  closeDebug = () => {
    this.ref.current.remove();
  };

  render() {
    if (this.props.hide) {
      return null;
    }

    return (
      <Wrapper ref={this.ref}>
        <pre className="right">
          <button onClick={this.closeDebug}>x</button>
          {JSON.stringify(this.props.data, null, 2)}
        </pre>
      </Wrapper>
    );
  }
}

Debug.defaultProps = {
  // right: true,
};

Debug.propTypes = {
  data: PropTypes.oneOfType([PropTypes.any]).isRequired,
  hide: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  top: PropTypes.bool,
};

export default Debug;
