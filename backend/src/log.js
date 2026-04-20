import * as fs from "fs/promises"
import EventEmitter from "events"

export const socketLog = new EventEmitter()


socketLog.on("socket",async (event,data)=>{
    try{
        await fs.appendFile("log.txt",`${event} : ${JSON.stringify(data)}\n`)
    }
    catch(err){
        console.log(err);
        
    }
})