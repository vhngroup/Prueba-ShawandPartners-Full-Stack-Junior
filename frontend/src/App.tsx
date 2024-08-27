
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

import './App.css'
import { uploadFile } from './services/upload'
import {type Data} from './types'
import { Search } from './steps/Search'

const APP_STATUS = {
  IDLE:'idle', //al entrar
  ERROR : 'error', // en error
  UPLOADING: 'uploading', // al elegir el archivo y antes de subirlo
  READY_UPLOAD: 'ready_upload', //mientras se sube
  READY_USAGE:'ready:usage' // despues de subir
} as const

const BUTTON_TEXT = {
    [APP_STATUS.READY_UPLOAD]: "Subir Archivo",
    [APP_STATUS.UPLOADING]: "Subiendo...."
} as const

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE)
  const [data, setData] = useState<Data>([])
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const [file] = event.target.files ?? []

    if(file){
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    if(appStatus != APP_STATUS.READY_UPLOAD || !file)
    {
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)
    const [err, newData] = await uploadFile(file)
    console.log({newData})
    if (err) {
      setAppStatus(APP_STATUS.ERROR)
      toast.error(err.message)
      return
    }
    setAppStatus(APP_STATUS.READY_USAGE)
    if (newData) setData(newData) 
    toast.success('Archivo Subido Correctamente')
  }

  const showButton = appStatus == APP_STATUS.READY_UPLOAD || appStatus == APP_STATUS.UPLOADING
  const showInput = appStatus !== APP_STATUS.READY_USAGE

  return (
    <>
    <Toaster/>
    <h4>Prueba de lectura y analisis .CSV</h4>
    {
     showInput &&(  
     <form onSubmit={handleSubmit}>
        <label>
            <input 
            disabled={appStatus == APP_STATUS.UPLOADING}
            onChange={handleInputChange} 
            name="file" 
            type="file" 
            accept='.csv'
            />
        </label>
        {showButton && (
          <button disabled={appStatus == APP_STATUS.UPLOADING}>
          {BUTTON_TEXT[appStatus]}
          </button>)}
      </form>
     )
     }
     {
      appStatus == APP_STATUS.READY_USAGE && (
        <Search initialData={data}/>
      )
     }
    </>
  )
}
export default App
