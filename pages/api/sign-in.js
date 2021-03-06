import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

const initCORS = MW.init(MW.CORS);

export default async (req, res) => {
  initCORS(req, res);

  // NOTE(jim): We don't need to validate here.
  if (Strings.isEmpty(req.body.data.username)) {
    return res.status(500).send({ decorator: "SERVER_SIGN_IN", error: true });
  }

  if (Strings.isEmpty(req.body.data.password)) {
    return res.status(500).send({ decorator: "SERVER_SIGN_IN", error: true });
  }

  let user;
  try {
    user = await Data.getUserByUsername({
      username: req.body.data.username.toLowerCase(),
    });
  } catch (e) {
    console.log(e);
  }

  if (!user) {
    return res
      .status(404)
      .send({ decorator: "SERVER_SIGN_IN_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_SIGN_IN_USER_NOT_FOUND", error: true });
  }

  const phaseOne = await BCrypt.hash(req.body.data.password, user.salt);
  const phaseTwo = await BCrypt.hash(phaseOne, user.salt);
  const phaseThree = await BCrypt.hash(
    phaseTwo,
    Environment.LOCAL_PASSWORD_SECRET
  );

  if (phaseThree !== user.password) {
    return res
      .status(403)
      .send({ decorator: "SERVER_SIGN_IN_AUTH", error: true });
  }

  const authorization = Utilities.parseAuthHeader(req.headers.authorization);
  if (authorization && !Strings.isEmpty(authorization.value)) {
    const verfied = JWT.verify(authorization.value, Environment.JWT_SECRET);

    if (user.username === verfied.username) {
      return res.status(200).send({
        message: "You are already authenticated. Welcome back!",
        viewer: user,
      });
    }
  }

  const token = JWT.sign(
    { id: user.id, username: user.username },
    Environment.JWT_SECRET
  );

  return res
    .status(200)
    .send({ decorator: "SERVER_SIGN_IN", success: true, token });
};
