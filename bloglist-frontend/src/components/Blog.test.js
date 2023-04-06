import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Blog from './Blog'


test('renders title of the blog', ()=>{
    const blog = {
        title: "Javascript Creation",
        url: "www.javascript.com",
        likes: 12,
        author: "Jugurtha Kacimi"
    }

    render(<Blog blog={blog}/>)

    const titleAuthor = screen.getByText('Javascript Creation Jugurtha Kacimi')
// const url = screen.getByText("www.javascript.com")
// const likes = screen.getByText("12")


expect(titleAuthor).toBeDefined()
// expect(url).not.toBeDefined()
// expect(likes).not.toBeDefined()




})