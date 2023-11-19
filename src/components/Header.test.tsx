/* eslint-disable jest/valid-expect */
import { render, screen } from "../utils/testWrapper/test-utils"
import { Header } from "./Header"

describe('Header component',()=>{
    it('header component test logo and side button',()=>{
        render(<Header/>)
        expect(screen.getByRole('img', {
            name: /logo/i
        }))
        
        expect(screen.getByRole('button', {
            name: /favorites list/i
        }))
    })
})