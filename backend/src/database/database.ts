import mongoose from 'mongoose'
import chalk from 'chalk'
import 'dotenv/config' // Nạp biến môi trường từ file .env
import { CategoryModel } from './models/category.model' // Đường dẫn chính xác tới tệp
import { ProductModel } from './models/product.model'
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

  const categories = await CategoryModel.find()
}

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}
