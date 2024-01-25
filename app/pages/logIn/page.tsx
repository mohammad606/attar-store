'use client'

import FormLogIn from "@/app/commponents/logIn/formLogIn"

export default  function  SignIn() {




    return (
        <div className='m-0 p-0 font-serif w-full h-full'>
            <img className='w-full h-[100vh] BackGroundLogIn'
                 src="https://dc700.4shared.com/img/2vmme74Pjq/s24/189a79f3ff8/wallpaperflarecom_wallpaper?async=&rand=0.06381768409681698" alt="" />
            <div className='absolute top-1/2 left-1/2 w-[400px] msm:w-[90%] p-6 translate-x-[-50%] translate-y-[-50%] box-border
                            flex flex-col
                            rounded-3xl' style={{boxShadow:'0 15px 25px rgba(0, 0, 0, .6)',background:'lab(14 -1.06 -3.31 / 0.51)'}}>
                <h2 className='mr-3 p-0 text-white text-inherit text-3xl'>Login</h2>
                <FormLogIn/>
            </div>
        </div>
    );
}
