const path = require("path");
const fs = require("fs/promises");

const PUBLIC = path.resolve(__dirname, "../../../../public")

class FileSystemService {
	createFile = async (req, res) => {
		const {filename, ext, content} = req.json()
		const fullname = ext ? `${filename}.${ext}` : filename

		 await fs.writeFile(
				path.resolve(PUBLIC, fullname),
				content,
				 {flag: "w"}
			)
			.then(() => {
				res[200].html(`done: ${fullname}`)
			})
			.catch(error => {
				res[500](`Шляпа какая-то, не создался: ${error.message}`)
			})
	}

	updateFile = async (req, res) => {
		const {filename, ext, content} = req.json()
		const fullname = ext ? `${filename}.${ext}` : filename

		await fs.writeFile(
			path.resolve(PUBLIC, fullname),
			content,
			{flag: "wx"}
		)
			.then(() => {
				res[200].html(`done: ${fullname}`)
			})
			.catch(error => {
				res[500](`Шляпа какая-то: ${error.message}`)
			})
	}

	async readFile(req, res) {
		const { filename } = req.json()
		fs.readFile(path.resolve(PUBLIC, filename))
			.then((data) => {
				res[200].html(data)
			})
			.catch(error => {
				res[500](`Шляпа какая-то, не нашелся: ${error.message}`)
			})
	}

	deleteFile(req, res) {
		const { filename } = req.json();
		fs.rm(path.resolve(PUBLIC, filename))
			.then(() => {
				res[200].html(`deleted ${filename}`)
			})
			.catch((err) => {
				res[500]("Шляпа какая-то, походу нечего стирать: " + err.message)
			})
	}
}

module.exports = new FileSystemService()
