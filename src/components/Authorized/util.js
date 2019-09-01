export const checkAuthority = (authorityList, userAllAuthority) => {
  let isCheckPass = true; // 如果不传递authority，则不进行权限校验
  if (authorityList.length) {
    isCheckPass = !!authorityList.find(item => userAllAuthority.includes(item));
  }
  return isCheckPass;
};
