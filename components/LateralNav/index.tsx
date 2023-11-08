/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import Dropdown from '../Dropdown'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import LatencySelector from '../LatencySelector'
import { title } from 'process'
import { AccountContext } from '@/contexts/AccountContext'
import SubBarData from '../SubBarData'
import SubBarServers from '../SubBarServers'
import SubBarAPIs from '../SubBarAPIs'
import SubBarAnalytics from '../SubBarAnalytics'
import SubBarRPC from '../SubBarRPC'
import SubBarUtility from '../SubBarUtility'

/* eslint-disable react/no-unescaped-entities */
const LateralNav = ({ onValueChange }) => {
  const [presetId, setPresetId] = useState(0)
  const {
    selectionSideNavBar,
    setSelectionSideNavBar,
    next,
    setNext,
    nextFromScratch,
    setNextFromScratch,
  } = useContext(AccountContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [greenDotOpacity, setGreenDotOpacity] = useState(0)
  const { push } = useRouter()
  const [hoveredIcon, setHoveredIcon] = useState(null)

  const preSetsOptions = [
    {
      icon: '/images/lateralNavBar/new-home.png',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Home',
    },
    {
      icon: '/images/lateralNavBar/new-dashboard.svg',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Dashboard',
    },
    {
      icon: '/images/lateralNavBar/new-servers.svg',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Servers',
    },
    {
      icon: '/images/lateralNavBar/new-data.svg',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Data',
    },
    {
      icon: '/images/lateralNavBar/new-apis.png',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'APIs',
    },
    {
      icon: '/images/lateralNavBar/new-rpc.png',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'RPC',
    },
    {
      icon: '/images/lateralNavBar/new-analytics.svg',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Analytics',
    },
    {
      icon: '/images/lateralNavBar/new-data-management.svg',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Data management',
    },
    {
      icon: '/images/lateralNavBar/new-storage.svg',
      iconStyle: 'w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Storage',
    },
    {
      icon: '/images/lateralNavBar/new-compute.svg',
      iconStyle:
        'w-[11px] md:w-[13.2px] lg:w-[15.5px] xl:w-[18px] 2xl:w-[22px]',
      title: 'Compute',
    },
    {
      icon: '/images/lateralNavBar/new-trading.svg',
      iconStyle: 'w-[9px] md:w-[11px] lg:w-[12.6px] xl:w-[14.5px] 2xl:w-[18px]',
      title: 'Trading',
    },
    {
      icon: '/images/lateralNavBar/new-ai.svg',
      iconStyle:
        'w-[11px] md:w-[13.2px] lg:w-[15.5px] xl:w-[18px] 2xl:w-[22px]',
      title: 'ML/LLMs',
    },
    {
      icon: '/images/lateralNavBar/new-apps.svg',
      iconStyle: 'w-[10px]  md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Apps',
    },
    {
      icon: '/images/lateralNavBar/new-utility.svg',
      iconStyle: 'w-[10px]  md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Utility',
    },
    {
      icon: '/images/lateralNavBar/new-docs.svg',
      iconStyle: 'w-[10px]  md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Docs',
    },
    {
      icon: '/images/lateralNavBar/new-profile.png',
      iconStyle: 'w-[10px]  md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]',
      title: 'Profile',
    },
  ]

  function handleButtonClick(title: string) {
    if (title === 'Home') {
      setNextFromScratch(false)
      setNext(false)
      push('/start-here')
      return
    }
    if (!next && !nextFromScratch && title !== 'Home') {
      setGreenDotOpacity(1) // Mostrar a bolinha verde com opacidade total
      setTimeout(() => setGreenDotOpacity(0), 1000) // Esconder a bolinha verde após 5 segundos
    } else {
      setSelectionSideNavBar(title)
    }
    setHoveredIcon(title)
  }

  function handleButtonHover(title: string) {
    if (!next && !nextFromScratch && title !== 'Home') {
      return
    } else {
      setHoveredIcon(title)
    }
  }

  if (!isOpen) {
    return (
      <>
        <div
          onMouseEnter={() => setIsOpen(true)}
          className="z-50 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <div className="flex w-[42px] flex-col items-center justify-center px-[15px] pb-[45px] pt-[14px] md:w-[51px] md:px-[11.5px] md:pb-[54px] md:pt-[17px] lg:w-[60px] lg:px-[13.5px] lg:pb-[63px] lg:pt-[20px] xl:w-[68px] xl:px-[15px] xl:pb-[72px] xl:pt-[23px] 2xl:w-[85px] 2xl:px-[15px] 2xl:pb-[90px] 2xl:pt-[28px]">
            <div
              className={`mb-[29px] h-[12px] w-[20.5px] md:mb-[35px] lg:mb-[40px] xl:mb-[47px] 2xl:mb-[58px] `}
            >
              <img
                onClick={() => setIsOpen(true)}
                src="/images/lateralNavBar/nav.svg"
                alt="image"
              />
            </div>
            <ul className="flex flex-col items-center gap-[40px]">
              {preSetsOptions.map((option, index) => (
                <li className="relative" key={index}>
                  <img
                    src={option.icon}
                    alt="image"
                    className={option.iconStyle}
                  />
                  <img
                    src="/images/lateralNavBar/new-arrow.svg"
                    alt="image"
                    className={` ${
                      option.title === 'Home' || option.title === 'Dashboard'
                        ? 'hidden'
                        : ''
                    } absolute top-[2.5px] right-[14px] w-[4px] md:top-[3px] md:right-[16.8px] md:w-[4.8px] lg:top-[3.5px] lg:right-[19.6px] lg:w-[5.6px] xl:top-[4px] xl:right-[22.4px] xl:w-[6.4px] 2xl:top-[5px] 2xl:right-[28px] 2xl:w-[8px]`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        onMouseLeave={() => setIsOpen(false)}
        className="relative z-50 max-w-[109px] pb-[200px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] md:w-full md:max-w-[130px]  md:pb-[600px] lg:max-w-[152px] xl:max-w-[180px] 2xl:max-w-[230px]"
      >
        <div className="flex  flex-col items-start">
          <div className="mb-[13px] mt-[14px] flex h-[39px] w-[177px] flex-row items-center justify-between md:mb-[16px] lg:mb-[19px] xl:mb-[22px] 2xl:mb-[27px]   ">
            <div className="ml-[15px] flex h-[12px] w-[20.4px] cursor-pointer flex-col items-center  ">
              <img
                onClick={() => setIsOpen(false)}
                src="/images/lateralNavBar/nav.svg"
                alt="image"
              />
            </div>
            <a
              href={'/'}
              className="ml-[18.6px] mr-[18.6px] flex h-[39px] w-[99px] cursor-pointer flex-col items-center "
            >
              <img src="/images/logo/xnode-logo.svg" alt="image" />
            </a>
          </div>
          {preSetsOptions.map((option, index) => (
            <div
              key={index}
              onMouseEnter={() => handleButtonHover(option.title)}
              onClick={() => {
                handleButtonClick(option.title)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`relative flex h-[24px] w-full flex-row items-center justify-between gap-[15px] px-[13px]  py-[20px] md:px-[20px] md:py-[24px] lg:px-[23px] lg:py-[28px] xl:px-[27px] xl:py-[32px] 2xl:px-[33px]  2xl:py-[40px] ${
                !next && !nextFromScratch && option.title !== 'Home'
                  ? 'w-full opacity-50 hover:bg-[#fff]'
                  : 'cursor-pointer hover:bg-[#F4F4F4]'
              } ${selectionSideNavBar === option.title ? 'bg-[#F4F4F4]' : ''}`}
            >
              <img
                src={option.icon}
                alt="image"
                className={`${option.iconStyle}  mx-auto`}
              />
              {option.title === 'Home' && (
                <img
                  src="/images/lateralNavBar/green-ellipse.svg"
                  alt="green dot"
                  style={{ opacity: greenDotOpacity }}
                  className="absolute top-2 right-2 h-3 w-3 transition-opacity duration-500"
                />
              )}
              <div className=" flex w-full items-center text-start font-inter text-[9px] font-medium !-tracking-[2%] text-[#000]  md:text-[8.4px] lg:text-[10px] lg:!leading-[19px]  xl:text-[11.2px] 2xl:text-[14px]">
                {option.title}
              </div>
              <img
                src="/images/lateralNavBar/new-arrow.svg"
                alt="image"
                className={` ${
                  option.title === 'Home' || option.title === 'Dashboard'
                    ? 'hidden'
                    : ''
                } absolute top-[17.5px] left-[7px] w-[4px] md:top-[21px] md:right-[9px] md:w-[4.8px] lg:top-[24.5px] lg:left-[10.5px] lg:w-[5.6px] xl:top-[28px] xl:left-[12px] xl:w-[6.4px] 2xl:top-[35px] 2xl:left-[15px] 2xl:w-[8px]`}
              />
            </div>
          ))}
        </div>
        {hoveredIcon === 'Data' && (
          <div className="absolute top-[80px] -right-[277px] 2xl:top-[105px] 2xl:-right-[340px]">
            <SubBarData onValueChange={console.log('hello')} />
          </div>
        )}
        {hoveredIcon === 'Servers' && (
          <div className="absolute top-[80px] -right-[277px] 2xl:top-[105px] 2xl:-right-[340px]">
            <SubBarServers onValueChange={console.log('hello')} />
          </div>
        )}
        {hoveredIcon === 'APIs' && (
          <div className="absolute top-[80px] -right-[277px] 2xl:top-[105px] 2xl:-right-[340px]">
            <SubBarAPIs onValueChange={console.log('hello')} />
          </div>
        )}
        {hoveredIcon === 'Analytics' && (
          <div
            onMouseLeave={() => setHoveredIcon(null)}
            className="absolute top-[80px] -right-[277px] 2xl:top-[105px] 2xl:-right-[340px]"
          >
            <SubBarAnalytics onValueChange={console.log('hello')} />
          </div>
        )}
        {hoveredIcon === 'RPC' && (
          <div
            onMouseLeave={() => setHoveredIcon(null)}
            className="absolute top-[80px] -right-[277px] 2xl:top-[105px] 2xl:-right-[340px]"
          >
            <SubBarRPC onValueChange={console.log('hello')} />
          </div>
        )}
        {hoveredIcon === 'Utility' ? (
          <div className="absolute top-[80px] -right-[277px] 2xl:top-[105px] 2xl:-right-[340px]">
            <SubBarUtility onValueChange={console.log('valueChanged')} />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default LateralNav
