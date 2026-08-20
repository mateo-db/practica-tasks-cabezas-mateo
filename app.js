//importamos herramienta desde libreria para trabajar con expres
import express from 'express';
import 'dotenv/config'

//importamos función de arranque de bd, modelos y enrutadores
import { rundb } from './src/config/database.js'
import { User } from './src/models/user.model.js';
import { Task } from './src/models/task.model.js';
import userRouter from './src/routes/user.routes.js';
import taskRouter from './src/routes/task.routes.js';
import tagRouter from './src/routes/tag.routes.js';
import profileRouter from './src/routes/profile.routes.js';
import taskTagRouter from './src/routes/task_tag.routes.js';

//variable con express activado
const app = express()

//variable con middleware json activado
app.use(express.json())

//activamos los routers
app.use("/api", userRouter)
app.use("/api", taskRouter)
app.use("/api", profileRouter)
app.use("/api", tagRouter)
app.use("/api", taskTagRouter)

const PORT = process.env.PORT

//dejamos al servidor en "escucha"
app.listen(PORT, async () => {
    await rundb()
    console.log(`Servidor corriendo exitosamente en puerto ${PORT}`)
})

