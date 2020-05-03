import Paths from 'common/paths';
import SigninComponent from 'signin/SigninComponent';
import ProfileComponent from 'profile/ProfileComponent';
import PolicyListComponent from 'policy/PolicyListComponent';

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
const policyListComponentStruct = {
  exactPath: true,
  path: Paths.POLICY_VIEW,
  component: PolicyListComponent,
};

const routerList = [
  signinComponentStruct,
  profileComponentStruct,
  policyListComponentStruct,
];

export default routerList;

export const a = 1;
