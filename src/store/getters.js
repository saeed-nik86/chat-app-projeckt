const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // اضاف کردیم برای رفرش توکن
  datetimerequest: state => state.user.datetimerequest,
  datetimelogin: state => state.user.datetimelogin,
  statuschecklogin: state => state.user.statuschecklogin,
  username: state => state.user.username,
  password: state => state.user.password
}
export default getters
