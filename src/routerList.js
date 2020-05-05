import Paths from 'common/paths';
import SigninComponent from 'signin/SigninComponent';
import ProfileComponent from 'profile/ProfileComponent';
import PolicyListComponent from 'policy/PolicyListComponent';
import PolicyDetailComponent from 'policy/PolicyDetailComponent';
import AutoDetailComponent from 'auto/AutoDetailComponent';
import InvoiceDetailComponent from 'invoice/InvoiceDetailComponent';
import SignupComponent from 'signin/SignupComponent';
import PolicyNewComponent from 'policy/PolicyNewComponent';

const signupComponentStruct = {
  exactPath: true,
  path: Paths.SIGNUP,
  component: SignupComponent,
};
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
const policyDetailComponentStruct = {
  exactPath: true,
  path: Paths.POLICY_DETAIL,
  component: PolicyDetailComponent,
};
const autoDetailComponentStruct = {
  exactPath: true,
  path: Paths.AUTO_DETAIL,
  component: AutoDetailComponent,
};
const invoiceDetailComponentStruct = {
  exactPath: true,
  path: Paths.INVOICE_DETAIL,
  component: InvoiceDetailComponent,
};
const policyNewComponentStruct = {
  exactPath: true,
  path: Paths.POLICY_POST,
  component: PolicyNewComponent,
};


const routerList = [
  signinComponentStruct,
  signupComponentStruct,
  profileComponentStruct,
  policyListComponentStruct,
  policyDetailComponentStruct,
  autoDetailComponentStruct,
  invoiceDetailComponentStruct,
  policyNewComponentStruct,
];

export default routerList;

export const a = 1;
