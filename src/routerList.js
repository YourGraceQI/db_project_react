import Paths from 'common/paths';
import SigninComponent from 'signin/SigninComponent';
import ProfileComponent from 'profile/ProfileComponent';

const signinComponentStruct = {
  exactPath: true,
  path: [Paths.SIGNIN, Paths.ROOT],
  component: SigninComponent,
};
const profileComponentStruct = {
  exactPath: true,
  path: Paths.PROFILE,
  component: ProfileComponent,
};

const routerList = [
  signinComponentStruct,
  profileComponentStruct,
];

export default routerList;
