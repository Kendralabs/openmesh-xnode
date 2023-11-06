'use client'
import { DataProvider } from '@/types/dataProvider'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

const SingleCard = ({
  id,
  name,
  description,
  createdAt,
  company,
  sql,
  logoURL,
  tags,
  updatedAt,
  live,
  download,
  isThirdParty,
}: DataProvider) => {
  let timeAgo = formatDistanceToNow(new Date(updatedAt), { addSuffix: true })
  timeAgo = timeAgo.replace('about', '').trim()

  const [addVisible, setAddVisible] = useState<Boolean>(false)

  return (
    <div
      onMouseEnter={() => setAddVisible(true)}
      onMouseLeave={() => setAddVisible(false)}
      className="flex justify-start gap-x-[10px] rounded-[5px] border-[0.5px] border-[#D9D9D9] px-[7px] py-[15px] text-start text-[#000000] shadow-[0_5px_8px_0px_rgba(0,0,0,0.10)] md:max-w-[600px] lg:p-[21px] xl:gap-x-[20px]  xl:p-[24px] 2xl:max-w-[1000px] 2xl:gap-x-[25px] 2xl:p-[30px]"
    >
      <div className="flex-grow-1 h-[52px] w-[52px] 2xl:h-[64px] 2xl:w-[64px] ">
        {logoURL ? (
          <img
            src={logoURL}
            alt="image"
            className={`mx-auto flex rounded-[5px] p-[3px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]`}
          />
        ) : (
          <img
            src={`/openmesh-ico-logo.png`}
            alt="image"
            className={`mx-auto flex h-[25px] w-[25px] rounded-[5px] p-[3px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] lg:h-[30px] lg:w-[30px] lg:p-[7px] xl:h-[40px] xl:w-[40px]`}
          />
        )}

        {isThirdParty && (
          <div className="mx-auto mt-[7px] flex justify-center xl:mt-[8px] 2xl:mt-[10px]">
            <img
              src={`${
                process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                  ? process.env.NEXT_PUBLIC_BASE_PATH
                  : ''
              }/images/dataset/third.svg`}
              alt="image"
              className={`w-[46.5] 2xl:w-[58px]`}
            />
          </div>
        )}
        {!isThirdParty && (
          <div className="mx-auto mt-[4px] flex justify-center text-[7px] font-semibold text-[#12AD50] lg:!leading-[17px] xl:mt-[8px] xl:text-[11px] 2xl:mt-[10px] 2xl:text-[14px]">
            Free
          </div>
        )}
      </div>
      <div className="flex-grow-0">
        <div>
          <div className="flex gap-x-[5px] lg:gap-x-[8px] 2xl:gap-x-[10px]">
            <a href={`${`data-product/${id}`}`}>
              <div
                className={`text-[10px] font-bold text-[#313131] hover:text-[#000] hover:underline md:text-[12px] lg:text-[14px] lg:!leading-[22px]  2xl:text-[18px]`}
              >
                {name}
              </div>
            </a>
            <div className="h-fit rounded-[5px] border-[1px] border-[#FFC946] bg-[#FFE9B2] px-[4px] py-[2] text-[5px] font-semibold lg:px-[5px] lg:py-[4px] lg:text-[8px] 2xl:px-[7px] 2xl:py-[5px] 2xl:text-[10px] 2xl:!leading-[12px]">
              NEW!
            </div>
            <div
              onClick={() => {
                // setNext(true)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`ml-auto ${
                addVisible ? 'flex' : 'hidden'
              }  cursor-pointer rounded-[5px] bg-[#0354EC] px-[7px] py-[3px]  text-[6.5px] font-medium text-[#fff] hover:bg-[#123981]  md:text-[7px] lg:py-[2.8px] lg:px-[6px] lg:text-[8.5px] lg:!leading-[15px] xl:py-[3.2px] xl:px-[6.8px] xl:text-[9.5px]  2xl:py-[4px] 2xl:px-[8.5px] 2xl:text-[12px]`}
            >
              <div>Add</div>
            </div>
            <div
              className={`ml-auto flex gap-x-[5px] lg:gap-x-[8px] 2xl:gap-x-[10px] ${
                addVisible ? 'hidden' : ''
              }`}
            >
              {live && (
                <img
                  src={`/images/hero/live2.svg`}
                  alt="image"
                  className={`h-[15px] w-[22.5px] lg:h-[25px] lg:w-[40px] 2xl:h-[30px] 2xl:w-[45px]`}
                />
              )}
              {download && (
                <img
                  src={`/images/hero/download.svg`}
                  alt="image"
                  className={`h-[15px] w-[22.5px] lg:h-[25px] lg:w-[40px] 2xl:h-[30px] 2xl:w-[45px]`}
                />
              )}
            </div>
          </div>
          <div className="lg::mt-[8px] mt-[5px] text-[8px] font-semibold text-[#505050] lg:text-[13px] lg:!leading-[19px] 2xl:mt-[10px] 2xl:text-[16px]">
            {company} •{' '}
            <span className="text-[7px] font-medium lg:text-[11px] 2xl:text-[14px]">
              Updated {timeAgo}
            </span>
          </div>

          <div
            title={description}
            className="mt-[8px]  overflow-hidden text-[8px] font-medium text-[#959595] line-clamp-5 md:text-[10px]  lg:mt-[12px] lg:text-[12px] lg:!leading-[19px]  xl:max-w-[480px] 2xl:mt-[15px] 2xl:max-w-[600px] 2xl:text-[16px]"
          >
            {description}
          </div>
          <div className="mt-[10px] flex max-w-[800px] flex-wrap  gap-x-[5px] gap-y-[3px] lg:gap-x-[10px] lg:gap-y-[10px] 2xl:mt-[12px]">
            {tags &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="w-fit rounded-[20px]  border-[1px] border-[#D9D9D9] bg-[#F6F6F6] px-[7px] py-[4px] text-[5px] font-medium text-[#575757] md:text-[8px] lg:px-[12px] lg:py-[6px] lg:!leading-[12px] 2xl:py-[7px] 2xl:px-[15px]  2xl:text-[10px]"
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCard
