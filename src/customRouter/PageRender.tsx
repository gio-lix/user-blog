import React from 'react';
import NotFound from "../components/NotFound";
import {useParams} from "react-router-dom";
import {RootState, useAppSelector} from "../redux/store";


const generatePage = (pageName: string) => {
    const component = () => require(`../pages/${pageName}`).default



    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound />
    }
}

const PageRender = () => {
    const {page, id} = useParams()
    const {token} = useAppSelector((state: RootState) => state.auth)


    let pageName = "";
    if (token) {
        if(id){
            pageName = `${page}/[id]`
        }else{
            pageName = `${page}`
        }
    }


    return generatePage(pageName)
}

export default PageRender

