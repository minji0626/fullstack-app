import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/thunkFunctions';

const LoginPage = () => {

  // register는 react-hook-form의 문법
const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({mode : 'onChange'})

  const dispatch = useDispatch();

  const onSubmit = ({email, password}) => {

    const body ={
      email,
      password
    };

    dispatch(loginUser(body));
    reset();
  }

  const userEmail = {
    required: "필수 필드입니다."
  }

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다."
    }
  }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto font-[Noto Sans KR]'>
      <div className='p-6 bg-white rounded-me shadow-md'>
        <h1 className='text-2xl font-semibold text-center'>
          로그인
        </h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label htmlFor="email" className='text-sm font-semibold text-gray-800 hover'>
              Email
            </label>
            <input type="email" id="email" className='w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md cursor-pointer' 
            {...register("email", userEmail)} />
            {errors?.email &&
              <div>
                <span className='text-red-500 text-sm'>
                  {errors.email.message}
                  {/* errors안에 email이 포함되어 있을 때 해당 문구를 표시한다 */}
                </span>
              </div>
            }
          </div>

          <div className='mb-2'>
            <label htmlFor="password" className='text-sm font-semibold text-gray-800'>
              Password
            </label>
            <input type="password" id="password" className='w-full px-4 py-2 mt-2 bg-white border border-gray-300  rounded-md cursor-pointer' 
            {...register("password", userPassword)}/>
            {errors?.password &&
              <div>
                <span className='text-red-500 text-sm'>
                  {errors.password.message}
                </span>
              </div>
            }
          </div>

          <div className='mt-6'>
            <button type="submit" className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer duration-200'>
              로그인
            </button>
          </div>
        </form>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          {" "}아이디가 없다면?{" "}
          <a href='/register' className='font-medium hover:underline'>
            회원가입
          </a>
        </p>

      </div>
    </section>
  )
}

export default LoginPage