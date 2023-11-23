/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react'
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow'

const options = [
  {
    value: 'smoothstep',
    label: 'Smoothstep',
  },
  {
    value: 'step',
    label: 'Step',
  },
  {
    value: 'default',
    label: 'Bezier (default)',
  },
  {
    value: 'straight',
    label: 'Straight',
  },
]

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()

  const onChange = (evt) => {
    const { nodeInternals } = store.getState()
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          }
        }
        return node
      }),
    )
  }

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select
        className="nodrag rounded-[6px] bg-[#D9D9D9]"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  )
}

function Options({ handleId, name, optionsSelection, defaultValue }) {
  const [selected, setSelected] = useState<any>(defaultValue)

  return (
    <div className="">
      <div className="font-bold">{name}</div>
      <select
        className="nodrag min-w-[104px] rounded-[6px] bg-[#D9D9D9] font-normal md:min-w-[124px] lg:min-w-[145px] xl:min-w-[167px] 2xl:min-w-[208px]"
        onChange={(option) => setSelected(option.target.value)}
        value={selected}
      >
        {optionsSelection.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function ServerNode({ id, data }) {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(true)

  return (
    <>
      <div className="relative rounded-[7px] bg-[#EAEAEA] py-[7px]  px-[10px]  pb-[23px] pr-[17px] text-[8px]  text-[#000] md:py-[8.4px] md:px-[12px] md:pb-[15.6px] md:pr-[20.4px] md:text-[9.6px] lg:py-[10px] lg:px-[14px] lg:pb-[18px] lg:pr-[23px] lg:text-[11.2px] xl:py-[11.2px] xl:px-[16px] xl:pb-[21px] xl:pr-[27px] xl:text-[12.8px] 2xl:py-[14px] 2xl:px-[20px] 2xl:pb-[46px] 2xl:pr-[34px] 2xl:text-[16px]">
        <img
          src={`${
            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
              ? process.env.NEXT_PUBLIC_BASE_PATH
              : ''
          }/images/nodesFlow/server.svg`}
          alt="image"
          className={
            'w-[19px] md:w-[22px] lg:w-[26px] xl:w-[30px] 2xl:w-[37px]'
          }
        />

        <img
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          src={`${
            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
              ? process.env.NEXT_PUBLIC_BASE_PATH
              : ''
          }/images/nodesFlow/arrow.svg`}
          alt="image"
          className={`absolute top-[8px] right-[8px] cursor-pointer xl:w-[7px] 2xl:w-[9px] ${
            isHelpOpen ? 'rotate-90 transform' : ''
          }`}
        />
        {isHelpOpen && (
          <div className="absolute top-0 -right-[145px] rounded-[7px] bg-[#EAEAEA] p-[9px] text-[6px] text-[#0354EC] md:p-[10.8px] md:text-[7.2px] lg:p-[12.5px] lg:text-[8.4px] lg:!leading-[150%] xl:p-[14.5px] xl:text-[9.6px] 2xl:p-[18px] 2xl:text-[12px]">
            {' '}
            <div className="max-w-[70px] md:max-w-[84px] lg:max-w-[98px] xl:max-w-[112px] 2xl:max-w-[140px]">
              <div>Setting Up</div>
              <a
                href="https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/openmesh-overview"
                target="_blank"
                rel="noreferrer"
              >
                <div> Step-by-step guide to deploying an xNode.</div>
              </a>
              <a
                href="https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/openmesh-overview"
                target="_blank"
                rel="noreferrer"
              >
                <div className="mt-[5px] md:mt-[6px] lg:mt-[7px] xl:mt-[8px] 2xl:mt-[10px]">
                  Developer support and resources{' '}
                </div>
              </a>
              <a
                href="https://open-mesh.gitbook.io/l3a-v3-documentation-2.0/openmesh/openmesh-overview"
                target="_blank"
                rel="noreferrer"
              >
                <div>Docs & Research</div>
              </a>
            </div>
          </div>
        )}
        <div className="mt-[11px] grid gap-y-[18px] md:mt-[13px] md:gap-y-[19.2px] lg:mt-[15.4px] lg:gap-y-[22.5px] xl:mt-[17.5px] xl:gap-y-[25px] 2xl:mt-[22px] 2xl:gap-y-[32px]">
          <Options
            handleId={1}
            name={'Server'}
            optionsSelection={[
              'Small c3.x86 x 1',
              'Small c3.x86 x 2',
              'Small c3.x86 x 3',
              'Medium c2.x86 x 1',
              'Medium c2.x86 x 2',
              'Medium c2.x86 x 3',
              'Large 23.x86 x 1',
              'Large 23.x86 x 2',
              'Large 23.x86 x 3',
            ]}
            defaultValue={data.defaultValueServerType}
          />
          <Options
            handleId={1}
            name={'Location'}
            optionsSelection={['US East', 'US West', 'Sydney']}
            defaultValue={data.defaultValueLocation}
          />
          <Options
            handleId={1}
            name={'Latency'}
            optionsSelection={['Low', 'Med', 'High']}
            defaultValue={'Low'}
          />
        </div>
        <Handle type="target" position={Position.Left} id={'1'} />
      </div>
    </>
  )
}

export default memo(ServerNode)
