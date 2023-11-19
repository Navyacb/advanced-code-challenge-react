/* eslint-disable jest/valid-expect */
import { render, screen } from "../utils/testWrapper/test-utils"
import { ErrorMessage } from "./ErrorMessage"

describe('error message test',()=>{
    it('error message testing',()=>{
        render(<ErrorMessage message="error message"/>)
        expect(screen.getByText('error message'))
    })
})