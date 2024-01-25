'use client'
import {usePathname} from "next/navigation";
import {useState , useEffect} from "react";
import Links from "@/app/commponents/nav/links";
import { useCookies } from 'next-client-cookies';


const Mnu = ()=>{
    const coc:string|undefined = useCookies().get('token')
    let wAndh = useWindowSize();

    const [show ,setShow] = useState<boolean>(false)

    const HandleShow = ()=>{
        show?setShow(false):setShow(true)
    }


    return (
        <div className='w-3/4 h-full msm:w-2/4 '>
            {coc?
              <>
                  <div className= 'w-full h-full pl-[20%] flex flex-row mr-4 items-center justify-evenly ' >
                      {wAndh.width <= 500 ?
                          <div className='w-10 h-10 cursor-pointer' onClick={HandleShow}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Menu"><g data-name="Layer 2" fill="#efefef" className="color000000 svgShape"><g data-name="menu" fill="#efefef" className="color000000 svgShape"><rect width="18" height="2" x="3" y="11" rx=".95" ry=".95" fill="#efefef" className="color000000 svgShape"></rect><rect width="18" height="2" x="3" y="16" rx=".95" ry=".95" fill="#efefef" className="color000000 svgShape"></rect><rect width="18" height="2" x="3" y="6" rx=".95" ry=".95" fill="#efefef" className="color000000 svgShape"></rect></g></g></svg>

                          </div>
                          :
                          <>
                              <Links show={show}/>
                          </>}

                  </div>

                  <div className='fixed top-0 right-0 z-20 flex-col bg-slate-900 w-full h-full py-10 pl-10 duration-500 ease-in-out'
                       style={show?{display:'flex',transform:'translate(0px, 0px)'}:{display:'flex',transform:'translate(100%, 0px)'}}>
                      <p className='text-2xl cursor-pointer' onClick={HandleShow} >X</p>
                      <div className='w-full h-[300px] flex flex-col justify-evenly items-end pr-8'>
                          <Links show={show}/>
                      </div>
                  </div>
              </>
            :
            <div className='w-full h-full pl-[20%] flex flex-row mr-4 items-center justify-end '>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={(e)=>{
                            e.preventDefault()
                            return window.location.replace('pages/logIn')
                        }}>
                        LogIn
                </button>

            </div>}

        </div>
    )
}

export default Mnu


function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}