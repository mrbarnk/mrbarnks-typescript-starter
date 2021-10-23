import log from "../../logger";

const nodemailer = require("nodemailer");
const TokenGenerator = require("uuid-token-generator");
const { addUser, removeUser, getUser, tokenExistence } = require("./functions");

interface verifyBothDocument {
  code: string,
  token: string,
}

interface smtpInfoDocument {
  host: string,
  port: number,
  user: string,
  pass: string
}

interface mailInfoDocument {
  subject: string,
  emailReceiver: string,
  text: Function,
  html: Function
}

interface companySmtpDocument {
  name: string,
  email: string,
}

interface sendCodeDocument { 
  smtpInfo: smtpInfoDocument,
  company: companySmtpDocument,
  mailInfo: mailInfoDocument
}

const getCode = async function (email: string) {
  const oldData = await getUser(email);
  log.info('Old data', oldData);
  let code, token;
  if (oldData) {
    if (new Date(oldData.expirateDate) > new Date()) {
      code = Number(oldData.code);
      token = oldData.token;
    } else removeUser(email);
  }
  console.log('oldData', oldData)
  code = code || Math.floor(Math.random() * 900000 + 100000);
  token = token || new TokenGenerator().generate();
  await addUser(email, { code, token });
  return { code, token };
};

exports.sendCode = async function ({ smtpInfo, company, mailInfo }: sendCodeDocument) {
  const { code, token } = await getCode(mailInfo.emailReceiver);
  const transporter = nodemailer.createTransport({
    host: smtpInfo.host,
    port: smtpInfo.port || 465,
    secure: smtpInfo.port ? smtpInfo.port === 465 : true, // true for 465, false for other ports
    auth: {
      user: smtpInfo.user,
      pass: smtpInfo.pass,
    },
  });

  const info = await transporter.sendMail({
    from: `${company.name} <${company.email}>`,
    to: `${mailInfo.emailReceiver}`,
    subject: `${mailInfo.subject}`,
    text: mailInfo.text ? `${mailInfo.text(code, token)}` : "",
    html: mailInfo.html ? `${mailInfo.html(code, token)}` : "",
  });

  log.info("Verification Code Message sent: "+ JSON.stringify(info));
  // console.log({ info });

  return {code, token}
};

exports.verifyCode = async function (email: string, code: number) {
  const data = await getUser(email);
  let status, reason;
  if (data) {
    if (new Date(data.expirateDate) > new Date()) {
      status = Number(data.code) === Number(code);
      reason =
        Number(data.code) !== Number(code) ? "This code is not Valid!" : "Email verified sucessfully.";
      Number(data.code) === Number(code) ? await removeUser(email) : "Email verified sucessfully.";
    } else {
      await removeUser(email);
      status = false;
      reason = "This code has expirated, Please retry again!";
    }
  } else {
    status = false;
    reason = "Email not found!";
  }
  return {
    status,
    reason,
  };
};

exports.verifyToken = async function (token: string) {
  const { data, email } = await tokenExistence(token);
  if (data) {
    await removeUser(email);
    if (new Date(data.expirateDate) > new Date())
      return {
        status: true,
        email,
        code: data.code,
      };
    return {
      status: false,
      reason:
        "This link has expired, Please re-send a verification code to Confirm your email!",
    };
  }
  return {
    status: false,
    reason: "Invalid Token!",
  };
};

exports.verifyBoth = async function ({ code, token }: verifyBothDocument) {
  const { data, email } = await tokenExistence(token);
  if (data) {
    if (new Date(data.expirateDate) > new Date()) {
      if (data.code === code) {
        await removeUser(email);
        return {
          status: true,
          email,
        };
      }
      return {
        error: true,
        reason: "This code is not Valid!",
      };
    }
    await removeUser(email);
    return {
      error: true,
      reason:
        "This link has expired, Please re-send a verification code to Confirm your email!",
    };
  }
  return {
    error: true,
    reason: "Invalid Token!",
  };
};
