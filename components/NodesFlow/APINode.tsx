/* eslint-disable no-unused-vars */
import React, { memo, useState } from 'react'
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow'
import withProps from './withProps'

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

function Options({ handleId, name, optionsSelection }) {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()
  const [selected, setSelected] = useState<any>()
  return (
    <div className="">
      <select
        className="nodrag min-w-[85px] rounded-[6px] bg-[#D9D9D9] font-normal md:min-w-[104px] lg:min-w-[120px] xl:min-w-[138px] 2xl:min-w-[172px]"
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

function APINode({ id, data, handleNodeRemove }) {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(true)
  const handleClick = () => {
    handleNodeRemove(id)
  }

  return (
    <>
      <div className="relative rounded-[20px] border-[0.5px] border-[#C1C1C1] bg-[#FFFFFF] py-[7px]  px-[10px]  pb-[23px] pr-[17px] text-[8px]  text-[#000] md:py-[8.4px] md:px-[12px] md:pb-[15.6px] md:pr-[20.4px] md:text-[9.6px] lg:py-[10px] lg:px-[14px] lg:pb-[18px] lg:pr-[23px] lg:text-[11.2px] xl:py-[11.2px] xl:px-[16px] xl:pb-[21px] xl:pr-[27px] xl:text-[12.8px] 2xl:py-[14px] 2xl:px-[20px] 2xl:pb-[46px] 2xl:pr-[34px] 2xl:text-[16px]">
        <button
          onClick={() => {
            handleClick()
          }}
          className="absolute top-2 right-[5px] font-bold md:right-[6px] lg:right-[7px] xl:right-[8px] 2xl:right-[10px]"
        >
          X
        </button>
        <div className="flex w-full flex-row items-start gap-[10px] ">
          <img
            src={`${
              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                ? process.env.NEXT_PUBLIC_BASE_PATH
                : ''
            }/images/nodesFlow/api.svg`}
            alt="image"
            className={
              'w-[21  px] mt-[10px] h-[20px] md:w-[21px] lg:w-[24.5px] xl:w-[28px] 2xl:w-[35px]'
            }
          />
          <div className="mt-[5px] font-medium md:mt-[6px] lg:mt-[7px] lg:!leading-[19px] xl:mt-[8px] 2xl:mt-[10px]">
            APIs
          </div>
        </div>
        <div className="absolute left-0 h-[0.5px] w-full bg-[#C1C1C1] lg:mt-[10px] 2xl:mt-[12px]"></div>

        <div className="mt-[30px] flex flex-col gap-y-[10px]">
          <div className="text-[7px] md:text-[8.4px] lg:mt-[7px] lg:text-[10px] xl:mt-[8px] xl:text-[11.2px] 2xl:mt-[10px] 2xl:text-[14px]">
            {data.name}
          </div>
          <div className="">
            <Options
              handleId={1}
              name={'Server'}
              optionsSelection={['Fast API config', 'Express config']}
            />
          </div>
        </div>

        <Handle type="target" position={Position.Left} id={'1'} />
      </div>
    </>
  )
}

export default withProps(APINode, ['handleNodeRemove'])
