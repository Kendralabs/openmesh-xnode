/* eslint-disable dot-notation */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
'use client'
// import { useState } from 'react'
import { useEffect, useState, ChangeEvent, FC, useContext } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Eye, EyeSlash } from 'phosphor-react'
import * as Yup from 'yup'
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css' // import styles
import 'react-datepicker/dist/react-datepicker.css'
import { getData } from '@/utils/data'
import { DataProvider } from '@/types/dataProvider'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { format } from 'sql-formatter'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import { formatDistanceToNow, differenceInDays } from 'date-fns'
import {
  getDataXnodeValidatorsInfo,
  getXnodeWithNodesValidatorsStats,
} from '@/utils/xnode'
import { XnodeValidatorsStats, XnodeWithValidatorsStats } from '@/types/node'
import Congratulations from './Congratulations'
import Stats from './Stats'
import Node from './Node'

const Validator = (id: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [nextCongrats, setNextCongrats] = useState<boolean>(false)
  const [data, setData] = useState<XnodeWithValidatorsStats>()

  const { push } = useRouter()

  const searchParams = useSearchParams()
  const newDeploy = searchParams.get('newDeploy')

  async function getData(id: any) {
    try {
      const res = await getXnodeWithNodesValidatorsStats(id)
      setData(res)
      console.log(res)
    } catch (err) {
      toast.error(`An error occurred`)
      //   push('/community')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (id) {
      getData(id.id)
    } else {
      push('/')
      push(
        `${process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD' ? `/xnode/` : `/`}`,
      )
    }
  }, [id])

  // const MapChart = () => (
  //   <div className="mx-auto h-[500px] max-w-[300px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]">
  //     <div className="-ml-[12px] mt-[30px] text-[10px] text-[#000] md:mt-[36px] md:text-[12px] lg:mt-[42px] lg:text-[14px] xl:mb-[48px] xl:text-[16px] 2xl:-ml-[15px] 2xl:mb-[60px] 2xl:text-[20px]">
  //       Map of active validators
  //     </div>
  //     <VectorMap
  //       map={worldMill}
  //       backgroundColor="#d3e2ff"
  //       markers={missingCountries}
  //       markerStyle={{
  //         initial: {
  //           fill: 'red',
  //         },
  //       }}
  //       series={{
  //         regions: [
  //           {
  //             scale: colorScale,
  //             values: countries,
  //             attribute: 'fill', // Adicione esta linha
  //           },
  //         ],
  //       }}
  //       onRegionTipShow={function reginalTip(event, label: any, code) {
  //         // Verifica se o país tem uma contagem de Xnodes e atualiza o texto do tooltip
  //         if (countries[code]) {
  //           label.html(`${label.html()}<br>Xnodes: ${countries[code]}`)
  //         }
  //       }}
  //       onMarkerTipShow={function markerTip(event, label, code) {}}
  //     />
  //   </div>
  // )

  if (isLoading) {
    return (
      <section className=" pl-[30px] pr-[30px] pt-[46px] pb-[50px] text-[#000] md:pl-[90px]  md:pr-[130px] lg:min-w-[800px] xl:min-w-[1200px] 2xl:min-w-[1200px]">
        <div className="container hidden h-60 animate-pulse px-0 pb-12 md:flex">
          <div className="mr-10 w-3/4 animate-pulse bg-[#dfdfdf]"></div>
          <div className="w-1/4 animate-pulse bg-[#dfdfdf]"></div>
        </div>
        <div className="container h-60 animate-pulse px-0 pb-12 md:hidden">
          <div className="mt-[10px] h-10 w-full animate-pulse bg-[#dfdfdf]"></div>
          <div className="mt-[10px] h-10 w-full animate-pulse bg-[#dfdfdf]"></div>
          <div className="mt-[20px] h-32 w-full animate-pulse bg-[#dfdfdf]"></div>
        </div>
      </section>
    )
  }

  if (newDeploy === 'true' && data && !nextCongrats) {
    return (
      <section className="base:pt-[78px] w-full rounded-[10px] bg-[#F9F9F9] px-[20px] pb-[150px] md:pt-[93px] md:pb-[180px] lg:pt-[109px] lg:pb-[210px] xl:w-[1379px] xl:pt-[124px] xl:pb-[240px] 2xl:w-[1724px] 2xl:pt-[155px] 2xl:pb-[300px]">
        {' '}
        <Congratulations
          createdAt={data.node.createdAt}
          nodeId={data.node.id}
          onValueChange={() => {
            setNextCongrats(true)
          }}
        />
        <div className="mt-[130px] md:mt-[156px] lg:mt-[182px] xl:mt-[208px] 2xl:mt-[260px]">
          <Stats
            averagePayoutPeriod={data.stats.averagePayoutPeriod}
            nodes={data.nodes}
            totalAverageReward={data.stats.totalAverageReward}
            totalStakeAmount={data.stats.totalStakeAmount}
            totalValidators={data.stats.totalValidators}
          />
        </div>
      </section>
    )
  }

  if (data) {
    return (
      <section className="base:pt-[78px] w-full rounded-[10px] bg-[#F9F9F9] px-[20px] pb-[150px] md:pt-[93px] md:pb-[180px] lg:pt-[109px] lg:pb-[210px] xl:w-[1379px] xl:pt-[124px] xl:pb-[240px] 2xl:w-[1724px] 2xl:pt-[155px] 2xl:pb-[300px]">
        {' '}
        <Node
          averagePayoutPeriod={data.stats.averagePayoutPeriod}
          nodes={data.nodes}
          totalAverageReward={data.stats.totalAverageReward}
          totalStakeAmount={data.stats.totalStakeAmount}
          totalValidators={data.stats.totalValidators}
          node={data.node}
        />
        <div className="mt-[130px] md:mt-[156px] lg:mt-[182px] xl:mt-[208px] 2xl:mt-[260px]">
          <Stats
            averagePayoutPeriod={data.stats.averagePayoutPeriod}
            nodes={data.nodes}
            totalAverageReward={data.stats.totalAverageReward}
            totalStakeAmount={data.stats.totalStakeAmount}
            totalValidators={data.stats.totalValidators}
          />
        </div>
        {/* <div className="mt-[15px] md:mt-[25px] lg:mt-[50px] xl:mt-[90px] 2xl:mt-[150px]">
          <MapChart />
        </div> */}
      </section>
    )
  }
}

export default Validator
