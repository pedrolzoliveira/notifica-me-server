import { CustomersService } from './customers.service'
import { hash, compare } from 'bcrypt'
import { AdminService } from './admin.service'

class signUpDTO {
  name: string
  email: string
  password: string
}

class signInDTO {
  email: string
  password: string
}

export class AuthService {
  constructor (
    private readonly customersService: CustomersService,
    private readonly adminService: AdminService
  ) {}

  async signUp(data: signUpDTO) {
    const hashedPassword = await hash(data.password, 10)
    const customer = await this.customersService.create({
      name: data.name,
      passwordHash: hashedPassword,
      email: data.email
    })
    return customer
  }

  async signIn(data: signInDTO) {
    const customer = await this.customersService.findByEmail(data.email)
    if (!customer) {
      throw new Error('Customer not found')
    }
    const isPasswordCorrect = await compare(data.password, customer.passwordHash)
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect')
    }
    delete customer.passwordHash
    return customer
  }

  async signInAdmin(data: signInDTO) {
    const admin = await this.adminService.findByEmail(data.email)
    if (!admin) {
      throw new Error('Customer not found')
    }
    const isPasswordCorrect = await compare(data.password, admin.passwordHash)
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect')
    }
    delete admin.passwordHash
    return admin
  }

  async signUpAdmin(data: signUpDTO) {
    const hashedPassword = await hash(data.password, 10)
    const admin = await this.adminService.create({
      name: data.name,
      passwordHash: hashedPassword,
      email: data.email
    })
    return admin
  }
}
