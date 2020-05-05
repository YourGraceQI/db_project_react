const Paths = {
  ROOT: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  POLICY_VIEW: '/policy/view',
  POLICY_POST: '/policy/create',
  POLICY_DETAIL: '/policy/view/:id',
  PROFILE: '/profile',
  AUTO_DETAIL: '/auto/:id',
  INVOICE_DETAIL: '/invoice/:id',
};

export const geneartePolicyManagementPath = (id) => {
  let path = Paths.POLICY_VIEW;
  path = id ? `${path}/${id}` : path;
  return path;
};
export const genearteAutoManagementPath = (id) => {
  let path = '/auto';
  path = id ? `${path}/${id}` : path;
  return path;
};
export const genearteInvoiceManagementPath = (id) => {
  let path = '/invoice';
  path = id ? `${path}/${id}` : path;
  return path;
};

export default Paths;
