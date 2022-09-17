import API from '../constants/api/API';
import axios from 'axios';
import { config } from './configHelper';

const Get = async (apiEndpoint,payload) => {
    return await axios.get(API.url + apiEndpoint, payload)
    .then(res => { return res }) 
    .catch(err => {console.log(err); return err});
};

const Post = async (apiEndpoint,payload) =>  {
    return await axios.post(API.url + apiEndpoint, payload, config)
    .then(res => { return res }) 
    .catch(err => {{console.log(err); return err};});
};

const Delete = async ( apiEndpoint,payload) => {
    return await axios.delete(API.url + apiEndpoint, payload)
    .then(res => { return res }) 
    .catch(err => {console.log(err); return err});
};

const Patch = async (apiEndpoint,payload) => {
    return await axios.patch(API.url + apiEndpoint, payload)
    .then(res => { return res }) 
    .catch(err => {console.log(err); return err});
};

const Put = async (apiEndpoint,payload) => {
    return await axios.put(API.url + apiEndpoint, payload,)
    .then(res => { return res }) 
    .catch(err => {console.log(err); return err});
};

export const restHelper = {
    Get,
    Post,
    Delete,
    Patch,
    Put,
} 

