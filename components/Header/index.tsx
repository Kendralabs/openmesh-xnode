/* eslint-disable no-unused-vars */
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import ThemeToggler from './ThemeToggler'
import menuData from './menuData'
import { UserCircle } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { parseCookies, destroyCookie } from 'nookies'
import axios from 'axios'
import { AccountContext } from '../../contexts/AccountContext'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [userNavbarOpen, setUserNavbarOpen] = useState(false)
  const [userConnected, setUserConnected] = useState()
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen)
  }
  const [projectName, setProjectName] = useState('Project Name')
  const [isEditing, setIsEditing] = useState(false)
  const pathname = usePathname()
  const isFAQPage = pathname.includes('/faqs')
  const { push } = useRouter()

  const cookies = parseCookies()
  const userHasAnyCookie = cookies.userSessionToken

  const {
    user,
    setUser,
    next,
    setNext,
    nextFromScratch,
    finalNodes,
    setReviewYourBuild,
    reviewYourBuild,
  } = useContext(AccountContext)

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1)
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }

  function onClickTrans(element: string) {
    const taskStartElement = document.getElementById(element)
    taskStartElement.scrollIntoView({ behavior: 'smooth' })
  }

  function signOutUser() {
    destroyCookie(undefined, 'userSessionToken')
    setUser(null)
  }

  const features = [
    {
      label: 'Browse',
      isCurrentlyPage: false,
      href: `/`,
    },
    {
      label: 'Become a data provider',
      isCurrentlyPage: false,
      href: `/become`,
    },
    {
      label: 'FAQs',
      isCurrentlyPage: false,
      href: `/faqs`,
    },
  ]

  const headerItens = [
    {
      label: 'About',
      href: `https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/openmesh-overview`,
    },
    {
      label: 'Use cases',
      href: `https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/use-cases`,
    },
    {
      label: 'Innovation',
      href: `https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/vision-and-roadmap`,
    },
    {
      label: 'Docs',
      href: `/docs`,
    },
  ]

  async function getUserData() {
    const { userSessionToken } = parseCookies()
    console.log('no user data')
    console.log(userSessionToken)
    if (userSessionToken) {
      const config = {
        method: 'post' as 'post',
        url: `${process.env.NEXT_PUBLIC_API_BACKEND_BASE_URL}/openmesh-experts/functions/getCurrentUser`,
        headers: {
          'x-parse-application-id': `${process.env.NEXT_PUBLIC_API_BACKEND_KEY}`,
          'X-Parse-Session-Token': userSessionToken,
          'Content-Type': 'application/json',
        },
      }
      let dado

      await axios(config).then(function (response) {
        if (response.data) {
          dado = response.data
          console.log(dado)
          setUser(dado)
        }
      })
    }
  }

  useEffect(() => {
    if (userHasAnyCookie) {
      console.log('user has cookis')
      console.log(userHasAnyCookie)
      console.log(cookies.userSessionToken)
      try {
        getUserData()
      } catch (err) {
        destroyCookie(undefined, 'userSessionToken')
        setUser(null)
      }
    } else {
      localStorage.removeItem('@scalable: user-state-1.0.0')
      destroyCookie(undefined, 'userSessionToken')
      setUser(null)
    }
  }, [])

  if ((next || nextFromScratch) && !reviewYourBuild) {
    return (
      <>
        <header className="top-0 left-0 z-40 mx-0 flex w-full items-center bg-[#fff]  pt-[45px] text-[#000000] md:pt-[54px] lg:pt-[62px] xl:pt-[72px] xl:pb-[27.8px] 2xl:pt-[90px] 2xl:pb-[46px]">
          <div className="w-full justify-between px-[20px] md:px-[33px] xl:hidden">
            <div className="">
              <img
                src={`${
                  process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                    ? process.env.NEXT_PUBLIC_BASE_PATH
                    : ''
                }/images/new/openmesh-logo-new.png`}
                alt="image"
                className={`w-[150px]`}
              />
            </div>
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="absolute right-7 top-7 block  rounded-lg px-3 py-[6px] ring-primary focus:ring-2"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                  navbarOpen ? ' top-[7px] rotate-45' : ' '
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                  navbarOpen ? 'opacity-0 ' : ' '
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                  navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                }`}
              />
            </button>
            <nav
              id="navbarCollapse"
              className={`navbar absolute right-7 z-50 w-[250px] rounded border-[.5px] bg-[#e6e4e4] py-6  px-6 text-[13px] text-[#fff] duration-300  ${
                navbarOpen
                  ? 'visibility top-20 opacity-100'
                  : 'invisible top-20 opacity-0'
              }`}
            >
              <div className=" grid gap-y-[15px] text-[12px]  font-medium !leading-[19px]">
                <div className="my-auto flex text-center md:justify-center">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/community/register`}
                    className="flex cursor-pointer items-center rounded-[5px] bg-[#0354EC] py-[4.5px] px-[9px] text-[10px] font-bold !leading-[19px] text-[#fff] hover:border hover:border-[#0354EC] hover:bg-[#fff] hover:text-[#0354EC] md:py-[9px] md:px-[18px] md:text-[14px] 2xl:py-[11.5px] 2xl:px-[35px] 2xl:text-[16px]"
                  >
                    Schedule a call
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="mx-auto hidden h-full w-full max-w-[1800px] items-start justify-between px-[33px] xl:flex">
            <div className="flex items-center">
              <img
                src={`/images/header/user.svg`}
                alt="image"
                className="w-[16px] md:w-[19.2px] lg:w-[22.4px] xl:w-[25.5px] 2xl:w-[32px]"
              />
              {isEditing ? (
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  className="ml-[5px] bg-[#fff]"
                  autoFocus
                />
              ) : (
                <div className="ml-[5px] text-[12px] font-bold text-[#313131] md:ml-[6px] md:text-[14.5px] lg:ml-[7px] lg:text-[17px] xl:ml-[8px] xl:text-[19px] 2xl:ml-[10px] 2xl:text-[24px]">
                  {projectName}
                </div>
              )}
              {isEditing ? (
                <div
                  onClick={() => setIsEditing(false)}
                  className="ml-[5px] cursor-pointer text-[7.5px] font-medium text-[#0354EC] md:ml-[6px] md:text-[8.5px] lg:ml-[7px] lg:text-[10px] xl:ml-[8px] xl:text-[11.2px] 2xl:ml-[10px] 2xl:text-[14px]"
                >
                  Save
                </div>
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className="ml-[5px] cursor-pointer text-[7.5px] font-medium text-[#0354EC] md:ml-[6px] md:text-[8.5px] lg:ml-[7px] lg:text-[10px] xl:ml-[8px] xl:text-[11.2px] 2xl:ml-[10px] 2xl:text-[14px]"
                >
                  Edit
                </div>
              )}
              <img
                src={`/images/header/config.svg`}
                alt="image"
                className="ml-[7.5px] w-[8px] md:ml-[9px] md:w-[10.8px] lg:ml-[10.5px] lg:w-[12.6px] xl:ml-[12px] xl:w-[14.5px] 2xl:ml-[15px] 2xl:w-[18px]"
              />
            </div>
            <div className="flex gap-x-[55px] md:gap-x-[66px] lg:gap-x-[77px] xl:gap-x-[88px] 2xl:gap-x-[110px]">
              <div className="">
                <div className="text-[7px] font-light md:text-[8.5px] lg:text-[10px] xl:text-[11.2px] 2xl:text-[14px]">
                  Estimated monthly price*
                </div>
                <div className="text-[13px] font-medium md:text-[15.5px] lg:text-[18px] xl:text-[21px] 2xl:text-[26px]">
                  $<span className="font-bold">40</span> / month
                </div>
                <div className="mt-[5px] flex justify-between">
                  <div className="text-[7px] text-[#12AD50]  md:text-[8.4px]  lg:text-[10px]  xl:text-[11.2px] 2xl:text-[14px]">
                    ~$13,000 savings
                  </div>
                  <img
                    src={`/images/header/question.svg`}
                    alt="image"
                    className="mb-[5px] w-[6.5px]  md:w-[7.8px]  lg:w-[9.1px] xl:w-[10.4px] 2xl:w-[13px]"
                  />
                </div>
              </div>
              <div className="grid gap-y-[12px] text-[7px]  font-medium md:text-[8.4px] lg:text-[10px] xl:text-[11.2px] 2xl:text-[14px]">
                <div className="flex h-fit cursor-pointer justify-center gap-x-[8px] rounded-[5px] bg-[#0354EC] py-[6.2px] px-[11px] text-center  text-[#fff] hover:bg-[#0e2e69]   md:py-[7.5px] md:px-[12.5px]    lg:py-[8.75px]  lg:px-[14.5px]  xl:py-[10px] xl:px-[17px]  2xl:gap-x-[10px] 2xl:py-[12.5px] 2xl:px-[21px]">
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                        ? process.env.NEXT_PUBLIC_BASE_PATH
                        : ''
                    }/images/header/storm.svg`}
                    alt="image"
                    className={`w-[5px] md:w-[6px] lg:w-[7px] xl:w-[8px] 2xl:w-[10px]`}
                  />
                  <div
                    onClick={() => {
                      console.log(finalNodes)
                      setReviewYourBuild(true)
                    }}
                  >
                    Create service and deploy
                  </div>
                </div>
                <div className="flex h-fit cursor-pointer justify-center gap-x-[5px]">
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                        ? process.env.NEXT_PUBLIC_BASE_PATH
                        : ''
                    }/images/header/arrow-down.svg`}
                    alt="image"
                    className={`w-[7px] md:w-[9px] lg:w-[10.5px] xl:w-[12px] 2xl:w-[15px]`}
                  />
                  <div className="text-[#959595] hover:text-[#7a7a7a]">
                    Download Service as PDF
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="lg:hidden">
            <Dialog.Root>
              <Dialog.Trigger>
                <List className="text-black" size={24} weight="bold" />
              </Dialog.Trigger>
              <HeaderModal navigationItems={navigationItems} />
            </Dialog.Root>
          </div> */}
          </div>
        </header>
      </>
    )
  }

  return (
    <>
      <header className="top-0 left-0 z-40 mx-0 flex w-full items-center bg-[#fff]  pt-[7px] text-[#000000] md:pt-[8px] lg:pt-[9px] xl:pt-[10.5px] xl:pb-[27.8px] 2xl:pt-[13px] 2xl:pb-[46px]">
        <div className="w-full justify-between py-[20px] px-[20px] md:px-[33px] xl:hidden">
          <div className="">
            <img
              src={`${
                process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                  ? process.env.NEXT_PUBLIC_BASE_PATH
                  : ''
              }/images/new/openmesh-logo-new.png`}
              alt="image"
              className={`w-[150px]`}
            />
          </div>
          <button
            onClick={navbarToggleHandler}
            id="navbarToggler"
            aria-label="Mobile Menu"
            className="absolute right-7 top-5 block  rounded-lg px-3 py-[6px] ring-primary focus:ring-2"
          >
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                navbarOpen ? ' top-[7px] rotate-45' : ' '
              }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                navbarOpen ? 'opacity-0 ' : ' '
              }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                navbarOpen ? ' top-[-8px] -rotate-45' : ' '
              }`}
            />
          </button>
          <nav
            id="navbarCollapse"
            className={`navbar absolute right-7 z-50 w-[250px] rounded border-[.5px] bg-[#e6e4e4] py-6  px-6 text-[13px] text-[#fff] duration-300  ${
              navbarOpen
                ? 'visibility top-20 opacity-100'
                : 'invisible top-20 opacity-0'
            }`}
          >
            <div className=" grid gap-y-[15px] text-[12px]  font-medium !leading-[19px]">
              <div className="my-auto flex text-center md:justify-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/community/register`}
                  className="flex cursor-pointer items-center rounded-[5px] bg-[#0354EC] py-[4.5px] px-[9px] text-[10px] font-bold !leading-[19px] text-[#fff] hover:border hover:border-[#0354EC] hover:bg-[#fff] hover:text-[#0354EC] md:py-[9px] md:px-[18px] md:text-[14px] 2xl:py-[11.5px] 2xl:px-[35px] 2xl:text-[16px]"
                >
                  Schedule a call
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="mx-auto hidden h-full w-full max-w-[1800px] items-start items-center justify-between px-[33px] xl:flex">
          <div className="flex items-center">
            <img
              src={`/images/header/user.svg`}
              alt="image"
              className="w-[16px] md:w-[19.2px] lg:w-[22.4px] xl:w-[25.5px] 2xl:w-[32px]"
            />
            {isEditing ? (
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                className="ml-[5px] bg-[#fff]"
                autoFocus
              />
            ) : (
              <div className="ml-[5px] text-[8px] font-bold text-[#313131] md:ml-[6px] md:text-[9.6px] lg:ml-[7px] lg:text-[11.2px] xl:ml-[8px] xl:text-[13px] 2xl:ml-[10px] 2xl:text-[16px]">
                {projectName}
              </div>
            )}
            {isEditing ? (
              <div
                onClick={() => setIsEditing(false)}
                className="ml-[5px] cursor-pointer text-[7.5px] font-medium text-[#0354EC] md:ml-[6px] md:text-[8.5px] lg:ml-[7px] lg:text-[10px] xl:ml-[8px] xl:text-[11.2px] 2xl:ml-[10px] 2xl:text-[14px]"
              >
                Save
              </div>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="ml-[5px] cursor-pointer text-[7.5px] font-medium text-[#0354EC] md:ml-[6px] md:text-[8.5px] lg:ml-[7px] lg:text-[10px] xl:ml-[8px] xl:text-[11.2px] 2xl:ml-[10px] 2xl:text-[14px]"
              >
                Edit
              </div>
            )}
            <img
              src={`/images/header/config.svg`}
              alt="image"
              className="ml-[7.5px] w-[8px] md:ml-[9px] md:w-[10.8px] lg:ml-[10.5px] lg:w-[12.6px] xl:ml-[12px] xl:w-[14.5px] 2xl:ml-[15px] 2xl:w-[18px]"
            />
          </div>
          <div className="flex gap-x-[55px] text-[7px] md:gap-x-[66px] md:text-[8.4px] lg:gap-x-[77px]  lg:text-[10px]  xl:gap-x-[88px] xl:text-[11.2px] 2xl:gap-x-[110px] 2xl:text-[14px]">
            {/* <div className="">
              <div className="text-[7px] font-light md:text-[8.5px] lg:text-[10px] xl:text-[11.2px] 2xl:text-[14px]">
                Estimated monthly price*
              </div>
              <div className="text-[13px] font-medium md:text-[15.5px] lg:text-[18px] xl:text-[21px] 2xl:text-[26px]">
                $<span className="font-bold">40</span> / month
              </div>
              <div className="mt-[5px] flex justify-between">
                <div className="text-[7px] text-[#12AD50]  md:text-[8.4px]  lg:text-[10px]  xl:text-[11.2px] 2xl:text-[14px]">
                  ~$13,000 savings
                </div>
                <img
                  src={`/images/header/question.svg`}
                  alt="image"
                  className="mb-[5px] w-[6.5px]  md:w-[7.8px]  lg:w-[9.1px] xl:w-[10.4px] 2xl:w-[13px]"
                />
              </div>
            </div> */}
            <div className="flex items-center gap-x-[25px] font-normal md:gap-x-[30px] lg:gap-x-[35px] xl:gap-x-[40px] 2xl:gap-x-[50px]">
              {headerItens.map((option, index) => (
                <a key={index} href={option.href}>
                  <div className="hover:text-[#313131]">{option.label}</div>
                </a>
              ))}
            </div>
            <div className="grid gap-y-[12px] font-medium  ">
              <div className="flex h-fit cursor-pointer justify-center gap-x-[8px] rounded-[5px] border-[1px] border-[#0354EC] bg-[#fff] py-[6.2px] px-[11px] text-center  text-[#0354EC] hover:text-[#203b6e]   md:py-[7.5px] md:px-[12.5px]    lg:py-[8.75px]  lg:px-[14.5px]  xl:py-[10px] xl:px-[17px]  2xl:gap-x-[10px] 2xl:py-[10px] 2xl:px-[21px]">
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                      ? process.env.NEXT_PUBLIC_BASE_PATH
                      : ''
                  }/images/header/new-storm.svg`}
                  alt="image"
                  className={`w-[5px] md:w-[6px] lg:w-[7px] xl:w-[8px] 2xl:w-[10px]`}
                />
                <div
                  onClick={() => {
                    console.log(finalNodes)
                    push('/start-here')
                  }}
                >
                  Create service and deploy
                </div>
              </div>
            </div>
          </div>

          {/* <div className="lg:hidden">
          <Dialog.Root>
            <Dialog.Trigger>
              <List className="text-black" size={24} weight="bold" />
            </Dialog.Trigger>
            <HeaderModal navigationItems={navigationItems} />
          </Dialog.Root>
        </div> */}
        </div>
      </header>
    </>
  )

  // return (
  //   <>
  //     {/* <Link href="#">
  //       <div className="max-w-screen flex h-[32px] w-full items-center justify-center bg-gradient-to-r from-[#2250C4] via-[#D18BC0] to-[#E48D92]">
  //         <span className="text-xs text-white">
  //           Query engine is live! Apply for beta testing here
  //         </span>
  //       </div>
  //     </Link> */}
  //     <header className="top-0 left-0 z-40 mx-0 flex w-full items-center bg-[#fff]  pt-[11px] text-[#000000] xl:pb-[27.8px] 2xl:pb-[46px]">
  //       <div className="w-full justify-between px-[20px] md:px-[33px] xl:hidden">
  //         <div className="">
  //           <img
  //             src={`${
  //               process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
  //                 ? process.env.NEXT_PUBLIC_BASE_PATH
  //                 : ''
  //             }/images/new/openmesh-logo-new.png`}
  //             alt="image"
  //             className={`w-[150px]`}
  //           />
  //         </div>
  //         <button
  //           onClick={navbarToggleHandler}
  //           id="navbarToggler"
  //           aria-label="Mobile Menu"
  //           className="absolute right-7 top-7 block  rounded-lg px-3 py-[6px] ring-primary focus:ring-2"
  //         >
  //           <span
  //             className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
  //               navbarOpen ? ' top-[7px] rotate-45' : ' '
  //             }`}
  //           />
  //           <span
  //             className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
  //               navbarOpen ? 'opacity-0 ' : ' '
  //             }`}
  //           />
  //           <span
  //             className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
  //               navbarOpen ? ' top-[-8px] -rotate-45' : ' '
  //             }`}
  //           />
  //         </button>
  //         <nav
  //           id="navbarCollapse"
  //           className={`navbar absolute right-7 z-50 w-[250px] rounded border-[.5px] bg-[#e6e4e4] py-6  px-6 text-[13px] text-[#fff] duration-300  ${
  //             navbarOpen
  //               ? 'visibility top-20 opacity-100'
  //               : 'invisible top-20 opacity-0'
  //           }`}
  //         >
  //           <div className=" grid gap-y-[15px] text-[12px]  font-medium !leading-[19px]">
  //             <div className="my-auto flex text-center md:justify-center">
  //               <a
  //                 href={`${process.env.NEXT_PUBLIC_BASE_URL}/community/register`}
  //                 className="flex cursor-pointer items-center rounded-[5px] bg-[#0354EC] py-[4.5px] px-[9px] text-[10px] font-bold !leading-[19px] text-[#fff] hover:border hover:border-[#0354EC] hover:bg-[#fff] hover:text-[#0354EC] md:py-[9px] md:px-[18px] md:text-[14px] 2xl:py-[11.5px] 2xl:px-[35px] 2xl:text-[16px]"
  //               >
  //                 Schedule a call
  //               </a>
  //             </div>
  //           </div>
  //         </nav>
  //       </div>
  //       <div className="mx-auto hidden h-full w-full max-w-[1800px] items-center justify-between px-[33px] xl:flex">
  //         <div className="flex items-center">
  //           <a href={'/'}>
  //             <img
  //               src={`/images/logo/xnode-logo.svg`}
  //               alt="image"
  //               className="h-[28.5px] w-[72.5px] md:h-[34px] md:w-[87px]  lg:h-[40px] lg:w-[101px] xl:h-[45.5px] xl:w-[116px] 2xl:h-[57px] 2xl:w-[145px]"
  //             />
  //           </a>
  //         </div>
  //         <div className="flex gap-x-[115px]">
  //           <div className="flex gap-x-[70px]">
  //             <a href={`/docs`} className="flex cursor-pointer items-center ">
  //               Docs
  //             </a>
  //             <a
  //               href={`https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/use-cases`}
  //               className="flex cursor-pointer items-center "
  //             >
  //               FAQS
  //             </a>
  //           </div>
  //           <div className="my-auto flex justify-center text-center">
  //             <a
  //               href={`${process.env.NEXT_PUBLIC_BASE_URL}/community/register`}
  //               className="flex cursor-pointer items-center rounded-[5px] bg-[#0354EC] py-[9px] px-[18px] text-[14px] font-bold !leading-[19px] text-[#fff] hover:border hover:border-[#0354EC] hover:bg-[#fff] hover:text-[#0354EC] 2xl:py-[11.5px] 2xl:px-[35px] 2xl:text-[16px]"
  //             >
  //               Schedule a call
  //             </a>
  //           </div>
  //         </div>

  //         {/* <div className="lg:hidden">
  //             <Dialog.Root>
  //               <Dialog.Trigger>
  //                 <List className="text-black" size={24} weight="bold" />
  //               </Dialog.Trigger>
  //               <HeaderModal navigationItems={navigationItems} />
  //             </Dialog.Root>
  //           </div> */}
  //       </div>
  //     </header>
  //   </>
  // )
}

export default Header
