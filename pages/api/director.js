import directorsData from '../../data/directors.json';

export default function handler(req, res) {
  res.status(200).json(directorsData);
}