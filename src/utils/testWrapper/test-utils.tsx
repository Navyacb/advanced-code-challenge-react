import { render } from "@testing-library/react";
import { AllProviders } from "./customTestWrapper";
import React from "react";

const customRender = (ui: React.JSX.Element, options={}) => 
render(ui , {wrapper: AllProviders, ...options})
// re-export everything
export * from '@testing-library/react'
// override render method
export {customRender as render}