import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';
import { FetchEmployee } from './components/FetchEmployee';
import { AddEmployee } from './components/AddEmployee';
import { AddCity } from './components/AddCity';
import { FetchCard } from './components/FetchCard';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />    
    <Route path='/fetchemployee' component={ FetchEmployee} />
    <Route path='/addemployee' component={ AddEmployee } />
    <Route path='/employee/edit/:empid' component={AddEmployee} />
    <Route path='/addcity' component={ AddCity } />
    <Route path='/employee/City/edit/:empid' component={AddCity} />
    <Route path='/fetchcard' component={FetchCard} />
</Layout>;
