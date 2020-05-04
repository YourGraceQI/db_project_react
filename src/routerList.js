import Paths from 'common/paths';
import SigninComponent from 'signin/SigninComponent';
import ProfileComponent from 'profile/ProfileComponent';
import PolicyListComponent from 'policy/PolicyListComponent';
import PolicyDetailComponent from 'policy/PolicyDetailComponent';
import AutoDetailComponent from 'auto/AutoDetailComponent';
import InvoiceDetailComponent from 'invoice/InvoiceDetailComponent';

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


const routerList = [
  signinComponentStruct,
  profileComponentStruct,
  policyListComponentStruct,
  policyDetailComponentStruct,
  autoDetailComponentStruct,
  invoiceDetailComponentStruct,
];

export default routerList;

export const a = 1;
