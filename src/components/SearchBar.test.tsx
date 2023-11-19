/* eslint-disable jest/valid-expect */
import { fireEvent, render, screen } from "../utils/testWrapper/test-utils"
import { SearchBar } from "./SearchBar"

describe('Search bar component',()=>{
    it('search bar test',()=>{
        render(<SearchBar/>)

        expect(screen.getByRole('textbox'))
        fireEvent.change(
            screen.getByPlaceholderText(/find statistics/i),{target:{value: 'in'}}
        )
        expect(screen.getByDisplayValue(/in/i))
        expect(screen.getByRole('button', {
            name: /statista search/i
        }))
        fireEvent.click(screen.getByRole('button', {
            name: /statista search/i
        }))
        screen.getByPlaceholderText(/find statistics/i)

    })

    it.skip('search results test',()=>{
        render(<SearchBar/>)

        expect(screen.getByText(/total results/i))
        expect(screen.getByText(/: 1 results/i))
        expect(screen.getByText(/statistic | 29 january 2021/i))
        expect(screen.getByRole('heading', {
            name: /india: major investing countries 2019/i
          }))
    } )
})