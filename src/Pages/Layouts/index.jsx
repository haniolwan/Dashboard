import React from "react";
import Calender from "../../Components/common/Calender";

import {
  Checkbox,
  Toggle,
  TextInput,
  TextArea,
  Radio,
  Upload,
  SelectInput,
  UploadInput,
  TimeInput,
} from "./../../Components/common";

const Layouts = () => {
  const fakeOptions = [
    { label: "Adelaide", value: "adelaide" },
    { label: "Brisbane", value: "brisbane" },
    { label: "Canberra", value: "canberra" },
    { label: "Darwin", value: "darwin" },
    { label: "Sydney", value: "sydney" },
  ];
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div
        className="flex flex-col justify-center items-center gap-[30px] py-[30px] 
    border-b-2 border-[#000] dark:border-white dark:bg-gray-800"
      >
        <p className="text-[30px] leading-[45px] font-[600] text-placeholder-color">
          Active
        </p>
        <div className="flex flex-row gap-[120px] dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            <div className="text-[20px] leading-[30px] font-[500] font-medium ">
              <p className="text-placeholder-color">Checkbox</p>
            </div>
            <div className="flex flex-col gap-[15px] ">
              <p className="text-[14px] leading-[21px] font-[400] text-sm text-placeholder-color">
                Active
              </p>
              <div className="flex flex-row gap-6">
                <Checkbox id="check1" />
                <Checkbox id="check2" defaultChecked={true} />
              </div>
              <p className="text-[14px] leading-[21px] font-[400] text-sm font-regular text-placeholder-color">
                Inactive
              </p>
              <div className="flex flex-row gap-6">
                <Checkbox id="check3" disabled={true} />
                <Checkbox id="check4" defaultChecked={true} disabled={true} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[20px] leading-[30px] font-[500] font-medium text-placeholder-color">
              Toggle
            </p>
            <div className="flex flex-col gap-[15px] ">
              <p className="text-[14px] leading-[21px] font-[400] text-sm font-regular text-placeholder-color">
                Active
              </p>
              <div className="flex flex-row gap-6">
                <Toggle id="toggle1" />
                <Toggle id="toggle2" defaultChecked={true} />
              </div>
              <p className="text-[14px] leading-[21px] font-[400] text-sm font-regular text-placeholder-color">
                Inactive
              </p>
              <div className="flex flex-row  gap-6">
                <Toggle id="toggle3" disabled={true} />
                <Toggle id="toggle4" defaultChecked={true} disabled={true} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[20px] leading-[30px] font-[500] text-placeholder-color">
              Radio button
            </p>
            <div className="flex flex-col gap-[6px]">
              <p className="text-[14px] leading-[21px] font-[400] text-sm font-regular text-placeholder-color">
                Active
              </p>
              <div className="flex flex-row gap-6">
                <Radio id="radio1" name="test" />
                <Radio id="radio2" name="test" defaultChecked={true} />
              </div>
              <p className="text-[14px] leading-[21px] font-[400] text-sm font-regular text-placeholder-color">
                Inactive
              </p>
              <div className="flex flex-row gap-6">
                <Radio id="radio3" name="test2" disabled={true} />
                <Radio
                  id="radio4"
                  name="test2"
                  defaultChecked={true}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-[80px] py-[30px] 
    bg-white dark:bg-gray-800 border-b-2 border-[#000] dark:border-white"
      >
        <div className="flex flex-col items-center gap-[30px]">
          <p className="text-[30px] leading-[45px] font-[600] text-placeholder-color">
            Types
          </p>
          <div className="grid grid-cols-2 gap-[10px] w-full">
            <TextInput id="text1" name="text1" placeholder="Placeholder" />
            <TextInput id="text2" name="text2" placeholder="Placeholder" />
          </div>
          <div className="grid grid-cols-2 gap-[10px] w-full">
            <TextInput
              id="text3"
              name="text3"
              label="Label"
              placeholder="Placeholder"
            />
            <TextInput
              id="text4"
              name="text4"
              label="Label"
              placeholder="Placeholder"
            />
          </div>
          <div className="grid grid-cols-2 gap-[10px] w-full">
            <TextInput name="text5" id="text5" label="Label" />
            <TextArea
              name="area1"
              id="area1"
              label="Label"
              placeholder="Placeholder"
              rows="6"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <p className="flex justify-center text-[30px] leading-[45px] font-[600] text-placeholder-color">
            Type status
          </p>
          <div className="flex flex-col gap-[25px]">
            <div className="grid grid-flow-row-dense grid-cols-8">
              <p className="text-center self-center pt-[10pt] text-[20px] leading-[30px] font-[500] text-placeholder-color">
                Normal
              </p>
              <TextInput
                name="text6"
                id="text6"
                label="label"
                placeholder="placeholder"
                grid="col-span-3"
              />
            </div>
            <div className="grid grid-flow-row-dense grid-cols-8">
              <p className="  text-center self-center pt-[10pt] text-[20px] leading-[30px] font-[500] text-placeholder-color">
                Focus
              </p>
              <TextInput
                name="text7"
                id="text7"
                label="label"
                placeholder="placeholder"
                grid="col-span-3"
              />
            </div>
            <div className="grid grid-flow-row-dense grid-cols-8">
              <p className="text-center self-center pt-[10pt] text-[20px] leading-[30px] font-[500] text-placeholder-color">
                Status color
              </p>

              <TextInput
                name="text8"
                id="text8"
                label="Email"
                placeholder="placeholder"
                grid="col-span-3"
                error={true}
                errorMsg={"Invalid email"}
              />
            </div>
            <div className="grid grid-flow-row-dense grid-cols-8">
              <p className="  text-center self-center pt-[10pt] text-[20px] leading-[30px] font-[500] text-placeholder-color">
                Disabled
              </p>
              <TextInput
                name="text6"
                id="text6"
                placeholder="placeholder"
                grid="col-span-3"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-center gap-[40px] items-center w-full py-[30px] 
    border-b-2 border-[#000] dark:border-white bg-white dark:bg-gray-800"
      >
        <p className="text-[30px] leading-[45px] font-[600] text-placeholder-color">
          Upload file
        </p>
        <Upload
          uploaded={true}
          fileSize="10Mb"
          supportedFiles="PDF, Docx, XSLS, Image"
        />
        <UploadInput />
      </div>
      <div
        className="flex flex-col justify-center items-center gap-[30px] py-[30px] 
        border-b-2 border-[#000] dark:border-white bg-white dark:bg-gray-800 "
      >
        <p className="text-[30px] leading-[45px] font-[600] text-placeholder-color">
          Dropdowns
        </p>
        <div className="grid grid-cols-3 w-full">
          <SelectInput
            id="input1"
            options={fakeOptions}
            grid="col-start-2 col-span-1"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[30px] py-[30px] bg-white dark:bg-gray-800">
        <p className="text-[30px] leading-[45px] font-[600] text-placeholder-color">
          Date&Time
        </p>
        <Calender />
        <div>
          <TimeInput id="time-input" name="time-input" />
        </div>
      </div>
    </div>
  );
};

export default Layouts;
