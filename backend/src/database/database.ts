import mongoose from 'mongoose'
import chalk from 'chalk'
import 'dotenv/config' // Nạp biến môi trường từ file .env

const dbUrl = process.env.DB_URL // Không cần template string `${}`

export const connectMongoDB = async () => {
  try {
    if (!dbUrl) {
      throw new Error()
    }
    await mongoose.connect(dbUrl)
    console.log(chalk.green('Connected to MongoDB successfully'))
  } catch (error) {
    console.log(chalk.red('Failed to connect to MongoDB' + error))
    process.exit(1) // Thoát quá trình nếu không thể kết nối
  }
}
