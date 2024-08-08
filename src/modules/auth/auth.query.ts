import { query } from 'express';

export class AuthQueries {
  getUserData(email: any) {
    const query = `select * from user_tb where email='${email}'`;
    return {
      name: 'UserData',
      type: 'SELECT',
      query: query,
    };
  }

  login(email: string, password: string) {
    const query = `select u.user_id,first_name,gender,user_role,email,phone_number,u.created_at,auth_type,value from user_tb u,passport p where 
    u.user_id=p.user_id and u.email='${email}' and p.value='${password}'`;
    return {
      name: 'Login',
      type: 'SELECT',
      query: query,
    };
  }

  Usersession(user_id: string, access_token: string, refresh_token: string) {
    const query = `INSERT INTO DbEvent.user_session_tb(user_id,device_id,serial_number,access_token,refresh_token,created_at)
    VALUES(${user_id},1211,'12545828','${access_token}','${refresh_token}',NOW())
    ON DUPLICATE KEY UPDATE
    device_id = VALUES(device_id),
    serial_number = VALUES(serial_number),
    access_token = VALUES(access_token),
    refresh_token = VALUES(refresh_token),
    created_at = NOW()
    `;

    console.log('🚀 ~ AuthQueries ~ Usersession ~ query:', query);
    return {
      name: 'Usersession',
      type: 'INSERT',
      query: query,
    };
  }

  UserRegister(keys: any, values: any) {
    const query = `INSERT INTO user_tb(${keys}) VALUES(${values})`;

    console.log('🚀 ~ AuthQueries ~ UserRegister ~ query:', query);
    return {
      name: 'Register',
      type: 'INSERT',
      query: query,
    };
  }

  Passport(user_id: number, password: string, email: string) {
    const query = `INSERT INTO passport(user_id,auth_type,type,identifier,value,status) 
    VALUES(${user_id},'Local','email','${email}','${password}',0)`;
    return {
      name: 'Passport',
      type: 'INSERT',
      query: query,
    };
  }

  getRefreshToken(token: string) {
    const query = `select * from user_session_tb where refresh_token='${token}'`;
    return {
      name: 'Refresh Token',
      type: 'SELECT',
      query: query,
    };
  }

  createRefreshToken(user_id: number, token: string, refreshtoken: string) {
    const query = `INSERT INTO user_session_tb(user_id,access_token,refresh_token)
    VALUES(${user_id},'${token}','${refreshtoken}')
    ON DUPLICATE KEY UPDATE
    access_token=VALUES(access_token),
    refresh_token=VALUES(refresh_token)
    `;
    return {
      name: 'Create Refresh Token ',
      type: 'INSERT',
      query: query,
    };
  }

  createOtp(user_id: number, otp: number) {
    const query = `INSERT INTO otp_tb(user_id,otp) values(${user_id},${otp}) 
    ON DUPLICATE KEY UPDATE
    otp=VALUES(otp) `;
    console.log('🚀 ~ AuthQueries ~ createOtp ~ query:', query);
    return {
      name: 'OTP',
      type: 'INSERT',
      query: query,
    };
  }

  confimOtp(otp: any, email: any) {
    const query = `SELECT * from user_tb u,otp_tb o where u.user_id = o.user_id AND o.otp=${otp} AND u.email='${email}'`;
    console.log('🚀 ~ AuthQueries ~ confimOtp ~ query:', query);
    return {
      name: 'confirm-OTP',
      type: 'SELECt',
      query: query,
    };
  }
}
