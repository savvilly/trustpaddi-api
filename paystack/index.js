
const axios = require('../config/axios')

exports.initPay = async (email, amount, url) => {

  try {
    const payload = {
      email: email,
      amount: amount * 100,
      callback_url: url
    }
    const { data } = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        payload
      )
  
      return data
  } catch (error) {
    throw error
  }
}

exports.createCustomer = async (first_name, last_name, email, phone) => {

  try {
    const payload = {
      first_name,
      last_name,
      email,
      phone
    }
  
    const { data } = await axios.post('https://api.paystack.co/customer', payload)

    return data
  } catch (error) {
    throw error
  }

}

exports.getCustomers = async () => {
  const { data } = await axios.get('https://api.paystack.co/customer')
  return data
}

exports.getCustomer = async (email) => {
  const { data } = await axios.get(`https://api.paystack.co/customer/:${email}`)
  return data
}

exports.getBanks = async (email) => {
  const { data } = await axios.get(`https://api.paystack.co/bank/country=nigeria`)
  return data
}

exports.updateCustomer = async (first_name, last_name, email, phone, code) => {
  const payload = {
    first_name,
    last_name,
    email,
    phone
  }
  
  const { data } = await axios.put(`https://api.paystack.co/customer/:${code}`, payload)
  return data
}