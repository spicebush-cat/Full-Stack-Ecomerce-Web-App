const Title = ({text1,text2}) => {
    return (
        <div className="flex flex-col justify-center  items-center gap-3">
            <div className='flex items-center gap-2 text-[#414141]'>
                <p className='font-semibold text-3xl '><span className="font-extralight text-gray-500 ">{text1} </span> W{text2}</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'/>
            </div>
            <p className="font-light text-stone-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit cumque voluptatibus asperiores delectus. </p>
        </div>
    )
}
export default Title