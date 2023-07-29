import mongoose from 'mongoose'

let isConnected = false // track connection

export const connectToDB = async  () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('Mongodb is already connected')
        return
    } else {
        console.log('mongodb not connected')
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "db_promptio",
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })

        isConnected = true
        console.log('Mongodb connected')
    } catch(error) {
        console.log('mongoose connect error:', error)
    }
}