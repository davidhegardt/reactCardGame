import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>                
                <div className='navbar-header'>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        
                    </button>
                    <Link className='navbar-brand' to={ '/' }>ReactCrudApp</Link>
                </div>                
                <div className='navbar fixshit' id="navbarSupportedContent">
                    <ul className='nav navbar-nav'>
                        <li className="nav-item">
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ '/fetchemployee' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ '/addemployee' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Create Employee
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ '/addcity' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Create City
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ '/fetchcard' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Get Cards
                            </NavLink>
                        </li>
                    </ul>
                </div>
            
        </div>;
    }
}
