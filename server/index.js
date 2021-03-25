const app = require("./app")
const port = process.env.port || 5000

const chalk = require('chalk')

app.get('/', (req, res) => res.status(200).json({message: 'Hello World!'}))
app.listen(port, () => console.log(chalk.green(`\n\nExample app listening on port ${port}!`)))