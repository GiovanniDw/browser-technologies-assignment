export const saveData = (userInfo) => {
  console.log(userInfo.name);
  localStorage.setItem("cookie", userInfo);
  // .cookie('cookie', userInfo)
};
