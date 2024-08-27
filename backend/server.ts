import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

const app = express()
const port = process.env.PORT ?? 3000

const storage = multer.memoryStorage()
const upload = multer({storage})

let userData: Array<Record<string, string>> = []

app.use(cors()) //Enable CORS

app.post('/api/files', upload.single('file'), async (req, res) => {
    // 1 Extract files from request
    const {file} = req
    // 2 Validate that what we have file
    if (!file) {
        return res.status(500).json({message: 'No se cargo ningun archivo'})
    }
    // 3 Validate the mimetype
    if (file.mimetype !== 'text/csv')
    {
        return res.status(500).json({message: 'Archivo debe ser CSV'})
    }

    let json: Array<Record<string, string>>=[]
    try {
        // 4 Transform the file (buffer) to string
        const rawCsv = Buffer.from(file.buffer).toString('utf-8')
        console.log(rawCsv)
        // 5 Transform string (csv) to JSON
        //json = csvToJson.getJsonFromCsv(rawCsv) 
        json = csvToJson.fieldDelimiter(';').csvStringToJson(rawCsv)
    } catch (error) {
        return res.status(500).json({message: 'Error parsing the file'})
    }
    // 6 Save the Json to db (or Memory)
    userData= json
    // 7 return 200 with the messages and the json
    return res.status(200).json({data: json, message: 'El archivo se cargo correctamente'})

} )

app.get('/api/users', async (req, res) => {
    // Extract the query param 'q' from request
    const {q} = req.query
    // validate that have the query param
    if (!q){
        return res.status(500).json(
            {
                message:'Query param ´Q´ is required'
            })
    }

    if (Array.isArray(q)){
        return res.status(500).json(
            {
                message:'Query param ´Q´ is required'
            }
        )
    }
    // filter the data from db (or memory) with the query param
    const search = q.toString().toLowerCase()

    const filteredData = userData.filter(row=>{
       return Object
        .values(row)
        .some(value => value.toLowerCase().includes(search))
    })
    // return 200 with the filter data
    return res.status(200).json({data: filteredData})
})

app.listen(port, ()  => {
    console.log(`Server is running at http://localhost:${port}`)
})