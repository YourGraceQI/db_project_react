const Paths = {
  ROOT: '/',
  SIGNIN: '/signin',
  POLICY: '/policy',
  POLICY_MANAGEMENT: '/policy/:id?',
  PROFILE: '/profile',
};

export const geneartePolicyManagementPath = (id) => {
  let path = Paths.POLICY;
  path = id ? `${path}/${id}` : path;
  return path;
};

export default Paths;
