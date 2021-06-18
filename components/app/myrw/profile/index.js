import { connect } from 'react-redux';

// actions
import { setUser } from 'redactions/user';

// hooks
// import {
//   useMe,
// } from 'hooks/user';
import {
  withUser,
} from 'hoc/auth';

// component
import Profile from './component';

// export default function ProfileContainer() {
//   const {
//     data: user,

//   }
//   return (<Profile user={user} />)
// }

export default connect(
  null,
  { setUser },
)(withUser(Profile));
