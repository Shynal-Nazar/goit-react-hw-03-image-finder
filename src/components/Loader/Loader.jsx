import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

// export default class Loader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//     };
//   }

//   render() {
//     return (
//       <div className="sweet-loading">
//         <ClipLoader
//           css={override}
//           size={150}
//           color={'#123abc'}
//           loading={this.state.loading}
//           speedMultiplier={1.5}
//         />
//       </div>
//     );
//   }
// }

const Loader = () => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        css={override}
        size={150}
        color={'#123abc'}
        loading={true}
        speedMultiplier={1.5}
      />
    </div>
  );
};
export default Loader;
