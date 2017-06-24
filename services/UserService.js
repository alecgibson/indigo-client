import Http from "./Http";
import Config from "./Config";

export default class UserService {
  static login(usernameOrEmail, password) {
    return Http.post(Config.SERVER_HOST + '/login', {
      username: usernameOrEmail,
      password: password
    });
  }

  static register(email, username, password) {
    // TODO: Move this host global
    return Http
      .post(Config.SERVER_HOST + '/register', {
        email: email,
        username: username,
        password: password,
      })
      .then(() => {
        return UserService.login(username, password);
      });
  }
}
