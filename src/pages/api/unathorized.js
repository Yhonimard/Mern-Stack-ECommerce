/**
 *
 * @param {import("next").NextApiRequest
 * } req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  return res.status(401).json({ message });
}
