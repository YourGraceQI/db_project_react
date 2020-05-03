const Paths = {
  ROOT: '/',
  SIGNIN: '/signin',
  POLICY_VIEW: '/policy/view',
  POLICY_CREATE: '/policy/create',
  POLICY_DETAIL: '/policy/view/:id',
  PROFILE: '/profile',
};

export const geneartePolicyManagementPath = (id) => {
  let path = Paths.POLICY;
  path = id ? `${path}/${id}` : path;
  return path;
};

export default Paths;
