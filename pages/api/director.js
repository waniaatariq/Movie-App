import data from '../../data/movies.json';

export default function handler(req, res) {
  res.status(200).json(data.directors);
}
